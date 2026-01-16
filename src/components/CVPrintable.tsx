import profilePhoto from "@/assets/profile-photo.jpg";

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
    <div
      style={{
        width: "800px",
        backgroundColor: "#1a1a1a",
        color: "#faf8f5",
        fontFamily: "Arial, sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #262626 100%)",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <img
          src={profile?.photo_url || profilePhoto}
          alt={profile?.full_name || ""}
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            border: "3px solid #d4af37",
            objectFit: "cover" as const,
            flexShrink: 0,
          }}
          crossOrigin="anonymous"
        />
        <div>
          <p
            style={{
              fontSize: "14px",
              color: "#d4af37",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              marginBottom: "8px",
            }}
          >
            Curriculum Vitae
          </p>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#d4af37",
              marginBottom: "4px",
              lineHeight: 1.2,
            }}
          >
            Noelia Yésica Bazán
          </h1>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 300,
              color: "#faf8f5",
              marginBottom: "16px",
            }}
          >
            Portugal
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap" as const,
              marginBottom: "12px",
            }}
          >
            {locationContact && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#a3a3a3",
                }}
              >
                📍 {locationContact.value}
              </span>
            )}
            {phoneContact && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#a3a3a3",
                }}
              >
                📞 {phoneContact.value}
              </span>
            )}
          </div>

          <div>
            {profile?.nationality && (
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  color: "#d4af37",
                  fontSize: "12px",
                  marginRight: "10px",
                }}
              >
                {profile.nationality_flag} {profile.nationality}
              </span>
            )}
            {profile?.availability_status && (
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  color: "#d4af37",
                  fontSize: "12px",
                  marginRight: "10px",
                }}
              >
                {profile.availability_status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {profile?.professional_summary && (
        <div style={{ padding: "30px 40px", backgroundColor: "#262626" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#d4af37",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              marginBottom: "8px",
            }}
          >
            Perfil Profesional
          </p>
          <div
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(250, 248, 245, 0.9)",
              }}
            >
              {profile.professional_summary}
            </p>
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ padding: "30px 40px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#d4af37",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              marginBottom: "8px",
            }}
          >
            Trayectoria Profesional
          </p>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#faf8f5",
            }}
          >
            <span style={{ color: "#d4af37" }}>Experiencia</span> Laboral
          </h2>

          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.05)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#faf8f5",
                    marginBottom: "4px",
                  }}
                >
                  {exp.company}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#d4af37",
                    fontWeight: 500,
                  }}
                >
                  {exp.role}
                </p>
              </div>
              <div
                style={{
                  textAlign: "right" as const,
                  flexShrink: 0,
                  minWidth: "140px",
                }}
              >
                {exp.period_display && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#a3a3a3",
                      marginBottom: "4px",
                    }}
                  >
                    {exp.period_display}
                  </p>
                )}
                {exp.duration && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      color: "#d4af37",
                      borderRadius: "10px",
                      fontSize: "11px",
                    }}
                  >
                    {exp.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education & Languages */}
      {(education.length > 0 || languages.length > 0) && (
        <div style={{ padding: "30px 40px", backgroundColor: "#262626" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* Education */}
            {education.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#d4af37",
                    letterSpacing: "2px",
                    textTransform: "uppercase" as const,
                    marginBottom: "8px",
                  }}
                >
                  Formación Académica
                </p>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#faf8f5",
                  }}
                >
                  <span style={{ color: "#d4af37" }}>Estudios</span> Realizados
                </h3>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.05)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                      borderRadius: "8px",
                      padding: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#faf8f5",
                        marginBottom: "4px",
                      }}
                    >
                      {edu.title}
                    </h4>
                    {edu.description && (
                      <p style={{ fontSize: "12px", color: "#a3a3a3" }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#d4af37",
                    letterSpacing: "2px",
                    textTransform: "uppercase" as const,
                    marginBottom: "8px",
                  }}
                >
                  Competencias Lingüísticas
                </p>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#faf8f5",
                  }}
                >
                  <span style={{ color: "#d4af37" }}>Idiomas</span>
                </h3>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: "14px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#faf8f5",
                        marginBottom: "4px",
                      }}
                    >
                      {lang.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#d4af37",
                        marginBottom: "6px",
                      }}
                    >
                      {lang.level}
                    </p>
                    <div
                      style={{
                        height: "6px",
                        backgroundColor: "rgba(212, 175, 55, 0.2)",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "linear-gradient(90deg, #d4af37, #f4e4bc)",
                          borderRadius: "3px",
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
        <div style={{ padding: "30px 40px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#d4af37",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              marginBottom: "8px",
            }}
          >
            Cualidades Personales
          </p>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#faf8f5",
            }}
          >
            <span style={{ color: "#d4af37" }}>Habilidades</span> y Competencias
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: "8px",
                  padding: "14px",
                  textAlign: "center" as const,
                }}
              >
                <div
                  style={{
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
                  }}
                >
                  ★
                </div>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#faf8f5",
                    marginBottom: "4px",
                  }}
                >
                  {skill.title}
                </h4>
                {skill.description && (
                  <p style={{ fontSize: "11px", color: "#a3a3a3" }}>
                    {skill.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      {contacts.length > 0 && (
        <div style={{ padding: "30px 40px", backgroundColor: "#262626" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#d4af37",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
              marginBottom: "8px",
            }}
          >
            Información de Contacto
          </p>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#faf8f5",
            }}
          >
            <span style={{ color: "#d4af37" }}>Contáctame</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {phoneContact && (
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a1a1a",
                    fontSize: "18px",
                  }}
                >
                  📞
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#a3a3a3",
                      textTransform: "uppercase" as const,
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Teléfono
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#faf8f5",
                      fontWeight: 500,
                    }}
                  >
                    {phoneContact.value}
                  </p>
                </div>
              </div>
            )}
            {locationContact && (
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a1a1a",
                    fontSize: "18px",
                  }}
                >
                  📍
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#a3a3a3",
                      textTransform: "uppercase" as const,
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Ubicación
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#faf8f5",
                      fontWeight: 500,
                    }}
                  >
                    {locationContact.value}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: "20px 40px",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)",
          textAlign: "center" as const,
        }}
      >
        <span
          style={{
            color: "#d4af37",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          www.yesicabazan.es
        </span>
      </div>
    </div>
  );
};

export default CVPrintable;
