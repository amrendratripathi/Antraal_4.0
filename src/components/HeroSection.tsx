import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import lloydLogo from "@/assets/lloyd_logo.webp";
import hexclanLogo from "@/assets/hexclan_logo.jpeg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div
          className={`flex items-center justify-center gap-6 mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* <img src={lloydLogo} alt="Lloyd Institute" className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-primary/30" />
          <img src={hexclanLogo} alt="Hex Clan" className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-primary/30" /> */}
        </div>

        <p
          className={`text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-4 transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Lloyd Institute of Engineering & Technology • Department of CSE
        </p>

        <h1
          className={`text-5xl md:text-7xl lg:text-9xl font-heading font-black mb-2 tracking-tight transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gradient">ANTRAAL</span>{" "}
          <span className="text-foreground">4.0</span>
        </h1>

        <h2
          className={`text-xl md:text-3xl font-heading text-gradient-gold mb-6 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          TECH FEST 2026
        </h2>

        <p
          className={`text-muted-foreground text-lg md:text-xl mb-8 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          11ᵗʰ — 13ᵗʰ April 2026 • Lloyd College Campus 2
        </p>

        <div
          className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading text-sm tracking-wider hover:shadow-[0_0_30px_-5px_hsl(217_91%_60%/0.5)] transition-all duration-300"
          >
            EXPLORE EVENTS
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-primary/30 text-primary px-8 py-3 rounded-lg font-heading text-sm tracking-wider hover:bg-primary/10 transition-all duration-300"
          >
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-muted-foreground text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
