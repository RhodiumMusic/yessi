import {
  Phone,
  MapPin,
  Building2,
  Calendar,
  GraduationCap,
  Globe,
  Star,
  Clock,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  Award,
  Heart,
  Briefcase,
  Target,
  Shield,
  Smile,
  ThumbsUp,
  Eye,
  MessageCircle,
  Lightbulb,
  UserCircle,
  LucideIcon,
} from "lucide-react";
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

// Map of icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Star,
  Clock,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  Award,
  Heart,
  Briefcase,
  Target,
  Shield,
  Smile,
  ThumbsUp,
  Eye,
  MessageCircle,
  Lightbulb,
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
    <div
      style={{
        width: "800px",
        backgroundColor: "#1a1a1a",
        color: "#faf8f5",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #262626 100%)",
          padding: "60px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {/* Photo */}
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              border: "3px solid #d4af37",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={profile?.photo_url || profilePhoto}
              alt={profile?.full_name || ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Info */}
          <div>
            <p
              style={{
                color: "#d4af37",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Curriculum Vitae
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "42px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "8px",
                lineHeight: 1.1,
              }}
            >
              Noelia Yésica
            </h1>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 300,
                color: "#faf8f5",
                marginBottom: "20px",
              }}
            >
              Bazán Portugal
            </h2>

            {/* Contact info */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {locationContact && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={16} color="#d4af37" />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>
                    {locationContact.value}
                  </span>
                </div>
              )}
              {phoneContact && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone size={16} color="#d4af37" />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>
                    {phoneContact.value}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              {profile?.nationality && (
                <span
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#d4af37",
                    fontSize: "12px",
                  }}
                >
                  {profile.nationality_flag} {profile.nationality}
                </span>
              )}
              {profile?.availability_status && (
                <span
                  style={{
                    padding: "6px 12px",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#d4af37",
                    fontSize: "12px",
                  }}
                >
                  {profile.availability_status}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      {profile?.professional_summary && (
        <section style={{ padding: "40px", background: "#262626" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserCircle size={20} color="#1a1a1a" />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Perfil Profesional
            </h2>
          </div>
          <div
            style={{
              background: "rgba(212, 175, 55, 0.05)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(250, 248, 245, 0.9)" }}>
              {profile.professional_summary}
            </p>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section style={{ padding: "40px", background: "#1a1a1a" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Trayectoria Profesional
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Experiencia
              </span>{" "}
              <span style={{ color: "#faf8f5" }}>Laboral</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  background: "rgba(212, 175, 55, 0.05)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "8px",
                      background: "rgba(212, 175, 55, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={24} color="#d4af37" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#faf8f5",
                        marginBottom: "4px",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p style={{ color: "#d4af37", fontSize: "14px", fontWeight: 500 }}>
                      {exp.role}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "8px",
                      }}
                    >
                      {exp.period_display && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Calendar size={14} color="rgba(212, 175, 55, 0.7)" />
                          <span style={{ fontSize: "13px", color: "#a3a3a3" }}>
                            {exp.period_display}
                          </span>
                        </div>
                      )}
                      {exp.duration && (
                        <span
                          style={{
                            padding: "4px 10px",
                            background: "rgba(212, 175, 55, 0.1)",
                            color: "#d4af37",
                            borderRadius: "12px",
                            fontSize: "11px",
                          }}
                        >
                          {exp.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Languages Section */}
      {(education.length > 0 || languages.length > 0) && (
        <section style={{ padding: "40px", background: "#262626" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            {/* Education */}
            {education.length > 0 && (
              <div>
                <p
                  style={{
                    color: "#d4af37",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Formación Académica
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Estudios
                  </span>{" "}
                  <span style={{ color: "#faf8f5" }}>Realizados</span>
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      style={{
                        background: "rgba(212, 175, 55, 0.05)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <GraduationCap size={24} color="#1a1a1a" />
                        </div>
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#faf8f5",
                              marginBottom: "4px",
                            }}
                          >
                            {edu.title}
                          </h3>
                          {edu.description && (
                            <p style={{ fontSize: "13px", color: "#a3a3a3" }}>{edu.description}</p>
                          )}
                          {edu.institution && (
                            <p style={{ fontSize: "12px", color: "#d4af37", marginTop: "4px" }}>
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
            {languages.length > 0 && (
              <div>
                <p
                  style={{
                    color: "#d4af37",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Competencias Lingüísticas
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                    background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Idiomas
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      style={{
                        background: "rgba(212, 175, 55, 0.05)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Globe size={24} color="#1a1a1a" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#faf8f5",
                              marginBottom: "8px",
                            }}
                          >
                            {lang.name}
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span
                              style={{
                                padding: "4px 12px",
                                background: "#d4af37",
                                color: "#1a1a1a",
                                fontWeight: 600,
                                fontSize: "11px",
                              }}
                            >
                              {lang.level.toUpperCase()}
                            </span>
                            <div
                              style={{
                                flex: 1,
                                height: "6px",
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: "3px",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${lang.proficiency_percent ?? 100}%`,
                                  background: "linear-gradient(90deg, #d4af37, #f4e4bc)",
                                }}
                              />
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
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section style={{ padding: "40px", background: "#1a1a1a" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Cualidades Personales
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Otros Datos
              </span>{" "}
              <span style={{ color: "#faf8f5" }}>de Interés</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {skills.map((skill) => {
              const IconComponent = iconMap[skill.icon_name || "Star"] || Star;
              return (
                <div
                  key={skill.id}
                  style={{
                    background: "rgba(212, 175, 55, 0.05)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        background: "rgba(212, 175, 55, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={20} color="#d4af37" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#faf8f5",
                          marginBottom: "4px",
                        }}
                      >
                        {skill.title}
                      </h3>
                      {skill.description && (
                        <p style={{ fontSize: "12px", color: "#a3a3a3" }}>{skill.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section style={{ padding: "40px", background: "#262626" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p
            style={{
              color: "#d4af37",
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Información de Contacto
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contáctame
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
          {phoneContact && (
            <div
              style={{
                background: "rgba(212, 175, 55, 0.05)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Phone size={28} color="#1a1a1a" />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#faf8f5",
                  marginBottom: "8px",
                }}
              >
                Teléfono
              </h3>
              <p style={{ color: "#d4af37", fontSize: "18px", fontWeight: 500 }}>
                {phoneContact.value}
              </p>
            </div>
          )}

          {locationContact && (
            <div
              style={{
                background: "rgba(212, 175, 55, 0.05)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <MapPin size={28} color="#1a1a1a" />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#faf8f5",
                  marginBottom: "8px",
                }}
              >
                Ubicación
              </h3>
              <p style={{ color: "#d4af37", fontSize: "18px", fontWeight: 500 }}>
                {locationContact.value}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "32px",
          background: "#1a1a1a",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* Decorative divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "64px",
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5))",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#d4af37",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                width: "64px",
                height: "1px",
                background: "linear-gradient(to left, transparent, rgba(212, 175, 55, 0.5))",
              }}
            />
          </div>

          {/* Website link */}
          <a
            href="https://www.yesicabazan.es/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              color: "#d4af37",
              textDecoration: "none",
            }}
          >
            www.yesicabazan.es
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CVPrintable;
