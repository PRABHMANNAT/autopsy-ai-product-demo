"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const DUR = 0.48;
export const STAGGER = 0.06;

/** Fade + 12px rise, 480ms. The only entrance in the system. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

export const Item = motion.div;

export function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Same entrance, but triggered on scroll rather than mount. */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  onScroll = false,
  step = STAGGER,
  delay = 0,
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  onScroll?: boolean;
  step?: number;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}) {
  const variants = {
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  if (onScroll) {
    return (
      <motion.div
        id={id}
        className={className}
        style={style}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate="show"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Count-up. Tabular numerals mean the width never jitters. */
export function Counter({
  value,
  format,
  duration = 1200,
}: {
  value: number;
  format: "int" | "money" | "decimal";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionFrame = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(reducedMotionFrame);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(value * (1 - Math.pow(1 - t, 4)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const text =
    format === "money"
      ? "$" + Math.round(n).toLocaleString("en-AU")
      : format === "decimal"
        ? n.toFixed(1)
        : Math.round(n).toLocaleString("en-AU");

  return <span ref={ref}>{text}</span>;
}

/** Amber connector that draws itself across the money flow on scroll. */
export function FlowLine() {
  return (
    <div className="pg-flow-track" aria-hidden>
      <motion.div
        className="pg-flow-fill"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
      />
    </div>
  );
}

/**
 * Brief number-roll when a money figure changes. Nudges the digits up and
 * fades, so a stepper change is visible on camera.
 */
export function Roll({ value }: { value: string }) {
  return (
    <motion.span
      key={value}
      className="pg-roll"
      initial={{ opacity: 0, y: -7 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
    >
      {value}
    </motion.span>
  );
}
