import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import CVContent from "@/components/CVContent";

// Helper function to wait for component hydration
async function waitForHydration(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log("PDF: Hydration timeout reached, proceeding...");
      resolve();
    }, 5000); // Maximum 5 seconds wait

    const checkReady = setInterval(() => {
      const images = container.querySelectorAll("img");
      const allImagesLoaded = Array.from(images).every(
        (img) => img.complete && img.naturalHeight !== 0
      );
      const hasContent = container.querySelector("[data-cv-loaded]");

      if (allImagesLoaded && hasContent) {
        clearInterval(checkReady);
        clearTimeout(timeout);
        // Extra delay for final renders
        setTimeout(resolve, 500);
      }
    }, 100);
  });
}

// Helper function to generate multi-page PDF
function generateMultiPagePDF(
  canvas: HTMLCanvasElement,
  jsPDF: typeof import("jspdf").default
) {
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");
  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(
    canvas.toDataURL("image/jpeg", 0.95),
    "JPEG",
    0,
    position,
    imgWidth,
    imgHeight
  );
  heightLeft -= pageHeight;

  // Add additional pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 0.95),
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;
  }

  return pdf;
}

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);

    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      // 1. Create ghost container (off-screen)
      const ghostContainer = document.createElement("div");
      ghostContainer.id = "pdf-ghost-container";
      ghostContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 1200px;
        background: #1a1a1a;
        z-index: -1;
      `;
      document.body.appendChild(ghostContainer);

      // 2. Create a new QueryClient for the ghost render
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            retry: 1,
          },
        },
      });

      // 3. Mount the CV component with forPDF=true
      const root = createRoot(ghostContainer);

      await new Promise<void>((resolve) => {
        root.render(
          <QueryClientProvider client={queryClient}>
            <CVContent forPDF={true} />
          </QueryClientProvider>
        );
        // Give React time to start rendering
        setTimeout(resolve, 100);
      });

      // 4. Wait for hydration (data + images loaded)
      await waitForHydration(ghostContainer);

      // 5. Find the main element and capture with high resolution
      const mainElement = ghostContainer.querySelector("main");
      if (!mainElement) {
        throw new Error("CV content not ready");
      }

      const canvas = await html2canvas(mainElement as HTMLElement, {
        scale: 3, // High DPI for crisp gradients and text
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1a1a",
        logging: false,
        width: mainElement.scrollWidth,
        height: mainElement.scrollHeight,
        windowWidth: mainElement.scrollWidth,
        windowHeight: mainElement.scrollHeight,
      });

      // 6. Generate multi-page PDF
      const pdf = generateMultiPagePDF(canvas, jsPDF);

      // 7. Cleanup: unmount and remove ghost container
      root.unmount();
      document.body.removeChild(ghostContainer);

      // 8. Download the PDF
      pdf.save("CV_Noelia_Bazan.pdf");

      toast.success("PDF generado correctamente");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error al generar el PDF. Por favor, inténtalo de nuevo.");

      // Cleanup on error
      const ghostContainer = document.getElementById("pdf-ghost-container");
      if (ghostContainer) {
        document.body.removeChild(ghostContainer);
      }
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generatePDF, isGenerating };
};
