import { Phone, MapPin } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";

/**
 * PDF-Optimized Contact Section
 * Light mode, no animations, compact for print
 */
const PDFContactSection = () => {
  const { data: contacts } = useContactInfo();

  const phoneContact = contacts?.find(c => c.type === 'phone');
  const locationContact = contacts?.find(c => c.type === 'location');

  if (!phoneContact && !locationContact) {
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
            Información de Contacto
          </span>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            margin: "8px 0 12px",
            color: "#1a1a1a"
          }}>
            <span style={{ color: "#b8860b" }}>Contáctame</span>
          </h2>
          <div style={{
            height: "1px",
            maxWidth: "200px",
            margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #c9a227, transparent)"
          }} />
        </div>

        {/* Contact Cards */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {phoneContact && (
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              minWidth: "200px"
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a227, #daa520)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}>
                <Phone style={{ width: "28px", height: "28px", color: "#fff" }} />
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#1a1a1a",
                margin: "0 0 8px"
              }}>
                Teléfono
              </h3>
              <p style={{ 
                color: "#b8860b", 
                fontSize: "18px", 
                fontWeight: 500,
                margin: 0 
              }}>
                {phoneContact.value}
              </p>
            </div>
          )}

          {locationContact && (
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              minWidth: "200px"
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a227, #daa520)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}>
                <MapPin style={{ width: "28px", height: "28px", color: "#fff" }} />
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#1a1a1a",
                margin: "0 0 8px"
              }}>
                Ubicación
              </h3>
              <p style={{ 
                color: "#b8860b", 
                fontSize: "18px", 
                fontWeight: 500,
                margin: 0 
              }}>
                {locationContact.value}
              </p>
              {locationContact.label && (
                <p style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>
                  {locationContact.label}
                </p>
              )}
            </div>
          )}
        </div>

        {/* CTA Message */}
        <div style={{
          textAlign: "center",
          marginTop: "24px",
          padding: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px"
        }}>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#1a1a1a",
            margin: "0 0 8px"
          }}>
            ¿Lista para trabajar?
          </h3>
          <p style={{ 
            color: "#666", 
            fontSize: "13px", 
            margin: 0,
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Con más de 12 años de experiencia en hostelería y disponibilidad inmediata,
            estoy preparada para incorporarme a su equipo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PDFContactSection;
