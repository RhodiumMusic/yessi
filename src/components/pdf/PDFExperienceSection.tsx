import { useExperiences } from "@/hooks/useExperiences";

/**
 * PDF-Optimized Experience Section
 * Light mode, no animations, page-break-aware
 * Uses Unicode icons instead of Lucide for html2canvas compatibility
 */
const PDFExperienceSection = () => {
  const { data: experiences, isLoading } = useExperiences();

  if (isLoading || !experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section 
      style={{ 
        backgroundColor: "#ffffff",
        padding: "32px 24px",
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
            Trayectoria Profesional
          </span>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            margin: "8px 0 12px",
            color: "#1a1a1a"
          }}>
            <span style={{ color: "#b8860b" }}>Experiencia</span>{" "}
            Laboral
          </h2>
          <div style={{
            height: "1px",
            maxWidth: "200px",
            margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #c9a227, transparent)"
          }} />
        </div>

        {/* Experience Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="pdf-avoid-break"
              style={{
                backgroundColor: "#fafafa",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "20px",
                pageBreakInside: "avoid",
                breakInside: "avoid"
              }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(201, 162, 39, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: "22px" }}>🏢</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    margin: "0 0 4px"
                  }}>
                    {exp.company}
                  </h3>
                  <p style={{ 
                    color: "#b8860b", 
                    fontSize: "14px",
                    fontWeight: 500,
                    margin: "0 0 12px"
                  }}>
                    {exp.role}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#666", fontSize: "12px" }}>
                      <span style={{ fontSize: "14px" }}>📅</span>
                      <span>{exp.period_display}</span>
                    </div>
                    {exp.duration && (
                      <span style={{
                        padding: "4px 10px",
                        backgroundColor: "rgba(201, 162, 39, 0.12)",
                        color: "#b8860b",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 500
                      }}>
                        {exp.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PDFExperienceSection;
