const PDFFooter = () => {
  return (
    <footer className="py-8 bg-charcoal border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400/50" />
            <div className="w-2 h-2 bg-gold-400 rotate-45" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400/50" />
          </div>
          <a 
            href="https://www.yesicabazan.es/" 
            className="font-display text-xl text-gold-400 hover:text-gold-300 transition-colors"
          >
            www.yesicabazan.es
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PDFFooter;
