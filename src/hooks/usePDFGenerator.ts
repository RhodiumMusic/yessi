import { useState, useCallback } from "react";

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);

    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      // Open CV page in a new hidden window for rendering
      const cvWindow = window.open("/cv?pdf=true", "_blank", "width=1200,height=800");
      
      if (!cvWindow) {
        throw new Error("Could not open CV window. Please allow popups.");
      }

      // Wait for the page to load
      await new Promise<void>((resolve) => {
        cvWindow.onload = () => {
          setTimeout(resolve, 3000); // Extra wait for dynamic content
        };
        // Fallback timeout
        setTimeout(resolve, 5000);
      });

      const cvDocument = cvWindow.document;
      const mainContent = cvDocument.querySelector("main") || cvDocument.body;

      // Capture the content
      const canvas = await html2canvas(mainContent as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1a1a",
        logging: false,
        width: 1200,
        windowWidth: 1200,
      });

      // Close the window
      cvWindow.close();

      // Calculate PDF dimensions (A4)
      const imgWidth = 210;
      const pageHeight = 297;
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
      alert("Error al generar el PDF. Por favor, permite las ventanas emergentes e inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generatePDF, isGenerating };
};
