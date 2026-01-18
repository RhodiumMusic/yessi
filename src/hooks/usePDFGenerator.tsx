import { useState, useCallback } from "react";
import { toast } from "sonner";

// Import PDF styles
import "@/styles/pdf-print.css";

/**
 * Military-Grade PDF Generator Hook
 * Uses html2pdf.js with optimized settings for professional output
 */

// Helper function to wait for component hydration and all assets
async function waitForHydration(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const maxWait = 8000; // 8 seconds max
    const startTime = Date.now();

    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      
      // Get all images
      const images = container.querySelectorAll("img");
      const allImagesLoaded = Array.from(images).every(
        (img) => img.complete && img.naturalHeight !== 0
      );
      
      // Check for data loaded marker
      const hasContent = container.querySelector("[data-cv-loaded]");
      
      // Check if Lucide icons are rendered (SVGs inside data-lucide elements or direct SVGs)
      const icons = container.querySelectorAll("svg");
      const hasIcons = icons.length > 0;

      if ((allImagesLoaded && hasContent) || elapsed >= maxWait) {
        // Extra delay for final CSS computation and font loading
        setTimeout(resolve, 800);
      } else {
        requestAnimationFrame(checkReady);
      }
    };

    checkReady();
  });
}

// Helper to preload and inline images for CORS safety
async function preloadImages(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll("img");
  
  await Promise.all(
    Array.from(images).map(async (img) => {
      if (img.src.startsWith("data:")) return; // Already base64
      
      try {
        const response = await fetch(img.src, { mode: "cors" });
        const blob = await response.blob();
        const reader = new FileReader();
        
        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              img.src = reader.result;
            }
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.warn("Could not preload image:", img.src);
      }
    })
  );
}

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);
    setProgress(10);

    try {
      // Dynamically import all dependencies
      const [
        html2pdf,
        { createRoot },
        { QueryClient, QueryClientProvider },
        { default: CVContent }
      ] = await Promise.all([
        import("html2pdf.js").then(m => m.default),
        import("react-dom/client"),
        import("@tanstack/react-query"),
        import("@/components/CVContent")
      ]);

      setProgress(20);

      // 1. Create overlay container (visible but transparent for proper rendering)
      const pdfContainer = document.createElement("div");
      pdfContainer.id = "pdf-render-container";
      pdfContainer.className = "pdf-light-mode";
      pdfContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 794px;
        min-height: 1123px;
        background: white;
        z-index: -9999;
        opacity: 0;
        pointer-events: none;
        overflow: visible;
        font-family: 'Inter', sans-serif;
      `;
      document.body.appendChild(pdfContainer);

      setProgress(30);

      // 2. Create isolated QueryClient for PDF render
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: 2,
            refetchOnMount: true,
          },
        },
      });

      // 3. Mount CVContent with forPDF=true
      const root = createRoot(pdfContainer);

      await new Promise<void>((resolve) => {
        root.render(
          <QueryClientProvider client={queryClient}>
            <CVContent forPDF={true} />
          </QueryClientProvider>
        );
        // Initial render time
        setTimeout(resolve, 200);
      });

      setProgress(50);

      // 4. Wait for full hydration (images, data, icons)
      await waitForHydration(pdfContainer);

      setProgress(60);

      // 5. Preload images as base64 to avoid CORS issues
      await preloadImages(pdfContainer);

      setProgress(70);

      // 6. Find the main element
      const mainElement = pdfContainer.querySelector("main");
      if (!mainElement) {
        throw new Error("CV content not found");
      }

      // Temporarily make container visible for html2pdf
      pdfContainer.style.opacity = "1";
      pdfContainer.style.zIndex = "9999";

      setProgress(80);

      // 7. Generate PDF with html2pdf.js - military-grade settings
      const options = {
        margin: [10, 10, 10, 10], // mm
        filename: "CV_Noelia_Bazan.pdf",
        image: { 
          type: "jpeg", 
          quality: 0.98 
        },
        html2canvas: {
          scale: 3, // 300 DPI for crisp images and icons
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          letterRendering: true,
          imageTimeout: 15000,
          removeContainer: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
          before: ".page-break-before",
          after: ".page-break-after",
          avoid: ["section", ".luxury-card", ".pdf-avoid-break"],
        },
      };

      // Generate and save
      await html2pdf()
        .set(options)
        .from(mainElement)
        .save();

      setProgress(100);

      // 8. Cleanup
      root.unmount();
      document.body.removeChild(pdfContainer);

      toast.success("PDF generado correctamente", {
        description: "El archivo se ha descargado automáticamente."
      });

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error al generar el PDF", {
        description: "Por favor, inténtalo de nuevo."
      });

      // Cleanup on error
      const pdfContainer = document.getElementById("pdf-render-container");
      if (pdfContainer) {
        document.body.removeChild(pdfContainer);
      }
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }, []);

  return { generatePDF, isGenerating, progress };
};
