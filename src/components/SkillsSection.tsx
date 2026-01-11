import { Star, Clock, Users, Sparkles, Zap, CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  {
    icon: Star,
    title: "Buena presencia",
    description: "Con experiencia de cara al público",
  },
  {
    icon: Clock,
    title: "Flexibilidad horaria",
    description: "Disponibilidad inmediata",
  },
  {
    icon: Users,
    title: "Trabajo en equipo",
    description: "Capacidad de trabajo individual y en equipo",
  },
  {
    icon: CheckCircle,
    title: "Responsable",
    description: "Muy responsable, puntual y organizada",
  },
  {
    icon: Zap,
    title: "Fácil aprendizaje",
    description: "Disposición a nuevas tareas",
  },
  {
    icon: Sparkles,
    title: "Profesional",
    description: "Más de 12 años de experiencia en hostelería",
  },
];

const SkillsSection = () => {
  return (
    <section className="py-16 bg-charcoal relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Cualidades Personales
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="text-gradient-gold">Otros Datos</span>{" "}
              <span className="text-foreground">de Interés</span>
            </h2>
            <div className="luxury-divider max-w-md mx-auto" />
          </div>
        </ScrollReveal>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <ScrollReveal key={index} delay={index * 80} direction="scale">
              <div
                className="luxury-card group hover:border-primary/50 transition-all duration-500 hover:shadow-gold hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-gold transition-all duration-300">
                    <skill.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
