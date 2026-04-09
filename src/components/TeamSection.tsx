import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const teamMembers = [
  {
    name: "Amrendra Tripathi",
    role: "Event Head",
    image: "/team/Amrendra.jpeg",
    linkedin: "https://www.linkedin.com/in/amrendra-tripathi-67b906279/",
  },
  {
    name: "Pari Katariya",
    role: "Event Head",
    phone: "7470574373",
    image: "/team/pari1.jpeg",
    linkedin: "https://www.linkedin.com/in/pari-katariya-aa75382aa/",
  },
  {
    name: "Tanu Singh",
    role: "Event Coordinator",
    phone: "8439836370",
    image: "/team/tanu.jpeg",
    linkedin: "https://www.linkedin.com/in/tanu-singh-a366a52b9/",
  },
  {
    name: "Prashant Mishra",
    role: "Event Coordinator",
    phone: "6306995599",
    image: "/team/prashant.jpeg",
    linkedin: "https://www.linkedin.com/in/prashantm9428/",
  },
  {
    name: "Akalp Mishra",
    role: "Event Coordinator",
    phone: "9354945823",
    image: "/team/akalp.jpeg",
    linkedin: "https://www.linkedin.com/in/akalp-mishra-1aa5b43b5/",
  },
  {
    name: "Kunal Bagga",
    role: "Event Coordinator",
    phone: "9012261370",
    image: "/team/kunal.jpeg",
    linkedin: "https://www.linkedin.com/in/kunal-bagga-ba6524328/",
  },
  {
    name: "Vaibhav Tiwari",
    role: "Event Coordinator",
    phone: "8004596673",
    image: "/team/vaibhav.jpeg",
    linkedin: "https://www.linkedin.com/in/vaibhav-tiwari-455340325/",
  },
  {
    name: "Chiranjeev Mishra",
    role: "Event Coordinator",
    phone: "9311090999",
    image: "/team/chiranjeev.jpeg",
    linkedin: "https://www.linkedin.com/in/chiranjeev-mishra-59812b315/",
  },
  {
    name: "Shivani Sharma",
    role: "Event Coordinator",
    phone: "8920575147",
    image: "/team/shivani.jpeg",
    linkedin: "https://www.linkedin.com/in/shivani-sharma-b8029a344/",
  },
  {
    name: "Taru Sharma",
    role: "Event Coordinator",
    phone: "7011047905",
    image: "/team/taru.jpeg",
    linkedin: "https://www.linkedin.com/in/taru-sharma-647823323/",
  },
  {
    name: "Rutika Sable",
    role: "Event Coordinator",
    phone: "8070475858",
    image: "/team/rutika.jpeg",
    linkedin: "https://www.linkedin.com/in/rutika-sable-321390321/",
  },
  {
    name: "Moksh Bhardwaj",
    role: "Event Coordinator",
    phone: "9599012714",
    image: "/team/moksh.jpeg",
    linkedin: "https://www.linkedin.com/in/moksh-bhardwaj-01aa4b395/",
  },
  {
    name: "Anmol   Raj",
    role: "Event Coordinator",
    phone: "7783845818",
    image: "/team/anmol.jpeg",
    linkedin: "https://www.linkedin.com/in/anmol-raj-25692b2a7/",
  },
  {
    name: "Vanshika Chauhan",
    role: "Event Coordinator",
    phone: "6397513064",
    image: "/team/vanshika.jpeg",
    linkedin: "https://www.linkedin.com/in/vanshika-chauhan-244429303/",
  },
  {
    name: "Shravan Poojary",
    role: "Event Coordinator",
    phone: "7303037469",
    image: "/team/shravan.jpeg",
    linkedin: "https://www.linkedin.com/in/shravan-poojary-294456244/",
  },
  {
    name: "Roshan Dubey",
    role: "Event Coordinator",
    phone: "9304122659",
    image: "/team/roshan.jpeg",
    linkedin: "https://www.linkedin.com/in/roshan-kumar-dubey-508975340/",
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

  const ribbonItems = Array.from({ length: 10 }, () => " TEAM ");
  const marqueeItems = [...ribbonItems, ...ribbonItems];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
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
            <div className="marquee flex items-center gap-10 whitespace-nowrap text-primary/60 text-2xl font-heading uppercase tracking-[0.3em] opacity-70">
              {marqueeItems.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto overflow-visible">
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 px-4 sm:px-8">
            {visibleMembers.map((member, i) => (
              <div
                key={member.name}
                className="glass-card p-8 text-center group hover:glow-border transition-all duration-500 border-primary/25 shadow-[0_0_45px_-15px_rgba(59,130,246,0.25)] flex flex-col justify-between h-full"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div>
                  <div className="h-44 w-44 mx-auto mb-6 rounded-full overflow-hidden border border-white/10 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary text-base font-bold mb-4">{member.role}</p>
                </div>
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Connect
                  </a>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="relative sm:hidden h-[30rem] max-w-md mx-auto overflow-hidden rounded-[2rem]">
            <div className="absolute inset-x-0 top-8 flex justify-center gap-3 pointer-events-none">
              {visibleMembers.slice(1, 4).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-12 w-20 rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-sm ${
                    idx === 0 ? "opacity-80 -translate-y-0" : idx === 1 ? "opacity-70 -translate-y-1" : "opacity-60 -translate-y-2"
                  } transition-all duration-500`}
                />
              ))}
            </div>

            {visibleMembers.map((member, i) => {
              const offsets = [0, 5, 10, 15];
              const opacity = [1, 0.92, 0.82, 0.72];
              const scale = [1, 0.97, 0.94, 0.9];
              return (
                <div
                  key={member.name}
                  className="glass-card absolute inset-x-0 mx-auto w-[92%] p-8 text-center transition-all duration-700 ease-out shadow-[0_0_45px_-15px_rgba(59,130,246,0.25)] flex flex-col justify-between h-full"
                  style={{
                    top: `${offsets[i]}%`,
                    zIndex: 40 - i * 10,
                    opacity: opacity[i],
                    transform: `scale(${scale[i]})`,
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <div>
                    <div className="h-52 w-52 mx-auto mb-6 rounded-full overflow-hidden border border-white/10 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-3">{member.name}</h3>
                    <p className="text-primary text-lg font-semibold mb-6">{member.role}</p>
                  </div>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      Connect
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      Connect
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {startIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="hidden sm:inline-flex absolute left-4 md:left-6 xl:left-[-2.5rem] top-1/2 -translate-y-1/2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition z-10"
              aria-label="Show previous team members"
            >
              <span className="text-3xl">‹</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="hidden sm:inline-flex absolute right-4 md:right-6 xl:right-[-2.5rem] top-1/2 -translate-y-1/2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition z-10"
            aria-label="Show next team members"
          >
            <span className="text-3xl">›</span>
          </button>

          <div className="mt-6 flex justify-center sm:hidden gap-4">
            {startIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition"
              >
                Prev
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition"
            >
              Next
            </button>
          </div>
        </div>

        <div className="scroll-reveal mt-10">
          <div className="relative overflow-hidden rounded-full border border-border/40 bg-surface-glass/70 py-3">
            <div className="marquee flex items-center gap-10 whitespace-nowrap text-primary/60 text-2xl font-heading uppercase tracking-[0.3em] opacity-70">
              {marqueeItems.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
