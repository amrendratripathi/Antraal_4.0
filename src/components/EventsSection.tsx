import { useScrollReveal } from "@/hooks/useScrollReveal";
import treasureHunt from "@/assets/treasure_hunt.jpeg";
import prompathon from "@/assets/prompathon.jpeg";
import esports from "@/assets/esports.jpeg";
import clonecraft from "@/assets/clonecraft.jpeg";

const events = [
  {
    title: "Treasure Trail",
    tagline: "Solve. Hunt. Conquer.",
    description: "A fast-paced campus hunt where teams solve coding puzzles & crack clues to find the digital treasure!",
    image: treasureHunt,
    date: "April 11, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "Campus-wide",
    team: "4 Members",
    fee: "₹200/team",
    coordinators: ["Moksh Bhardwaj — 9599012714", "Anmol Raj — 7783845818"],
  },
  {
    title: "Prompt-A-Thon",
    tagline: "Think it. Prompt it. Build it.",
    description: "An AI-powered challenge where duos build innovative products using prompt creativity and engineering.",
    image: prompathon,
    date: "April 11, 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "Computer Lab",
    team: "2 Members",
    fee: "₹80/team",
    coordinators: ["Prashant Mishra — 6306995599", "Akalp Mishra — 9354945823"],
  },
  {
    title: "Battle Arena",
    tagline: "Game On. Dominate.",
    description: "A competitive e-sports arena where every move counts. BGMI & Free Fire — only the most strategic squad wins!",
    image: esports,
    date: "April 12, 2026",
    time: "9:00 AM – 3:00 PM",
    venue: "Computer Labs (2nd Floor)",
    team: "4 Members",
    fee: "₹200/team",
    coordinators: ["Kunal Bagga — 9012261370", "Vaibhav Tiwari — 8004596673"],
  },
  {
    title: "Clone Craft",
    tagline: "Recreate. Refine. Reimagine.",
    description: "A precision-based AI challenge to recreate given images with maximum accuracy and creative finesse.",
    image: clonecraft,
    date: "April 12, 2026",
    time: "3:00 PM – 5:00 PM",
    venue: "Computer Labs",
    team: "Individual",
    fee: "₹50",
    coordinators: ["Chiranjeev Mishra — 9311090999", "Shivani Sharma — 8920575147"],
  },
];

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className="scroll-reveal grid md:grid-cols-2 gap-8 items-center mb-20"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`${isReversed ? "md:order-2" : ""}`}>
        <div className="relative group overflow-hidden rounded-xl glow-border">
          <img
            src={event.image}
            alt={event.title}
            className="w-full aspect-[3/4] bg-background object-contain transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </div>

      <div className={`${isReversed ? "md:order-1" : ""} space-y-6`}>
        <p className="text-primary font-heading text-xs tracking-[0.3em]">{event.tagline}</p>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{event.title}</h3>
        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-full md:max-w-xl mx-auto md:mx-0">{event.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { icon: "📅", label: event.date },
            { icon: "⏰", label: event.time },
            { icon: "📍", label: event.venue },
            { icon: "👥", label: event.team },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="glass-card p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-primary font-heading text-sm">Registration Fee</span>
            <span className="text-foreground font-heading font-bold text-lg">{event.fee}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            {event.coordinators.map((c) => (
              <p key={c}>📞 {c}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="events" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="scroll-reveal text-center mb-20">
          <p className="text-primary font-heading text-sm tracking-[0.3em] mb-3">WHAT'S HAPPENING</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Our <span className="text-gradient">Events</span>
          </h2>
        </div>

        {events.map((event, i) => (
          <EventCard key={event.title} event={event} index={i} />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
