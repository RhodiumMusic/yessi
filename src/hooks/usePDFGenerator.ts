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

// PDF Configuration - Optimized for 300 DPI quality
const PDF_CONFIG = {
  // Component width in pixels (optimized for A4 aspect ratio)
  componentWidth: 800,
  // html2canvas scale for high DPI (3 = ~300 DPI for print quality)
  canvasScale: 3,
  // A4 dimensions in mm
  a4Width: 210,
  a4Height: 297,
  // JPEG compression quality (0.92-0.95 for best quality/size balance)
  jpegQuality: 0.95,
  // Background color
  backgroundColor: "#1a1a1a",
  // Wait time for fonts/images to load (ms)
  loadWaitTime: 1000,
};

// Progress status messages
export type PDFStatus = 
  | "idle"
  | "preparing"
  | "loading"
  | "rendering"
  | "generating"
  | "complete"
  | "error";

const STATUS_MESSAGES: Record<PDFStatus, string> = {
  idle: "",
  preparing: "Limpiando datos...",
  loading: "Cargando recursos...",
  rendering: "Renderizando documento...",
  generating: "Generando PDF...",
  complete: "Descarga completa",
  error: "Error al generar PDF",
};

/**
 * Pre-load an image with CORS headers
 */
const preloadImage = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    img.src = url;
  });
};

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<PDFStatus>("idle");

  const generatePDF = useCallback(async (data: CVData) => {
    setIsGenerating(true);
    setStatus("preparing");

    try {
      // Step 1: Pre-load profile image if it exists
      setStatus("loading");
      if (data.profile?.photo_url) {
        await preloadImage(data.profile.photo_url);
      }

      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      setStatus("rendering");

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
      
      // Additional wait for complete rendering
      await new Promise((resolve) => setTimeout(resolve, PDF_CONFIG.loadWaitTime));

      // Capture the content with html2canvas at high resolution
      const canvas = await html2canvas(container, {
        scale: PDF_CONFIG.canvasScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: PDF_CONFIG.backgroundColor,
        logging: false,
        width: PDF_CONFIG.componentWidth,
        windowWidth: PDF_CONFIG.componentWidth,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.body.querySelector("div");
          if (clonedContainer) {
            clonedContainer.style.visibility = "visible";
          }
        },
      });

      setStatus("generating");

      // Calculate dimensions for A4
      const imgWidth = PDF_CONFIG.a4Width;
      const scaledImgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = PDF_CONFIG.a4Height;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate how many pages we need
      const totalPages = Math.ceil(scaledImgHeight / pageHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate source coordinates in the original canvas
        const pixelsPerMM = canvas.width / imgWidth;
        const sourceY = Math.floor(page * pageHeight * pixelsPerMM);
        const sourceHeight = Math.min(
          Math.ceil(pageHeight * pixelsPerMM),
          canvas.height - sourceY
        );
        
        // Skip if we've gone past the canvas
        if (sourceY >= canvas.height) break;
        
        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          // Fill with background color first
          ctx.fillStyle = PDF_CONFIG.backgroundColor;
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
          // Draw the slice
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
          
          // Calculate the height in mm for this slice
          const sliceHeightMM = sourceHeight / pixelsPerMM;
          
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
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50);
      
      const fileName = `CV_${safeName}.pdf`;

      // Download the PDF
      pdf.save(fileName);

      setStatus("complete");

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
      
      // Reset status after a short delay
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setStatus("error");
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { 
    generatePDF, 
    isGenerating, 
    status,
    statusMessage: STATUS_MESSAGES[status],
  };
};
