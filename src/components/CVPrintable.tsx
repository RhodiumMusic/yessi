import profilePhoto from "@/assets/profile-photo.jpg";

// Types
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

// Inline styles for PDF - html2canvas works better with inline styles
const styles = {
  container: {
    width: "800px",
    backgroundColor: "#1a1a1a",
    color: "#faf8f5",
    fontFamily: "Arial, sans-serif",
    padding: "0",
    margin: "0",
  } as React.CSSProperties,
  header: {
    background: "linear-gradient(180deg, #1a1a1a 0%, #262626 100%)",
    padding: "40px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
  } as React.CSSProperties,
  photo: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "3px solid #d4af37",
    objectFit: "cover",
    flexShrink: 0,
  } as React.CSSProperties,
  title: {
    fontSize: "14px",
    color: "#d4af37",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  } as React.CSSProperties,
  name: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#d4af37",
    marginBottom: "4px",
    lineHeight: 1.2,
  } as React.CSSProperties,
  surname: {
    fontSize: "28px",
    fontWeight: 300,
    color: "#faf8f5",
    marginBottom: "16px",
  } as React.CSSProperties,
  contactRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "12px",
  } as React.CSSProperties,
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#a3a3a3",
  } as React.CSSProperties,
  tag: {
    display: "inline-block",
    padding: "4px 12px",
    border: "1px solid rgba(212, 175, 55, 0.4)",
    color: "#d4af37",
    fontSize: "12px",
    marginRight: "10px",
  } as React.CSSProperties,
  section: {
    padding: "30px 40px",
  } as React.CSSProperties,
  sectionDark: {
    padding: "30px 40px",
    backgroundColor: "#262626",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "11px",
    color: "#d4af37",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  } as React.CSSProperties,
  sectionHeading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#faf8f5",
  } as React.CSSProperties,
  goldText: {
    color: "#d4af37",
  } as React.CSSProperties,
  summaryBox: {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "20px",
  } as React.CSSProperties,
  summaryText: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "rgba(250, 248, 245, 0.9)",
  } as React.CSSProperties,
  experienceCard: {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  } as React.CSSProperties,
  expLeft: {
    flex: 1,
  } as React.CSSProperties,
  expRight: {
    textAlign: "right",
    flexShrink: 0,
    minWidth: "140px",
  } as React.CSSProperties,
  expCompany: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#faf8f5",
    marginBottom: "4px",
  } as React.CSSProperties,
  expRole: {
    fontSize: "14px",
    color: "#d4af37",
    fontWeight: 500,
  } as React.CSSProperties,
  expPeriod: {
    fontSize: "13px",
    color: "#a3a3a3",
    marginBottom: "4px",
  } as React.CSSProperties,
  expDuration: {
    display: "inline-block",
    padding: "3px 8px",
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    color: "#d4af37",
    borderRadius: "10px",
    fontSize: "11px",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  } as React.CSSProperties,
  eduCard: {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "14px",
    marginBottom: "10px",
  } as React.CSSProperties,
  eduTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#faf8f5",
    marginBottom: "4px",
  } as React.CSSProperties,
  eduDesc: {
    fontSize: "12px",
    color: "#a3a3a3",
  } as React.CSSProperties,
  langItem: {
    marginBottom: "14px",
  } as React.CSSProperties,
  langName: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#faf8f5",
    marginBottom: "4px",
  } as React.CSSProperties,
  langLevel: {
    fontSize: "12px",
    color: "#d4af37",
    marginBottom: "6px",
  } as React.CSSProperties,
  langBar: {
    height: "6px",
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    borderRadius: "3px",
    overflow: "hidden",
  } as React.CSSProperties,
  langFill: {
    height: "100%",
    background: "linear-gradient(90deg, #d4af37, #f4e4bc)",
    borderRadius: "3px",
  } as React.CSSProperties,
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  } as React.CSSProperties,
  skillCard: {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "14px",
    textAlign: "center",
  } as React.CSSProperties,
  skillIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 8px",
    color: "#1a1a1a",
    fontSize: "18px",
  } as React.CSSProperties,
  skillTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#faf8f5",
    marginBottom: "4px",
  } as React.CSSProperties,
  skillDesc: {
    fontSize: "11px",
    color: "#a3a3a3",
  } as React.CSSProperties,
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  } as React.CSSProperties,
  contactCard: {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,
  contactLabel: {
    fontSize: "11px",
    color: "#a3a3a3",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "2px",
  } as React.CSSProperties,
  contactValue: {
    fontSize: "14px",
    color: "#faf8f5",
    fontWeight: 500,
  } as React.CSSProperties,
  footer: {
    padding: "20px 40px",
    borderTop: "1px solid rgba(212, 175, 55, 0.2)",
    textAlign: "center",
  } as React.CSSProperties,
  footerLink: {
    color: "#d4af37",
    fontSize: "16px",
    fontWeight: 600,
    textDecoration: "none",
  } as React.CSSProperties,
};

const CVPrintable = ({
  profile,
  experiences,
  education,
  languages,
  skills,
  contacts,
}: CVPrintableProps) => {
  const phoneContact = contacts?.find((c) => c.type === "phone");
  const locationContact = contacts?.find((c) => c.type === "location");

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img
          src={profile?.photo_url || profilePhoto}
          alt={profile?.full_name || ""}
          style={styles.photo}
          crossOrigin="anonymous"
        />
        <div>
          <p style={styles.title}>Curriculum Vitae</p>
          <h1 style={styles.name}>Noelia Yésica Bazán</h1>
          <h2 style={styles.surname}>Portugal</h2>
          
          <div style={styles.contactRow}>
            {locationContact && (
              <span style={styles.contactItem}>
                📍 {locationContact.value}
              </span>
            )}
            {phoneContact && (
              <span style={styles.contactItem}>
                📞 {phoneContact.value}
              </span>
            )}
          </div>
          
          <div>
            {profile?.nationality && (
              <span style={styles.tag}>
                {profile.nationality_flag} {profile.nationality}
              </span>
            )}
            {profile?.availability_status && (
              <span style={styles.tag}>
                {profile.availability_status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {profile?.professional_summary && (
        <div style={styles.sectionDark}>
          <p style={styles.sectionTitle}>Perfil Profesional</p>
          <div style={styles.summaryBox}>
            <p style={styles.summaryText}>{profile.professional_summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Trayectoria Profesional</p>
          <h2 style={styles.sectionHeading}>
            <span style={styles.goldText}>Experiencia</span> Laboral
          </h2>
          
          {experiences.map((exp) => (
            <div key={exp.id} style={styles.experienceCard}>
              <div style={styles.expLeft}>
                <h3 style={styles.expCompany}>{exp.company}</h3>
                <p style={styles.expRole}>{exp.role}</p>
              </div>
              <div style={styles.expRight as React.CSSProperties}>
                {exp.period_display && (
                  <p style={styles.expPeriod}>{exp.period_display}</p>
                )}
                {exp.duration && (
                  <span style={styles.expDuration}>{exp.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education & Languages */}
      {(education.length > 0 || languages.length > 0) && (
        <div style={styles.sectionDark}>
          <div style={styles.grid}>
            {/* Education */}
            {education.length > 0 && (
              <div>
                <p style={styles.sectionTitle}>Formación Académica</p>
                <h3 style={{ ...styles.sectionHeading, fontSize: "20px" }}>
                  <span style={styles.goldText}>Estudios</span> Realizados
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} style={styles.eduCard}>
                    <h4 style={styles.eduTitle}>{edu.title}</h4>
                    {edu.description && (
                      <p style={styles.eduDesc}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <p style={styles.sectionTitle}>Competencias Lingüísticas</p>
                <h3 style={{ ...styles.sectionHeading, fontSize: "20px" }}>
                  <span style={styles.goldText}>Idiomas</span>
                </h3>
                {languages.map((lang) => (
                  <div key={lang.id} style={styles.langItem}>
                    <p style={styles.langName}>{lang.name}</p>
                    <p style={styles.langLevel}>{lang.level}</p>
                    <div style={styles.langBar}>
                      <div
                        style={{
                          ...styles.langFill,
                          width: `${lang.proficiency_percent || 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Cualidades Personales</p>
          <h2 style={styles.sectionHeading}>
            <span style={styles.goldText}>Habilidades</span> y Competencias
          </h2>
          
          <div style={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.id} style={styles.skillCard as React.CSSProperties}>
                <div style={styles.skillIcon as React.CSSProperties}>★</div>
                <h4 style={styles.skillTitle}>{skill.title}</h4>
                {skill.description && (
                  <p style={styles.skillDesc}>{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      {contacts.length > 0 && (
        <div style={styles.sectionDark}>
          <p style={styles.sectionTitle}>Información de Contacto</p>
          <h2 style={styles.sectionHeading}>
            <span style={styles.goldText}>Contáctame</span>
          </h2>
          
          <div style={styles.contactGrid}>
            {phoneContact && (
              <div style={styles.contactCard}>
                <div style={styles.skillIcon as React.CSSProperties}>📞</div>
                <div>
                  <p style={styles.contactLabel as React.CSSProperties}>Teléfono</p>
                  <p style={styles.contactValue}>{phoneContact.value}</p>
                </div>
              </div>
            )}
            {locationContact && (
              <div style={styles.contactCard}>
                <div style={styles.skillIcon as React.CSSProperties}>📍</div>
                <div>
                  <p style={styles.contactLabel as React.CSSProperties}>Ubicación</p>
                  <p style={styles.contactValue}>{locationContact.value}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer as React.CSSProperties}>
        <a
          href="https://www.yesicabazan.es/"
          style={styles.footerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          www.yesicabazan.es
        </a>
      </div>
    </div>
  );
};

export default CVPrintable;
