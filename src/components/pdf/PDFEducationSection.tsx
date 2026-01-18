import { useEducation } from "@/hooks/useEducation";
import { useLanguages } from "@/hooks/useLanguages";

/**
 * PDF-Optimized Education & Languages Section
 * Light mode, no animations, page-break-aware
 * Uses Unicode icons instead of Lucide for html2canvas compatibility
 */
const PDFEducationSection = () => {
  const { data: education, isLoading: educationLoading } = useEducation();
  const { data: languages, isLoading: languagesLoading } = useLanguages();

  const isLoading = educationLoading || languagesLoading;
  const hasEducation = education && education.length > 0;
  const hasLanguages = languages && languages.length > 0;

  if (isLoading || (!hasEducation && !hasLanguages)) {
    return null;
  }

  return (
    <section 
      style={{ 
        backgroundColor: "#fafafa",
        padding: "32px 24px 8px 24px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Education */}
          {hasEducation && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <span style={{ 
                  color: "#b8860b", 
                  fontSize: "10px", 
                  letterSpacing: "0.2em", 
                  textTransform: "uppercase"
                }}>
                  Formación Académica
                </span>
                <h2 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: "8px 0 12px",
                  color: "#1a1a1a"
                }}>
                  <span style={{ color: "#b8860b" }}>Estudios</span>{" "}
                  Realizados
                </h2>
                <div style={{
                  height: "1px",
                  background: "linear-gradient(90deg, #c9a227, transparent)"
                }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="pdf-avoid-break"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      padding: "16px",
                      pageBreakInside: "avoid",
                      breakInside: "avoid"
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #c9a227, #daa520)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: "20px" }}>🎓</span>
                      </div>
                      <div>
                        <h3 style={{ 
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          margin: "0 0 4px"
                        }}>
                          {edu.title}
                        </h3>
                        {edu.description && (
                          <p style={{ color: "#666", fontSize: "12px", margin: "0 0 2px" }}>
                            {edu.description}
                          </p>
                        )}
                        {edu.institution && (
                          <p style={{ color: "#b8860b", fontSize: "11px", margin: 0 }}>
                            {edu.institution}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {hasLanguages && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <span style={{ 
                  color: "#b8860b", 
                  fontSize: "10px", 
                  letterSpacing: "0.2em", 
                  textTransform: "uppercase"
                }}>
                  Competencias Lingüísticas
                </span>
                <h2 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: "8px 0 12px",
                  color: "#1a1a1a"
                }}>
                  <span style={{ color: "#b8860b" }}>Idiomas</span>
                </h2>
                <div style={{
                  height: "1px",
                  background: "linear-gradient(90deg, #c9a227, transparent)"
                }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="pdf-avoid-break"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      padding: "16px",
                      pageBreakInside: "avoid",
                      breakInside: "avoid"
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #c9a227, #daa520)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: "20px" }}>🌐</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          margin: "0 0 8px"
                        }}>
                          {lang.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{
                            padding: "4px 10px",
                            backgroundColor: "#c9a227",
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            borderRadius: "4px",
                            display: "inline-block",
                            lineHeight: "1.2"
                          }}>
                            {lang.level.toUpperCase()}
                          </span>
                          <div style={{
                            flex: 1,
                            height: "6px",
                            backgroundColor: "#e5e5e5",
                            borderRadius: "3px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              height: "100%",
                              width: `${lang.proficiency_percent ?? 100}%`,
                              background: "linear-gradient(90deg, #c9a227, #daa520)",
                              borderRadius: "3px"
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PDFEducationSection;
