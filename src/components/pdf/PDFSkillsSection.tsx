import { useSkills } from "@/hooks/useSkills";

/**
 * PDF-Optimized Skills Section
 * Light mode, no animations, page-break-aware
 * Uses Unicode icons instead of Lucide for html2canvas compatibility
 */

// Unicode icon mapping for skills
const unicodeIconMap: Record<string, string> = {
  Heart: "❤️",
  Star: "⭐",
  Clock: "⏰",
  Users: "👥",
  Sparkles: "✨",
  Shield: "🛡️",
  Target: "🎯",
  Zap: "⚡",
  Award: "🏆",
  Briefcase: "💼",
  Coffee: "☕",
  Smile: "😊",
  ThumbsUp: "👍",
  MessageCircle: "💬",
  Lightbulb: "💡",
  CheckCircle: "✅"
};

const PDFSkillsSection = () => {
  const { data: skills, isLoading } = useSkills();

  if (isLoading || !skills || skills.length === 0) {
    return null;
  }

  return (
    <section 
      style={{ 
        backgroundColor: "#ffffff",
        padding: "8px 24px 32px 24px",
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
            Cualidades Personales
          </span>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            margin: "8px 0 12px",
            color: "#1a1a1a"
          }}>
            <span style={{ color: "#b8860b" }}>Otros Datos</span>{" "}
            de Interés
          </h2>
          <div style={{
            height: "1px",
            maxWidth: "200px",
            margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #c9a227, transparent)"
          }} />
        </div>

        {/* Skills Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "12px" 
        }}>
          {skills.map((skill) => {
            const iconEmoji = unicodeIconMap[skill.icon_name || "Star"] || "⭐";
            
            return (
              <div
                key={skill.id}
                className="pdf-avoid-break"
                style={{
                  backgroundColor: "#fafafa",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  pageBreakInside: "avoid",
                  breakInside: "avoid"
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c9a227, #daa520)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>
                  <span style={{ fontSize: "20px" }}>{iconEmoji}</span>
                </div>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  margin: "0 0 4px",
                  lineHeight: 1.3
                }}>
                  {skill.title}
                </h3>
                {skill.description && (
                  <p style={{ 
                    color: "#666", 
                    fontSize: "11px", 
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    {skill.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PDFSkillsSection;
