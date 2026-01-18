import { Phone, MapPin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePublicProfile } from "@/hooks/usePublicProfile";
import { useContactInfo } from "@/hooks/useContactInfo";

/**
 * PDF-Optimized Hero Section
 * Light mode, no animations, high contrast
 */
const PDFHeroSection = () => {
  const { data: profile } = usePublicProfile();
  const { data: contacts } = useContactInfo();

  const phoneContact = contacts?.find(c => c.type === 'phone');
  const locationContact = contacts?.find(c => c.type === 'location');

  return (
    <section 
      className="pdf-avoid-break"
      style={{ 
        backgroundColor: "#ffffff",
        padding: "40px 24px",
        pageBreakInside: "avoid"
      }}
    >
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "40px",
        maxWidth: "720px",
        margin: "0 auto"
      }}>
        {/* Photo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #c9a227",
            boxShadow: "0 4px 20px rgba(201, 162, 39, 0.2)"
          }}>
            <img
              src={profile?.photo_url || profilePhoto}
              alt={profile?.full_name || "Noelia Yésica Bazán Portugal"}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover" 
              }}
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <p style={{ 
            color: "#b8860b", 
            fontSize: "11px", 
            letterSpacing: "0.2em", 
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "'Inter', sans-serif"
          }}>
            Curriculum Vitae
          </p>
          
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#b8860b",
            margin: "0 0 4px 0",
            lineHeight: 1.2
          }}>
            Noelia Yésica
          </h1>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            fontWeight: 400,
            color: "#1a1a1a",
            margin: "0 0 16px 0"
          }}>
            Bazán Portugal
          </h2>

          {/* Divider */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #c9a227, transparent)",
            marginBottom: "16px"
          }} />

          {/* Contact Info */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {locationContact && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(201, 162, 39, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <MapPin style={{ width: "16px", height: "16px", color: "#b8860b" }} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Localidad</p>
                  <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, margin: 0 }}>{locationContact.value}</p>
                </div>
              </div>
            )}

            {phoneContact && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(201, 162, 39, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Phone style={{ width: "16px", height: "16px", color: "#b8860b" }} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Teléfono</p>
                  <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, margin: 0 }}>{phoneContact.value}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            {profile?.nationality && (
              <span style={{
                padding: "6px 12px",
                border: "1px solid #c9a227",
                color: "#b8860b",
                fontSize: "11px",
                letterSpacing: "0.05em"
              }}>
                {profile.nationality_flag} {profile.nationality}
              </span>
            )}
            {profile?.availability_status && (
              <span style={{
                padding: "6px 12px",
                border: "1px solid #c9a227",
                color: "#b8860b",
                fontSize: "11px",
                letterSpacing: "0.05em"
              }}>
                {profile.availability_status}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFHeroSection;
