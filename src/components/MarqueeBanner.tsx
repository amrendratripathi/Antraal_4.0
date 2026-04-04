const MarqueeBanner = () => {
  const items = ["TREASURE TRAIL", "PROMPT-A-THON", "BATTLE ARENA", "CLONE CRAFT"];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-6 border-y border-border/30 bg-secondary/30">
      <div className="marquee flex items-center gap-8 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-heading text-lg md:text-2xl font-bold text-foreground/20">{item}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
