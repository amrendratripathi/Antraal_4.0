import { useState, useEffect } from "react";
import lloydLogo from "@/assets/lloyd_logo.webp";
import hexclanLogo from "@/assets/hexclan_logo.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={lloydLogo} alt="Lloyd Institute" className="h-10 w-10 rounded-full object-cover" />
          <img src={hexclanLogo} alt="Hex Clan" className="h-10 w-10 rounded-full object-cover" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["home", "about", "events", "team"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 uppercase text-sm tracking-widest font-medium"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("events")}
          className="bg-primary/10 border border-primary/30 text-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all duration-300 animate-glow-pulse"
        >
          Register Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
