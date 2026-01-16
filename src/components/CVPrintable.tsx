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

// Inline styles optimized for html2canvas rendering
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
    padding: "40px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
  } as React.CSSProperties,
  
  profilePhoto: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "3px solid #d4af37",
    objectFit: "cover" as const,
    flexShrink: 0,
  } as React.CSSProperties,
  
  label: {
    fontSize: "11px",
    color: "#d4af37",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
    fontWeight: 600,
  } as React.CSSProperties,
  
  h1: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#d4af37",
    marginBottom: "4px",
    lineHeight: 1.2,
  } as React.CSSProperties,
  
  subtitle: {
    fontSize: "18px",
    fontWeight: 400,
    color: "#a3a3a3",
    marginBottom: "16px",
    fontStyle: "italic",
  } as React.CSSProperties,
  
  badge: {
    display: "inline-block",
    padding: "5px 14px",
    border: "1px solid rgba(212, 175, 55, 0.5)",
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    color: "#d4af37",
    fontSize: "11px",
    fontWeight: 500,
    marginRight: "10px",
    borderRadius: "4px",
  } as React.CSSProperties,
  
  section: {
    padding: "28px 40px",
  } as React.CSSProperties,
  
  sectionAlt: {
    padding: "28px 40px",
    backgroundColor: "#242424",
  } as React.CSSProperties,
  
  h2: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "18px",
    color: "#faf8f5",
  } as React.CSSProperties,
  
  card: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "16px 18px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    pageBreakInside: "avoid" as const,
    breakInside: "avoid" as const,
  } as React.CSSProperties,
  
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#faf8f5",
    marginBottom: "4px",
    lineHeight: 1.3,
  } as React.CSSProperties,
  
  cardSubtitle: {
    fontSize: "13px",
    color: "#d4af37",
    fontWeight: 500,
  } as React.CSSProperties,
  
  cardMeta: {
    textAlign: "right" as const,
    flexShrink: 0,
    minWidth: "150px",
  } as React.CSSProperties,
  
  cardPeriod: {
    fontSize: "12px",
    color: "#a3a3a3",
    marginBottom: "4px",
  } as React.CSSProperties,
  
  cardDuration: {
    display: "inline-block",
    padding: "4px 10px",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    color: "#d4af37",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 500,
  } as React.CSSProperties,
  
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  } as React.CSSProperties,
  
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  } as React.CSSProperties,
  
  skillCard: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "14px",
    textAlign: "center" as const,
    pageBreakInside: "avoid" as const,
    breakInside: "avoid" as const,
  } as React.CSSProperties,
  
  skillIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #e8c860)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
    color: "#1a1a1a",
    fontSize: "16px",
    fontWeight: 700,
  } as React.CSSProperties,
  
  progressBar: {
    height: "6px",
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    borderRadius: "3px",
    overflow: "hidden",
  } as React.CSSProperties,
  
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #d4af37, #e8c860)",
    borderRadius: "3px",
  } as React.CSSProperties,
  
  contactCard: {
    backgroundColor: "rgba(212, 175, 55, 0.04)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  } as React.CSSProperties,
  
  contactIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #e8c860)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a1a1a",
    fontSize: "18px",
    flexShrink: 0,
  } as React.CSSProperties,
  
  footer: {
    padding: "20px 40px",
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
      {/* Header Section */}
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

          {/* Contact info in header */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" as const, marginBottom: "14px" }}>
            {locationContact && (
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#a3a3a3" }}>
                <span style={{ fontSize: "14px" }}>📍</span> {locationContact.value}
              </span>
            )}
            {phoneContact && (
              <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#a3a3a3" }}>
                <span style={{ fontSize: "14px" }}>📞</span> {phoneContact.value}
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

      {/* Professional Summary */}
      {profile?.professional_summary && (
        <div style={styles.sectionAlt}>
          <p style={styles.label}>Perfil Profesional</p>
          <div style={{
            backgroundColor: "rgba(212, 175, 55, 0.04)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            borderRadius: "8px",
            padding: "18px 20px",
          }}>
            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "rgba(250, 248, 245, 0.92)" }}>
              {profile.professional_summary}
            </p>
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div style={styles.section}>
          <p style={styles.label}>Trayectoria Profesional</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Experiencia</span> Laboral
          </h2>

          {experiences.map((exp) => (
            <div key={exp.id} style={styles.card}>
              <div style={{ flex: 1 }}>
                <h3 style={styles.cardTitle}>{exp.company}</h3>
                <p style={styles.cardSubtitle}>{exp.role}</p>
              </div>
              <div style={styles.cardMeta}>
                {exp.period_display && (
                  <p style={styles.cardPeriod}>{exp.period_display}</p>
                )}
                {exp.duration && (
                  <span style={styles.cardDuration}>{exp.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education & Languages */}
      {(education.length > 0 || languages.length > 0) && (
        <div style={styles.sectionAlt}>
          <div style={styles.grid2}>
            {/* Education */}
            {education.length > 0 && (
              <div>
                <p style={styles.label}>Formación Académica</p>
                <h3 style={{ ...styles.h2, fontSize: "18px" }}>
                  <span style={{ color: "#d4af37" }}>Estudios</span> Realizados
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} style={{
                    ...styles.card,
                    display: "block",
                    marginBottom: "10px",
                  }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#faf8f5", marginBottom: "4px" }}>
                      {edu.title}
                    </h4>
                    {edu.description && (
                      <p style={{ fontSize: "12px", color: "#a3a3a3" }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <p style={styles.label}>Competencias Lingüísticas</p>
                <h3 style={{ ...styles.h2, fontSize: "18px" }}>
                  <span style={{ color: "#d4af37" }}>Idiomas</span>
                </h3>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: "14px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#faf8f5", marginBottom: "3px" }}>
                      {lang.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "#d4af37", marginBottom: "6px", fontWeight: 500 }}>
                      {lang.level}
                    </p>
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

      {/* Skills Section */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <p style={styles.label}>Cualidades Personales</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Habilidades</span> y Competencias
          </h2>

          <div style={styles.grid3}>
            {skills.map((skill) => (
              <div key={skill.id} style={styles.skillCard}>
                <div style={styles.skillIcon}>★</div>
                <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#faf8f5", marginBottom: "3px" }}>
                  {skill.title}
                </h4>
                {skill.description && (
                  <p style={{ fontSize: "10px", color: "#a3a3a3", lineHeight: 1.4 }}>{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {contacts.length > 0 && (
        <div style={styles.sectionAlt}>
          <p style={styles.label}>Información de Contacto</p>
          <h2 style={styles.h2}>
            <span style={{ color: "#d4af37" }}>Contáctame</span>
          </h2>

          <div style={styles.grid2}>
            {phoneContact && (
              <div style={styles.contactCard}>
                <div style={styles.contactIcon}>📞</div>
                <div>
                  <p style={{ fontSize: "10px", color: "#a3a3a3", textTransform: "uppercase" as const, letterSpacing: "1px", marginBottom: "2px" }}>
                    Teléfono
                  </p>
                  <p style={{ fontSize: "14px", color: "#faf8f5", fontWeight: 500 }}>
                    {phoneContact.value}
                  </p>
                </div>
              </div>
            )}
            {locationContact && (
              <div style={styles.contactCard}>
                <div style={styles.contactIcon}>📍</div>
                <div>
                  <p style={{ fontSize: "10px", color: "#a3a3a3", textTransform: "uppercase" as const, letterSpacing: "1px", marginBottom: "2px" }}>
                    Ubicación
                  </p>
                  <p style={{ fontSize: "14px", color: "#faf8f5", fontWeight: 500 }}>
                    {locationContact.value}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <span style={{ color: "#d4af37", fontSize: "15px", fontWeight: 600, letterSpacing: "0.5px" }}>
          www.yesicabazan.es
        </span>
      </div>
    </div>
  );
};

export default CVPrintable;
