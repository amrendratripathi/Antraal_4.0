import { useState, useEffect } from "react";
import lloydLogo from "@/assets/lloyd_logo.webp";
import hexclanLogo from "@/assets/hexclan_logo.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((open) => !open);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
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
          <a
            href="https://drive.google.com/file/d/1-uahnoSdofBag9i0MAQE8Hj1NOyQa4nI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 uppercase text-sm tracking-widest font-medium"
          >
            Brochure
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://forms.gle/TiMCKYYY13Fm25Bz6"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex bg-primary/10 border border-primary/30 text-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all duration-300 animate-glow-pulse"
          >
            Register Now
          </a>
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="flex h-5 flex-col justify-between">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-3 w-full rounded-2xl border border-border/30 bg-surface-glass/90 p-4 backdrop-blur-xl">
          {["home", "about", "events", "team"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="w-full text-left text-muted-foreground hover:text-primary transition-colors duration-300 uppercase text-sm tracking-widest font-medium py-3"
            >
              {item}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1-uahnoSdofBag9i0MAQE8Hj1NOyQa4nI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-primary/20 transition"
          >
            Brochure
          </a>
          <a
            href="https://forms.gle/TiMCKYYY13Fm25Bz6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary/90 transition"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
