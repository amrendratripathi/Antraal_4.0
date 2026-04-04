const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h3 className="font-heading text-lg font-bold text-gradient">ANTRAAL 4.0</h3>
        <p className="text-muted-foreground text-sm">
          Lloyd Institute of Engineering & Technology • Department of Computer Science & Engineering
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.instagram.com/hexclan.liet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Instagram: @hexclan.liet
          </a>
          <a
            href="https://www.linkedin.com/company/hexclan-liet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            LinkedIn: Hexclan-LIET
          </a>
        </div>
        <p className="text-muted-foreground/50 text-xs">© 2026 Hex Clan — LIET. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
