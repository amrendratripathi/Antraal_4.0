import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const ref = useScrollReveal();

  const stats = [
    { value: "4", label: "Events" },
    { value: "2", label: "Days" },
    { value: "₹20K+", label: "Prize Pool" },
    { value: "Certificates", label: "for all Participants" },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="scroll-reveal text-center mb-16">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-3">ABOUT THE EVENT</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Where Code Meets <span className="text-gradient">Competition</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Welcome to Antraal 4.0, the annual techno-cultural & sports fest of Lloyd Institute of Engineering and Technology — a vibrant celebration of innovation, talent, and youthful spirit. From electrifying e-sports battles to intellectually stimulating AI challenges, every moment reflects energy, enthusiasm, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 scroll-reveal" style={{ transitionDelay: "0.2s" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center group hover:glow-border transition-all duration-500">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
