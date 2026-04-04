import { useScrollReveal } from "@/hooks/useScrollReveal";

const teamMembers = [
  { name: "Pari Katariya", role: "Lead Coordinator", phone: "7470574373" },
  { name: "Amrendra Tripathi", role: "Lead Coordinator", phone: "9693748320" },
  { name: "Prashant Mishra", role: "Prompt-A-Thon Lead", phone: "6306995599" },
  { name: "Akalp Mishra", role: "Prompt-A-Thon Coordinator", phone: "9354945823" },
  { name: "Moksh Bhardwaj", role: "Treasure Trail Lead", phone: "9599012714" },
  { name: "Anmol Raj", role: "Treasure Trail Coordinator", phone: "7783845818" },
  { name: "Kunal Bagga", role: "Battle Arena Lead", phone: "9012261370" },
  { name: "Vaibhav Tiwari", role: "Battle Arena Coordinator", phone: "8004596673" },
  { name: "Chiranjeev Mishra", role: "Clone Craft Lead", phone: "9311090999" },
  { name: "Shivani Sharma", role: "Clone Craft Coordinator", phone: "8920575147" },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const TeamSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="team" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="scroll-reveal text-center mb-16">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-3">THE PEOPLE BEHIND</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Our <span className="text-gradient">Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="scroll-reveal glass-card p-6 text-center group hover:glow-border transition-all duration-500 cursor-default"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-all duration-500">
                <span className="text-xl font-heading font-bold text-primary">{getInitials(member.name)}</span>
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary text-xs font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-xs">📞 {member.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
