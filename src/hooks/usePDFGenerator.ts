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
  start_year?: number;
  end_year?: number | null;
  sort_order?: number | null;
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

// PDF Configuration
const PDF_CONFIG = {
  // Component width in pixels (optimized for A4 aspect ratio)
  componentWidth: 800,
  // html2canvas scale for high DPI (3 = ~300 DPI for print quality)
  canvasScale: 3,
  // A4 dimensions in mm
  a4Width: 210,
  a4Height: 297,
  // JPEG compression quality (0.90-0.95 for good quality/size balance)
  jpegQuality: 0.92,
  // Background color
  backgroundColor: "#1a1a1a",
  // Wait time for fonts/images to load (ms)
  loadWaitTime: 800,
};

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
      container.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: ${PDF_CONFIG.componentWidth}px;
        z-index: -1;
        visibility: hidden;
      `;
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

      // Wait for fonts to be ready
      await document.fonts.ready;
      
      // Additional wait for images and complete rendering
      await new Promise((resolve) => setTimeout(resolve, PDF_CONFIG.loadWaitTime));

      // Pre-load profile image if it exists
      if (data.profile?.photo_url) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if image fails
            img.src = data.profile!.photo_url!;
          });
        } catch {
          // Continue even if image loading fails
        }
      }

      // Capture the content with html2canvas at high resolution
      const canvas = await html2canvas(container, {
        scale: PDF_CONFIG.canvasScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: PDF_CONFIG.backgroundColor,
        logging: false,
        width: PDF_CONFIG.componentWidth,
        windowWidth: PDF_CONFIG.componentWidth,
        // Improve text rendering
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.body.querySelector("div");
          if (clonedContainer) {
            clonedContainer.style.visibility = "visible";
          }
        },
      });

      // Calculate dimensions
      const imgWidth = PDF_CONFIG.a4Width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = PDF_CONFIG.a4Height;

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
        pageCanvas.height = Math.ceil(sourceHeight);
        
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          // Fill with background color to prevent white gaps
          ctx.fillStyle = PDF_CONFIG.backgroundColor;
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
          ctx.drawImage(
            canvas,
            0,
            Math.floor(sourceY),
            canvas.width,
            Math.ceil(sourceHeight),
            0,
            0,
            canvas.width,
            Math.ceil(sourceHeight)
          );
          
          // Calculate the height for this slice in mm
          const sliceHeightMM = (sourceHeight / canvas.width) * imgWidth;
          
          // Add the slice to the PDF
          pdf.addImage(
            pageCanvas.toDataURL("image/jpeg", PDF_CONFIG.jpegQuality),
            "JPEG",
            0,
            0,
            imgWidth,
            sliceHeightMM
          );
        }
      }

      // Generate filename with sanitized name
      const safeName = (data.profile?.full_name || "CV")
        .replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50);
      
      const fileName = `CV_${safeName}.pdf`;

      // Download the PDF
      pdf.save(fileName);

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generatePDF, isGenerating };
};
