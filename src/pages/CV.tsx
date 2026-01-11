import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import ProfileSummarySection from "@/components/ProfileSummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const CV = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background relative">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
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
