import { Building2, Calendar } from "lucide-react";

interface ExperienceItem {
  empresa: string;
  funcion: string;
  tiempo: string;
  periodo?: string;
}

const experiences: ExperienceItem[] = [
  {
    empresa: 'Hotel "BENIDORM PLAZA"',
    funcion: "Camarera de pisos",
    tiempo: "1 año",
    periodo: "2023",
  },
  {
    empresa: 'Hotel "FIESTA PARK"',
    funcion: "Camarera de pisos",
    tiempo: "1 año y medio",
    periodo: "2021 - 2022",
  },
  {
    empresa: 'Industrias hosteleras del mediterráneo, Hoteles "VILLA VENECIA, VILLA DEL MAR, FENICIA y CRISTAL PARK"',
    funcion: "Cubre turno: Camarera de Pisos",
    tiempo: "6 meses",
    periodo: "2018",
  },
  {
    empresa: 'Hotel "PRIMAVERA"',
    funcion: "Cubre turno: Cocinera, camarera de comedor, camarera de pisos y ayudante de cocina",
    tiempo: "3 años",
    periodo: "2016 - 2019",
  },
  {
    empresa: 'Restaurante "EL PESCADOR"',
    funcion: "Cocinera y Camarera de Barra",
    tiempo: "3 años",
    periodo: "2012 - 2015",
  },
  {
    empresa: 'Pizzería Restaurante "AL TERRAZO"',
    funcion: "Cocinera",
    tiempo: "1 año",
    periodo: "2011",
  },
  {
    empresa: 'Varios "APARTAMENTOS TURÍSTICOS"',
    funcion: "Limpieza de Apartamentos",
    tiempo: "1 año",
    periodo: "2011",
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-16 bg-charcoal relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section header */}
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

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
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
                        {exp.empresa}
                      </h3>
                      <p className="text-primary font-medium">{exp.funcion}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 text-muted-foreground text-sm ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary/70" />
                      <span>{exp.periodo}</span>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {exp.tiempo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
