import HeroSection from "@/components/HeroSection";
import ProfileSummarySection from "@/components/ProfileSummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PDFFooter from "@/components/PDFFooter";

interface CVContentProps {
  forPDF?: boolean;
}

const CVContent = ({ forPDF = false }: CVContentProps) => {
  return (
    <main className="min-h-screen bg-background" data-cv-loaded>
      <HeroSection />
      <ProfileSummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
      {forPDF ? <PDFFooter /> : <Footer />}
    </main>
  );
};

export default CVContent;
