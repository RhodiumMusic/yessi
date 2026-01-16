import { useSearchParams } from "react-router-dom";

const Footer = () => {
  const [searchParams] = useSearchParams();
  const isPDF = searchParams.get("pdf") === "true";

  // Special footer for PDF export
  if (isPDF) {
    return (
      <footer className="py-8 bg-charcoal border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Decorative divider */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400/50" />
              <div className="w-2 h-2 bg-gold-400 rotate-45" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400/50" />
            </div>

            {/* Website link */}
            <a
              href="https://www.yesicabazan.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl text-gold-400 hover:text-gold-300 transition-colors"
            >
              www.yesicabazan.es
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-8 bg-charcoal border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-display text-xl text-gradient-gold font-semibold">
              <span className="block">Noelia Yésica</span>
              <span className="block">Bazán Portugal</span>
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

        {/* Developer credit */}
        <div className="mt-6 pt-4 border-t border-primary/10 text-center">
          <p className="text-sm text-muted-foreground/60">
            Desarrollado por:{" "}
            <a
              href="https://tech.rhodiummusic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-muted-foreground/80 hover:text-primary transition-colors"
            >
              Rhodium Music Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;