import profilePhoto from "@/assets/profile-photo.jpg";
import {
  sanitizeProfile,
  sanitizeExperiences,
  sanitizeEducation,
  sanitizeSkills,
  sanitizeContacts,
} from "@/lib/pdfDataSanitizer";

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

interface CVPrintableProps {
  profile: Profile | null;
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  skills: Skill[];
  contacts: Contact[];
}

// Compact inline styles optimized for A4 PDF (max 2 pages)
const styles = {
  container: {
    width: "800px",
    backgroundColor: "#1a1a1a",
    color: "#faf8f5",
    fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
    padding: 0,
    margin: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  } as React.CSSProperties,
  
  header: {
    background: "linear-gradient(180deg, #1a1a1a 0%, #242424 100%)",
    padding: "28px 36px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  } as React.CSSProperties,
  
  profilePhoto: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    border: "3px solid #d4af37",
    objectFit: "cover" as const,
    flexShrink: 0,
  } as React.CSSProperties,
  
  label: {
    fontSize: "9px",
    color: "#d4af37",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    marginBottom: "4px",
    fontWeight: 600,
  } as React.CSSProperties,
  
  h1: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#d4af37",
    marginBottom: "2px",
    lineHeight: 1.15,
  } as React.CSSProperties,
  
  subtitle: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#a3a3a3",
    marginBottom: "10px",
    fontStyle: "italic",
  } as React.CSSProperties,
  
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    border: "1px solid rgba(212, 175, 55, 0.5)",
    backgroundColor: "rgba(212, 175, 55, 0.12)",
    color: "#d4af37",
    fontSize: "9px",
    fontWeight: 600,
    marginRight: "8px",
    borderRadius: "3px",
  } as React.CSSProperties,
  
  section: {
    padding: "18px 36px",
  } as React.CSSProperties,
  
  sectionAlt: {
    padding: "18px 36px",
    backgroundColor: "#242424",
  } as React.CSSProperties,
  
  h2: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#faf8f5",
  } as React.CSSProperties,
  
  // Compact experience table
  experienceTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "11px",
  } as React.CSSProperties,
  
  tableHeader: {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
  } as React.CSSProperties,
  
  th: {
    padding: "8px 10px",
    textAlign: "left" as const,
    fontWeight: 600,
    color: "#d4af37",
    fontSize: "9px",
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  
  td: {
    padding: "8px 10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    verticalAlign: "top" as const,
    color: "#faf8f5",
  } as React.CSSProperties,
  
  tdCompany: {
    fontWeight: 500,
    color: "#faf8f5",
  } as React.CSSProperties,
  
  tdRole: {
    color: "#d4af37",
    fontWeight: 500,
  } as React.CSSProperties,
  
  tdPeriod: {
    color: "#a3a3a3",
    fontSize: "10px",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  
  durationBadge: {
    display: "inline-block",
    padding: "2px 6px",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    color: "#d4af37",
    borderRadius: "8px",
    fontSize: "9px",
    fontWeight: 500,
    marginTop: "2px",
  } as React.CSSProperties,
  
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  } as React.CSSProperties,
  
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  } as React.CSSProperties,
  
  compactCard: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "6px",
    padding: "10px 12px",
    marginBottom: "8px",
  } as React.CSSProperties,
  
  skillCard: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "6px",
    padding: "10px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  
  skillIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #e8c860)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 6px",
    color: "#1a1a1a",
    fontSize: "12px",
    fontWeight: 700,
  } as React.CSSProperties,
  
  progressBar: {
    height: "4px",
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    borderRadius: "2px",
    overflow: "hidden",
  } as React.CSSProperties,
  
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #d4af37, #e8c860)",
    borderRadius: "2px",
  } as React.CSSProperties,
  
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  } as React.CSSProperties,
  
  contactCard: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "6px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  } as React.CSSProperties,
  
  contactIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #e8c860)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a1a1a",
    fontSize: "14px",
    flexShrink: 0,
  } as React.CSSProperties,
  
  footer: {
    padding: "14px 36px",
    borderTop: "1px solid rgba(212, 175, 55, 0.25)",
    textAlign: "center" as const,
    backgroundColor: "#1a1a1a",
  } as React.CSSProperties,
};

const CVPrintable = ({
  profile: rawProfile,
  experiences: rawExperiences,
  education: rawEducation,
  languages,
  skills: rawSkills,
  contacts: rawContacts,
}: CVPrintableProps) => {
  // Sanitize all data
  const profile = sanitizeProfile(rawProfile);
  const experiences = sanitizeExperiences(rawExperiences);
  const education = sanitizeEducation(rawEducation);
  const skills = sanitizeSkills(rawSkills);
  const contacts = sanitizeContacts(rawContacts);
  
  const phoneContact = contacts?.find((c) => c.type === "phone");
  const locationContact = contacts?.find((c) => c.type === "location");

  return (
    <div style={styles.container}>
      {/* Header Section - Compact */}
      <div style={styles.header}>
        <img
          src={profile?.photo_url || profilePhoto}
          alt={profile?.full_name || "Profile"}
          style={styles.profilePhoto}
          crossOrigin="anonymous"
        />
        <div style={{ flex: 1 }}>
          <p style={styles.label}>Curriculum Vitae</p>
          <h1 style={styles.h1}>{profile?.full_name || "Noelia Yésica Bazán Portugal"}</h1>
          <p style={styles.subtitle}>{profile?.profession || "Profesional de la Hostelería"}</p>

          {/* Contact info inline */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" as const, marginBottom: "8px" }}>
            {locationContact && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#a3a3a3" }}>
                📍 {locationContact.value}
              </span>
            )}
            {phoneContact && (
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#a3a3a3" }}>
                📞 {phoneContact.value}
              </span>
            )}
          </div>

          {/* Badges */}
          <div>
            {profile?.nationality && (
              <span style={styles.badge}>
                {profile.nationality_flag} {profile.nationality}
              </span>
            )}
            {profile?.availability_status && (
              <span style={styles.badge}>{profile.availability_status}</span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary - Compact */}
      {profile?.professional_summary && (
        <div style={styles.sectionAlt}>
          <p style={styles.label}>Perfil Profesional</p>
          <div style={{
            backgroundColor: "rgba(212, 175, 55, 0.04)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            borderRadius: "6px",
            padding: "12px 14px",
          }}>
            <p style={{ fontSize: "11px", lineHeight: 1.6, color: "rgba(250, 248, 245, 0.92)", margin: 0 }}>
              {profile.professional_summary}
            </p>
          </div>
        </div>
      )}

      {/* Experience Section - Table Format */}
      {experiences.length > 0 && (
        <div style={styles.section}>
          <p style={styles.label}>Trayectoria Profesional</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Experiencia</span> Laboral
          </h2>

          <table style={styles.experienceTable}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={{ ...styles.th, width: "35%" }}>Empresa</th>
                <th style={{ ...styles.th, width: "30%" }}>Cargo</th>
                <th style={{ ...styles.th, width: "35%" }}>Período</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id}>
                  <td style={{ ...styles.td, ...styles.tdCompany }}>{exp.company}</td>
                  <td style={{ ...styles.td, ...styles.tdRole }}>{exp.role}</td>
                  <td style={styles.td}>
                    <div style={styles.tdPeriod}>{exp.period_display}</div>
                    {exp.duration && (
                      <span style={styles.durationBadge}>{exp.duration}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Education & Languages - Compact 2-column layout */}
      {(education.length > 0 || languages.length > 0) && (
        <div style={styles.sectionAlt}>
          <div style={styles.grid2}>
            {/* Education */}
            {education.length > 0 && (
              <div>
                <p style={styles.label}>Formación Académica</p>
                <h3 style={{ ...styles.h2, fontSize: "14px" }}>
                  <span style={{ color: "#d4af37" }}>Estudios</span>
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} style={styles.compactCard}>
                    <h4 style={{ fontSize: "11px", fontWeight: 600, color: "#faf8f5", marginBottom: "2px", margin: 0 }}>
                      {edu.title}
                    </h4>
                    {edu.description && (
                      <p style={{ fontSize: "10px", color: "#a3a3a3", margin: 0, marginTop: "2px" }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <p style={styles.label}>Competencias Lingüísticas</p>
                <h3 style={{ ...styles.h2, fontSize: "14px" }}>
                  <span style={{ color: "#d4af37" }}>Idiomas</span>
                </h3>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 500, color: "#faf8f5" }}>{lang.name}</span>
                      <span style={{ fontSize: "9px", color: "#d4af37", fontWeight: 500 }}>{lang.level}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${lang.proficiency_percent || 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills Section - 4-column grid for compactness */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <p style={styles.label}>Cualidades Personales</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Habilidades</span> y Competencias
          </h2>

          <div style={styles.grid4}>
            {skills.map((skill) => (
              <div key={skill.id} style={styles.skillCard}>
                <div style={styles.skillIcon}>★</div>
                <h4 style={{ fontSize: "10px", fontWeight: 600, color: "#faf8f5", marginBottom: "2px", margin: 0 }}>
                  {skill.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section - Compact */}
      {contacts.length > 0 && (
        <div style={styles.sectionAlt}>
          <p style={styles.label}>Información de Contacto</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Contáctame</span>
          </h2>

          <div style={styles.contactGrid}>
            {phoneContact && (
              <div style={styles.contactCard}>
                <div style={styles.contactIcon}>📞</div>
                <div>
                  <p style={{ fontSize: "9px", color: "#a3a3a3", textTransform: "uppercase" as const, letterSpacing: "0.5px", margin: 0 }}>
                    Teléfono
                  </p>
                  <p style={{ fontSize: "12px", color: "#faf8f5", fontWeight: 500, margin: 0 }}>
                    {phoneContact.value}
                  </p>
                </div>
              </div>
            )}
            {locationContact && (
              <div style={styles.contactCard}>
                <div style={styles.contactIcon}>📍</div>
                <div>
                  <p style={{ fontSize: "9px", color: "#a3a3a3", textTransform: "uppercase" as const, letterSpacing: "0.5px", margin: 0 }}>
                    Ubicación
                  </p>
                  <p style={{ fontSize: "12px", color: "#faf8f5", fontWeight: 500, margin: 0 }}>
                    {locationContact.value}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer - Compact */}
      <div style={styles.footer}>
        <p style={{ fontSize: "9px", color: "#a3a3a3", margin: 0 }}>
          Documento generado digitalmente • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default CVPrintable;
