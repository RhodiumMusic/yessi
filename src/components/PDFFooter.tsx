/**
 * PDF-Optimized Footer
 * Light mode, compact, professional
 * Reduced padding to avoid empty page
 */
const PDFFooter = () => {
  const exportDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <footer 
      className="pdf-avoid-break"
      style={{ 
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e5e5",
        padding: "16px 24px",
        pageBreakInside: "avoid",
        marginTop: "auto"
      }}
    >
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "8px" 
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
          fontSize: "14px",
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
          Generado el {exportDate}
        </p>
      </div>
    </footer>
  );
};

export default PDFFooter;
