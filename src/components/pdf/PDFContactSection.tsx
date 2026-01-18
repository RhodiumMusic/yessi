import { useContactInfo } from "@/hooks/useContactInfo";

/**
 * PDF-Optimized Contact Section
 * Light mode, no animations, compact for print
 * Uses Unicode icons instead of Lucide for html2canvas compatibility
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
        padding: "24px",
        pageBreakInside: "avoid",
        breakInside: "avoid"
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
              padding: "20px",
              textAlign: "center",
              minWidth: "180px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a227, #daa520)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px"
              }}>
                <span style={{ fontSize: "24px" }}>📞</span>
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1a1a1a",
                margin: "0 0 6px"
              }}>
                Teléfono
              </h3>
              <p style={{ 
                color: "#b8860b", 
                fontSize: "16px", 
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
              padding: "20px",
              textAlign: "center",
              minWidth: "180px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a227, #daa520)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px"
              }}>
                <span style={{ fontSize: "24px" }}>📍</span>
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1a1a1a",
                margin: "0 0 6px"
              }}>
                Ubicación
              </h3>
              <p style={{ 
                color: "#b8860b", 
                fontSize: "16px", 
                fontWeight: 500,
                margin: 0 
              }}>
                {locationContact.value}
              </p>
              {locationContact.label && (
                <p style={{ color: "#666", fontSize: "11px", marginTop: "4px" }}>
                  {locationContact.label}
                </p>
              )}
            </div>
          )}
        </div>

        {/* CTA Message */}
        <div style={{
          textAlign: "center",
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px"
        }}>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#1a1a1a",
            margin: "0 0 6px"
          }}>
            ¿Lista para trabajar?
          </h3>
          <p style={{ 
            color: "#666", 
            fontSize: "12px", 
            margin: 0,
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.4
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
