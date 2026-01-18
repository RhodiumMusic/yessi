import HeroSection from "@/components/HeroSection";
import ProfileSummarySection from "@/components/ProfileSummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PDFFooter from "@/components/PDFFooter";

// PDF-specific versions with light mode styling
import PDFHeroSection from "@/components/pdf/PDFHeroSection";
import PDFProfileSummary from "@/components/pdf/PDFProfileSummary";
import PDFExperienceSection from "@/components/pdf/PDFExperienceSection";
import PDFEducationSection from "@/components/pdf/PDFEducationSection";
import PDFSkillsSection from "@/components/pdf/PDFSkillsSection";
import PDFContactSection from "@/components/pdf/PDFContactSection";

interface CVContentProps {
  forPDF?: boolean;
}

const CVContent = ({ forPDF = false }: CVContentProps) => {
  // Use PDF-optimized components when generating PDF
  if (forPDF) {
    return (
      <main 
        className="min-h-screen bg-white text-gray-900" 
        data-cv-loaded
        style={{ 
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <PDFHeroSection />
        <PDFProfileSummary />
        <PDFExperienceSection />
        <PDFEducationSection />
        <PDFSkillsSection />
        <PDFContactSection />
        <PDFFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" data-cv-loaded>
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

export default CVContent;
