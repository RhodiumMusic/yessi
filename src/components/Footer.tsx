const Footer = () => {
  return (
    <footer className="py-8 bg-charcoal border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-display text-xl text-gradient-gold font-semibold">
              Noelia Yésica Bazán Portugal
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Profesional de la Hostelería
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Benidorm</span>
            <span className="text-primary">•</span>
            <span>España</span>
            <span className="text-primary">•</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
