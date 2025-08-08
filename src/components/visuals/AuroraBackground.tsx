import * as React from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AuroraBackground: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${x}`);
      el.style.setProperty("--my", `${y}`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundImage: "var(--gradient-primary)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 300px at calc(var(--mx,0.5)*100%) calc(var(--my,0.1)*100%), hsl(188 95% 38% / 0.18), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
};

export default AuroraBackground;
