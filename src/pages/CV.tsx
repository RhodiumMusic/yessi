import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePDFGenerator } from "@/hooks/usePDFGenerator";
import HeroSection from "@/components/HeroSection";
import ProfileSummarySection from "@/components/ProfileSummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const CV = () => {
  const navigate = useNavigate();
  const { generatePDF, isGenerating } = usePDFGenerator();

  return (
    <main className="min-h-screen bg-background relative">
      {/* Navigation buttons - hidden in PDF */}
      <div className="fixed top-6 left-6 z-50" data-hide-pdf>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="group bg-charcoal-900/80 backdrop-blur-sm border-gold-400/30 hover:border-gold-400/50 hover:bg-charcoal-800/80 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-cream-100/80">Volver</span>
        </Button>
      </div>

      {/* Download PDF button - hidden in PDF */}
      <div className="fixed top-6 right-6 z-50" data-hide-pdf>
        <Button
          variant="outline"
          size="sm"
          onClick={generatePDF}
          disabled={isGenerating}
          className="group bg-charcoal-900/80 backdrop-blur-sm border-gold-400/30 hover:border-gold-400/50 hover:bg-charcoal-800/80 transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="text-cream-100/80">Generando...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-cream-100/80">Descargar PDF</span>
            </>
          )}
        </Button>
      </div>

      <HeroSection />
      <ProfileSummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default CV;