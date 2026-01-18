/**
 * PDF-Optimized Footer
 * Light mode, compact, professional
 */
const PDFFooter = () => {
  return (
    <footer 
      className="pdf-avoid-break"
      style={{ 
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e5e5",
        padding: "24px",
        pageBreakInside: "avoid"
      }}
    >
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "12px" 
      }}>
        {/* Decorative divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            width: "48px", 
            height: "1px", 
            background: "linear-gradient(to right, transparent, #c9a227)" 
          }} />
          <div style={{ 
            width: "6px", 
            height: "6px", 
            backgroundColor: "#c9a227", 
            transform: "rotate(45deg)" 
          }} />
          <div style={{ 
            width: "48px", 
            height: "1px", 
            background: "linear-gradient(to left, transparent, #c9a227)" 
          }} />
        </div>
        
        {/* Website */}
        <p style={{ 
          fontFamily: "'Playfair Display', serif",
          fontSize: "16px",
          color: "#b8860b",
          margin: 0
        }}>
          www.yesicabazan.es
        </p>
        
        {/* Generation date */}
        <p style={{ 
          fontSize: "10px",
          color: "#999",
          margin: 0
        }}>
          Generado el {new Date().toLocaleDateString("es-ES", { 
            day: "numeric", 
            month: "long", 
            year: "numeric" 
          })}
        </p>
      </div>
    </footer>
  );
};

export default PDFFooter;
