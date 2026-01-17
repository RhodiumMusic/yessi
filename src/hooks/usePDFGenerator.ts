import { useState, useCallback } from "react";

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);

    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      // Get the main content element
      const mainContent = document.querySelector("main");
      if (!mainContent) {
        throw new Error("No se encontró el contenido principal");
      }

      // Hide elements that shouldn't appear in the PDF
      const elementsToHide = document.querySelectorAll("[data-hide-pdf]");
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.visibility = "hidden";
      });

      // Temporarily modify the footer to show the PDF version
      const footer = document.querySelector("footer");
      const footerOriginalHTML = footer?.innerHTML;
      if (footer) {
        footer.innerHTML = `
          <div class="container mx-auto px-6 py-8">
            <div class="flex flex-col items-center justify-center gap-4">
              <div class="flex items-center gap-4 mb-2">
                <div class="w-16 h-px bg-gradient-to-r from-transparent to-gold-400/50"></div>
                <div class="w-2 h-2 bg-gold-400 rotate-45"></div>
                <div class="w-16 h-px bg-gradient-to-l from-transparent to-gold-400/50"></div>
              </div>
              <a href="https://www.yesicabazan.es/" class="font-display text-xl text-gold-400">
                www.yesicabazan.es
              </a>
            </div>
          </div>
        `;
      }

      // Wait a moment for any layout changes
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the content with html2canvas
      const canvas = await html2canvas(mainContent as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1a1a",
        logging: false,
        width: mainContent.scrollWidth,
        height: mainContent.scrollHeight,
        windowWidth: mainContent.scrollWidth,
        windowHeight: mainContent.scrollHeight,
      });

      // Restore footer
      if (footer && footerOriginalHTML) {
        footer.innerHTML = footerOriginalHTML;
      }

      // Restore hidden elements
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.visibility = "";
      });

      // Calculate PDF dimensions (A4)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
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

      // Download the PDF
      pdf.save("CV_Noelia_Bazan.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generatePDF, isGenerating };
};
