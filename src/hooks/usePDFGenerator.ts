import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import React from "react";
import CVPrintable from "@/components/CVPrintable";

interface Profile {
  full_name: string;
  profession?: string | null;
  photo_url?: string | null;
  nationality?: string | null;
  nationality_flag?: string | null;
  availability_status?: string | null;
  professional_summary?: string | null;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period_display?: string | null;
  duration?: string | null;
}

interface Education {
  id: string;
  title: string;
  description?: string | null;
  institution?: string | null;
}

interface Language {
  id: string;
  name: string;
  level: string;
  proficiency_percent?: number | null;
}

interface Skill {
  id: string;
  title: string;
  description?: string | null;
  icon_name?: string | null;
}

interface Contact {
  id: string;
  type: string;
  value: string;
  label?: string | null;
}

export interface CVData {
  profile: Profile | null;
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  skills: Skill[];
  contacts: Contact[];
}

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = useCallback(async (data: CVData) => {
    setIsGenerating(true);

    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      // Create a temporary container in the current DOM
      const container = document.createElement("div");
      container.style.cssText =
        "position: absolute; left: -9999px; top: 0; width: 800px; z-index: -1;";
      document.body.appendChild(container);

      // Create React root and render the printable CV
      const root = createRoot(container);
      
      // Use flushSync to ensure synchronous rendering
      flushSync(() => {
        root.render(
          React.createElement(CVPrintable, {
            profile: data.profile,
            experiences: data.experiences,
            education: data.education,
            languages: data.languages,
            skills: data.skills,
            contacts: data.contacts,
          })
        );
      });

      // Wait for fonts and images to load
      await document.fonts.ready;
      
      // Additional wait for images and complete rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture the content with html2canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1a1a",
        logging: false,
        width: 800,
        windowWidth: 800,
      });

      // A4 dimensions in mm
      const imgWidth = 210;
      const pageHeight = 297;
      
      // Calculate proportional image height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate how many pages we need
      const totalPages = Math.ceil(imgHeight / pageHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate the source position in the canvas
        const sourceY = (page * pageHeight / imgHeight) * canvas.height;
        const sourceHeight = Math.min(
          (pageHeight / imgHeight) * canvas.height,
          canvas.height - sourceY
        );
        
        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );
          
          // Calculate the height for this slice in mm
          const sliceHeightMM = (sourceHeight / canvas.width) * imgWidth;
          
          // Add the slice to the PDF
          pdf.addImage(
            pageCanvas.toDataURL("image/jpeg", 0.95),
            "JPEG",
            0,
            0,
            imgWidth,
            sliceHeightMM
          );
        }
      }

      // Download the PDF
      pdf.save("CV_Noelia_Bazan.pdf");

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Error al generar el PDF. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generatePDF, isGenerating };
};
