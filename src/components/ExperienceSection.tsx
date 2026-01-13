import { Building2, Calendar, Loader2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useExperiences } from "@/hooks/useExperiences";

const ExperienceSection = () => {
  const { data: experiences, isLoading } = useExperiences();

  if (isLoading) {
    return (
      <section className="py-16 bg-charcoal relative overflow-hidden">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-charcoal relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Trayectoria Profesional
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="text-gradient-gold">Experiencia</span>{" "}
              <span className="text-foreground">Laboral</span>
            </h2>
            <div className="luxury-divider max-w-md mx-auto" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <ScrollReveal
              key={exp.id}
              delay={index * 100}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:-translate-x-1/2 shadow-gold z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ml-8 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors ${index % 2 === 0 ? "md:order-last" : ""}`}>
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                          {exp.company}
                        </h3>
                        <p className="text-primary font-medium">{exp.role}</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-4 text-muted-foreground text-sm ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        <span>{exp.period_display}</span>
                      </div>
                      {exp.duration && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {exp.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
