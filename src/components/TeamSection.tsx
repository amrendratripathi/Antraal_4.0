import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const teamMembers = [
  {
    name: "Amrendra Tripathi",
    role: "Event Head",
    phone: "9693748320",
    image: "/team/Amrendra.jpeg",
  },
  {
    name: "Pari Katariya",
    role: "Event Head",
    phone: "7470574373",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Prashant Mishra",
    role: "Event Coordinator",
    phone: "6306995599",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Akalp Mishra",
    role: "Event Coordinator",
    phone: "9354945823",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Moksh Bhardwaj",
    role: "Event Coordinator",
    phone: "9599012714",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Kunal Bagga",
    role: "Event Coordinator",
    phone: "9012261370",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Vaibhav Tiwari",
    role: "Event Coordinator",
    phone: "8004596673",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Chiranjeev Mishra",
    role: "Event Coordinator",
    phone: "9311090999",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Shivani Sharma",
    role: "Event Coordinator",
    phone: "8920575147",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Taru Sharma",
    role: "Event Coordinator",
    phone: "7011047905",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Moksh Bhardwaj",
    role: "Event Coordinator",
    phone: "9599012714",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Rutika Sable",
    role: "Event Coordinator",
    phone: "8070475858",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Anmol   Raj",
    role: "Event Volunteer",
    phone: "7783845818",
    image: "/team/Sample.jpeg",
  },
  {
    name: "Vanshika Chauhan",
    role: "Event Volunteer",
    phone: "6397513064",
    image: "/team/Sample.jpeg",
  },
];

const cardsPerPage = 4;

const TeamSection = () => {
  const ref = useScrollReveal();
  const [startIndex, setStartIndex] = useState(0);

  const visibleMembers = Array.from({ length: cardsPerPage }, (_, idx) => {
    const index = (startIndex + idx) % teamMembers.length;
    return teamMembers[index];
  });

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  return (
    <section id="team" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="scroll-reveal text-center mb-10">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-3">THE PEOPLE BEHIND</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Our <span className="text-gradient">Team</span>
          </h2>
        </div>

        <div className="scroll-reveal mb-10">
          <div className="relative overflow-hidden rounded-full border border-border/40 bg-surface-glass/70 py-3">
            <div className="marquee flex gap-4 text-primary/60 text-2xl font-heading uppercase tracking-[0.3em] opacity-70">
              <span>• • • • • • •</span>
              <span>• • • • • • •</span>
              <span>• • • • • • •</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 px-8">
            {visibleMembers.map((member, i) => (
              <div
                key={member.name}
                className={`glass-card p-8 text-center group hover:glow-border transition-all duration-500 ${
                  member.name === "Amrendra Tripathi" || member.name === "Pari Katariya"
                    ? "border-primary/55 shadow-[0_0_45px_-15px_rgba(59,130,246,0.45)]"
                    : ""
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="h-44 w-44 mx-auto mb-6 rounded-full overflow-hidden border border-white/10 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-xs mb-4">📞 {member.phone}</p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition z-10"
            aria-label="Show next team members"
          >
            <span className="text-3xl">›</span>
          </button>
        </div>

        <div className="scroll-reveal mt-10">
          <div className="relative overflow-hidden rounded-full border border-border/40 bg-surface-glass/70 py-3">
            <div className="marquee flex gap-4 text-primary/60 text-2xl font-heading uppercase tracking-[0.3em] opacity-70">
              <span>• • • • • • •</span>
              <span>• • • • • • •</span>
              <span>• • • • • • •</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
