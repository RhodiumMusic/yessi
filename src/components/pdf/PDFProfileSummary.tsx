import { User } from "lucide-react";
import { usePublicProfile } from "@/hooks/usePublicProfile";

/**
 * PDF-Optimized Profile Summary Section
 * Light mode, no animations, high contrast
 */
const PDFProfileSummary = () => {
  const { data: profile, isLoading } = usePublicProfile();

  if (isLoading || !profile?.professional_summary) {
    return null;
  }

  return (
    <section 
      className="pdf-avoid-break"
      style={{ 
        backgroundColor: "#fafafa",
        padding: "32px 24px",
        pageBreakInside: "avoid"
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{ 
            color: "#b8860b", 
            fontSize: "11px", 
            letterSpacing: "0.2em", 
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif"
          }}>
            Sobre Mí
          </span>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            margin: "8px 0 12px",
            color: "#1a1a1a"
          }}>
            <span style={{ color: "#b8860b" }}>Perfil</span>{" "}
            Profesional
          </h2>
          <div style={{
            height: "1px",
            maxWidth: "200px",
            margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #c9a227, transparent)"
          }} />
        </div>

        {/* Summary Card */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #c9a227, #daa520)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <User style={{ width: "24px", height: "24px", color: "#ffffff" }} />
            </div>
            <p style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "#444",
              margin: 0,
              fontFamily: "'Inter', sans-serif"
            }}>
              {profile.professional_summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFProfileSummary;
