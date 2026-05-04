import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { HoverFooter } from "@/components/HoverFooter";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useReveal } from "@/hooks/useReveal";
import heroImg from "@/assets/resort-hero.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryThali from "@/assets/gallery-thali.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP =
  "https://wa.me/917030929651?text=Hello%20I%20want%20to%20book%20Rajyog%20Resort%20and%20Villa";
const PHONE = "tel:+917030929651";
const INSTAGRAM_URL =
  "https://www.instagram.com/rajyog.resort?igsh=ZXEwNmtmbWpsbTU%3D&utm_source=qr";

/** Resolved from https://maps.app.goo.gl/FRvLeAjjV1ESh6rj6 — Rajyog Resort and Villa pin */
const MAP_GOOGLE_LINK = "https://maps.app.goo.gl/FRvLeAjjV1ESh6rj6";
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=17.9263689%2C73.7354016&z=17&output=embed";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const updateScrollState = useCallback(() => {
    setScrolled(window.scrollY > 30);
    const headerOffset = 96;
    const y = window.scrollY + headerOffset;
    let current: string | null = null;
    for (const n of NAV) {
      const id = n.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= y) current = n.href;
    }
    setActiveHref(current);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/70 shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          className={`flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            scrolled
              ? "focus-visible:ring-primary focus-visible:ring-offset-background"
              : "focus-visible:ring-white focus-visible:ring-offset-transparent"
          }`}
        >
          <span
            className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            Rajyog
          </span>
          <span
            className={`text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
              scrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            Resort & Villa
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {NAV.map((n) => {
            const active = activeHref === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative text-sm font-medium transition-colors duration-300 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 ${
                  scrolled
                    ? active
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary"
                    : active
                      ? "text-white"
                      : "text-white/85 hover:text-white"
                } ${scrolled ? "focus-visible:ring-offset-background" : "focus-visible:ring-white focus-visible:ring-offset-transparent"}`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  } ${scrolled ? "bg-primary" : "bg-white"}`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
          <a href={PHONE} className="boton-elegante boton-elegante--sm shrink-0">
            <span className="boton-elegante__label">Call Now</span>
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            scrolled ? "text-foreground focus-visible:ring-offset-background" : "text-white focus-visible:ring-white focus-visible:ring-offset-transparent"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-elegant px-3 py-3 space-y-0.5">
            {NAV.map((n) => {
              const active = activeHref === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                    active ? "bg-secondary text-primary" : "text-foreground/80 hover:bg-secondary/80 hover:text-primary"
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
            <a
              href={PHONE}
              className="boton-elegante boton-elegante--sm mt-3 w-full justify-center text-center"
              onClick={() => setOpen(false)}
            >
              <span className="boton-elegante__label">Call Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { reduced } = useMotionPreference();
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const ratio = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
        setScrollDepth(ratio);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const foregroundStyle = useMemo(
    () =>
      reduced
        ? undefined
        : {
            transform: `translate3d(0, ${scrollDepth * -16}px, 0) scale(${1 + scrollDepth * 0.03})`,
          },
    [reduced, scrollDepth]
  );

  const midLayerStyle = useMemo(
    () =>
      reduced
        ? undefined
        : {
            transform: `translate3d(0, ${scrollDepth * 22}px, 0)`,
          },
    [reduced, scrollDepth]
  );

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Photo backdrop */}
      <img
        src={heroImg}
        alt="Misty mountains of Mahabaleshwar at dawn"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero hero-depth-mist hero-mist-breathe" />
      <div className="hero-depth-vignette absolute inset-0" style={midLayerStyle} />
      {/* 3D particles */}
      <HeroScene />

      <div
        className="hero-content-shell relative z-10 max-w-6xl mx-auto px-6 lg:px-10 min-h-screen flex flex-col items-center justify-center text-center text-white pt-24 pb-20"
        style={foregroundStyle}
      >
        <span className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/70 bg-black/20 backdrop-blur-md text-xs tracking-[0.3em] uppercase text-accent mb-8">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" /> MAHABALESHWAR - INDIA
        </span>
        <h1
          className="animate-fade-up hero-title font-serif leading-[1.02] text-balance max-w-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block hero-title-welcome">Welcome to</span>
          <span className="block mt-1 hero-title-main">RAJYOG</span>
          <span className="block mt-5 md:mt-6 hero-title-sub">
            RESORT & VILLA
          </span>
        </h1>
        <p
          className="animate-fade-up mt-5 hero-tagline text-white/90 max-w-2xl font-serif"
          style={{ animationDelay: "0.3s" }}
        >
          <span aria-hidden="true">✦</span> Peace Begins Here <span aria-hidden="true">🌿</span>
          <span aria-hidden="true">✦</span>
        </p>
        <ul className="mt-8 hero-feature-list text-white/90 max-w-3xl">
          {[
            "Just 3 Minutes from Mapro Garden",
            "Deluxe Rooms for a Comfortable Stay",
            "Refreshing Swimming Pool",
            "Scenic Hill & Nature Views",
            "Perfect for Couples, Families & Groups",
          ].map((item, i) => (
            <li
              key={item}
              className="animate-fade-up"
              style={{ animationDelay: `${0.38 + i * 0.08}s` }}
            >
              <span className="hero-feature-icon" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div
          className="animate-fade-up mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="boton-elegante w-full sm:w-auto"
          >
            <span className="boton-elegante__label">
              <span aria-hidden="true">💬</span>
              Book on WhatsApp
            </span>
          </a>
          <a href={PHONE} className="boton-elegante boton-elegante--outline-light w-full sm:w-auto">
            <span className="boton-elegante__label">
              <span aria-hidden="true">☎</span>
              Call +91 70309 29651
            </span>
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-[0.3em] uppercase float-y">
        SCROLL ↓
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-10 bg-secondary/60">
      <div className="max-w-5xl mx-auto text-center">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-5">
          About the Resort
        </p>
        <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 text-balance">
          A quiet retreat in the heart of Mahabaleshwar
        </h2>
        <p className="reveal reveal-delay-2 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
          Tucked beside the lush strawberry fields of Mapro Garden, Rajyog Resort & Villa is a place
          to breathe deeper. Whether you're here for a romantic escape, a family reunion, or a
          spiritual pause, our rooms, food and views were made for slow, soulful days.
        </p>
        <div className="reveal reveal-delay-3 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "6+", l: "Room Types" },
            { n: "50", l: "Group Capacity" },
            { n: "24/7", l: "Hospitality" },
            { n: "5★", l: "Guest Love" },
          ].map((s) => (
            <div
              key={s.l}
              className="interactive-lift p-6 rounded-2xl border border-transparent bg-background shadow-soft hover:border-accent/25"
            >
              <div className="font-serif text-3xl md:text-4xl text-primary">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ROOMS = [
  {
    name: "Standard Room",
    desc: "Cozy, comfortable and quiet — perfect for couples.",
    img: "https://i.postimg.cc/jSXx656g/11.webp",
  },
  {
    name: "Deluxe Room",
    desc: "Premium interiors with garden-side calm.",
    img: "https://i.postimg.cc/HstDRNJJ/2.webp",
  },
  {
    name: "Balcony Room",
    desc: "Wake up to misty hills from your private balcony.",
    img: "https://i.postimg.cc/yx4CC4Xz/6.webp",
  },
  {
    name: "Family Room",
    desc: "Spacious stay for families up to 4 guests.",
    img: "https://i.postimg.cc/pLqvhSx8/9.webp",
  },
  {
    name: "2 BHK Villa",
    desc: "Two bedrooms, living area — for small groups.",
    img: "https://i.postimg.cc/3J00ZgWj/8.webp",
  },
  {
    name: "4 BHK Villa",
    desc: "Our largest villa — ideal for big celebrations.",
    img: "https://i.postimg.cc/pXpyHQ6R/Whats-App-Image-2026-05-03-at-10-55-19-PM.jpg",
  },
];

function Rooms() {
  const { reduced } = useMotionPreference();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const host = sectionRef.current;
    if (!host) return;
    const cards = Array.from(host.querySelectorAll<HTMLElement>("[data-tilt-card]"));
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handlers = cards.map((card) => {
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${-y * 7}deg`);
        card.style.setProperty("--tilt-y", `${x * 9}deg`);
      };
      const onLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return { card, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [reduced]);

  return (
    <section id="rooms" className="py-28 px-6 lg:px-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Stays</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary text-balance">
            Rooms & Villas
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-muted-foreground max-w-2xl mx-auto">
            From intimate rooms to spacious villas — choose the stay that suits your moment.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ROOMS.map((r, i) => (
            <article
              key={r.name}
              data-tilt-card
              className={`reveal reveal-delay-${(i % 5) + 1} tilt-card group rounded-3xl overflow-hidden bg-card shadow-soft hover:shadow-elegant border border-border`}
            >
              <div className="img-zoom aspect-[4/3]">
                <img src={r.img} alt={r.name} loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-primary">{r.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="group boton-elegante boton-elegante--sm mt-5 w-full sm:w-auto"
                >
                  <span className="boton-elegante__label">
                    Enquire on WhatsApp
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const AMENITIES = [
  { i: "🌿", t: "Lush Gardens" },
  { i: "🍽️", t: "In-house Dining" },
  { i: "🚗", t: "Parking" },
  { i: "📶", t: "Free Wi-Fi" },
  { i: "🔥", t: "Bonfire Nights" },
  { i: "🛎️", t: "24/7 Service" },
  { i: "🐾", t: "Pet Friendly" },
  { i: "🎉", t: "Group Events" },
];

function Amenities() {
  return (
    <section id="amenities" className="py-28 px-6 lg:px-10 bg-secondary/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Comforts</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">Amenities</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {AMENITIES.map((a, i) => (
            <div
              key={a.t}
              className={`reveal reveal-delay-${(i % 5) + 1} interactive-lift group p-8 rounded-2xl bg-background border border-border text-center hover:border-accent/35`}
            >
              <div className="text-4xl mb-3 transition-transform duration-500 group-hover:scale-110">{a.i}</div>
              <div className="font-medium text-foreground/80">{a.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXPERIENCE_SLIDES = [
  {
    src: "https://i.postimg.cc/rsrW4ndV/pexels-suhail-shabir-32568781-35976594.jpg",
    alt: "Misty hills and layered valleys near Mahabaleshwar",
  },
  {
    src: "https://i.postimg.cc/dtGrtfP5/pexels-rohit-sharma-1230131-19673565.jpg",
    alt: "Green Western Ghats landscape above the clouds",
  },
  {
    src: "https://i.postimg.cc/CxYDZ4w1/milin-john-YPdcs99p3MY-unsplash.jpg",
    alt: "Forest and open views in the Panchgani–Mahabaleshwar hills",
  },
  {
    src: "https://i.postimg.cc/N0jHDf9w/rubankarthik-umapathy-k-EIm2J4Qmuk-unsplash.jpg",
    alt: "Sunlit ridge lines and rolling hill country",
  },
  {
    src: "https://i.postimg.cc/v8V63KB1/raj-vachhani-lz-F3f-MPCh7g-unsplash.jpg",
    alt: "Table land style plateau and wide valley vista",
  },
  {
    src: "https://i.postimg.cc/28dLfBhx/anwesha-patra-Tt-POAGEF8M0-unsplash.jpg",
    alt: "Quiet hill roads and lush greenery near the plateau",
  },
  {
    src: "https://i.postimg.cc/Sxy2QNGW/Chat-GPT-Image-May-3-2026-12-53-30-PM.png",
    alt: "Scenic hill-station atmosphere at dusk",
  },
  {
    src: "https://i.postimg.cc/WzTjmtzn/sandesh-ghadge-i1o-R4709JTw-unsplash.jpg",
    alt: "Mahabaleshwar viewpoints and misty horizon",
  },
  {
    src: "https://i.postimg.cc/90m5RSgt/pexels-raj-manohar-253004-12874870.jpg",
    alt: "Strawberry country and calm hill mornings",
  },
] as const;

function Experience() {
  const { reduced } = useMotionPreference();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || EXPERIENCE_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % EXPERIENCE_SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const go = (dir: 1 | -1) => {
    setSlide((i) => (i + dir + EXPERIENCE_SLIDES.length) % EXPERIENCE_SLIDES.length);
  };

  return (
    <section className="py-28 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div
          className="reveal relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] bg-muted"
          role="region"
          aria-roledescription="carousel"
          aria-label="Panchgani and Mahabaleshwar scenery"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {EXPERIENCE_SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1024}
              height={1280}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[900ms] ease-out pointer-events-none ${
                i === slide ? "opacity-100 z-[1]" : "opacity-0 z-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent px-3 pb-3 pt-12">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              ‹
            </button>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-1.5 px-1">
              {EXPERIENCE_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${EXPERIENCE_SLIDES.length}`}
                  aria-current={i === slide}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                    i === slide ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              ›
            </button>
          </div>
        </div>
        <div>
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">The Experience</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
            Slow mornings. Misty hills. Quiet joy.
          </h2>
          <p className="reveal reveal-delay-2 mt-6 text-muted-foreground text-lg leading-relaxed">
            Step out to chai under the trees. Walk to Mapro Garden in minutes. Watch the valley
            disappear into clouds. At Rajyog, every hour invites you to do less and feel more.
          </p>
          <ul className="reveal reveal-delay-3 mt-8 space-y-3 text-foreground/80">
            {[
              "Walking distance to Mapro Garden & strawberry farms",
              "Forest walks and panoramic viewpoints",
              "Bonfire evenings under starlit skies",
              "Calm, family-run hospitality",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-accent mb-4">Group Stays</p>
        <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl mb-6 text-balance">
          Celebrate together — up to 50 guests
        </h2>
        <p className="reveal reveal-delay-2 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Birthdays, reunions, corporate offsites, small weddings — Rajyog hosts groups of every kind
          with custom meals, bonfires, and cozy stays.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="reveal reveal-delay-3 boton-elegante mt-10 inline-flex"
        >
          <span className="boton-elegante__label">Plan Your Group Stay</span>
        </a>
      </div>
    </section>
  );
}

function Food() {
  return (
    <section className="py-28 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Dining</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary text-balance leading-tight">
            Home-style food, cooked with love
          </h2>
          <p className="reveal reveal-delay-2 mt-6 text-muted-foreground text-lg leading-relaxed">
            Our kitchen serves both vegetarian and non-vegetarian meals — pay only for what you order.
            Want to bring your own treats? Outside food is welcome too.
          </p>
          <div className="reveal reveal-delay-3 mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { t: "Veg & Non-Veg", d: "A-la-carte menu" },
              { t: "Pay Per Order", d: "No buffet pressure" },
              { t: "Outside Food", d: "Allowed freely" },
              { t: "Custom Meals", d: "For groups" },
            ].map((f) => (
              <div
                key={f.t}
                className="interactive-lift p-5 rounded-xl border border-border bg-card hover:border-accent/45"
              >
                <div className="font-serif text-lg text-primary">{f.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal img-zoom rounded-3xl overflow-hidden shadow-elegant aspect-square">
          <img src={galleryFood} alt="Indian thali at the resort" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Policies() {
  const items = [
    { t: "Extra Guests", d: "Welcome — small charges may apply." },
    { t: "Pets Allowed", d: "Furry family members are welcome." },
    { t: "Advance Payment", d: "Required to confirm your booking." },
    { t: "No Cancellation", d: "Bookings are non-refundable." },
  ];
  return (
    <section className="py-28 px-6 lg:px-10 bg-secondary/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Good to Know</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">Stay Policies</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <div
              key={p.t}
              className={`reveal reveal-delay-${i + 1} interactive-lift p-7 rounded-2xl bg-background border border-border hover:border-accent/60`}
            >
              <div className="font-serif text-xl text-primary">{p.t}</div>
              <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GALLERY_IMAGES = [
  "https://i.postimg.cc/nhkFKzKX/13.webp",
  "https://i.postimg.cc/jSXx656g/11.webp",
  "https://i.postimg.cc/YqBMJgbF/10.webp",
  "https://i.postimg.cc/pLqvhSx8/9.webp",
  "https://i.postimg.cc/XvP0xyr9/7.webp",
  "https://i.postimg.cc/yx4CC4Xz/6.webp",
  "https://i.postimg.cc/y6czXxsR/3.webp",
  "https://i.postimg.cc/HstDRNJJ/2.webp",
  "https://i.postimg.cc/Jz4VLQJ6/1.webp",
] as const;

const GALLERY = [
  ...GALLERY_IMAGES.map((src, i) => ({
    src,
    alt: `Rajyog Resort & Villa — gallery photo ${i + 1}`,
  })),
  {
    src: galleryThali,
    alt: "Indian thali — home-style dining at Rajyog Resort & Villa",
  },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const openAt = (idx: number) => {
    setDir(active !== null && idx < active ? -1 : 1);
    setActive(idx);
  };
  const showNext = useCallback(() => {
    setDir(1);
    setActive((v) => (v === null ? 0 : (v + 1) % GALLERY.length));
  }, []);

  const showPrev = useCallback(() => {
    setDir(-1);
    setActive((v) => (v === null ? 0 : (v - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showNext, showPrev]);
  return (
    <section id="gallery" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Glimpses</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => openAt(i)}
              className={`reveal reveal-delay-${(i % 5) + 1} gallery-tile img-zoom relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-accent ${
                i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""
              }`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white text-4xl px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>
          <img
            key={`${active}-${dir}`}
            src={GALLERY[active].src}
            alt={GALLERY[active].alt}
            className={`max-h-[90vh] max-w-[95vw] rounded-2xl shadow-elegant gallery-depth-enter ${
              dir === 1 ? "gallery-depth-next" : "gallery-depth-prev"
            }`}
          />
          <button
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white text-4xl px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

const TESTIMONIALS: { n: string; c: string; q: string; rating?: number }[] = [
  {
    n: "Vedant Shinde",
    c: "Google",
    q: "I stayed at Rajyog Resort with my colleagues, and we loved it! The rooms were spacious, super clean, and so comfortable. The staff was friendly and helpful, and the service was great. It's right behind Mapro Garden, which was super convenient. Overall, a relaxing and fun stay. Highly recommend it!",
    rating: 5,
  },
  {
    n: "piyushkumarg2017",
    c: "Tripadvisor",
    q: "Excellent property with all the required facilities. Rooms are comfortable with king-size beds. Twenty-four-hour hot water, swimming pool, lawn, restaurant — everything is there for a satisfying stay.",
    rating: 5,
  },
  {
    n: "Ganesh Pawane",
    c: "Google",
    q: "Very grateful — very nice location. Right behind Mapro Garden. Good hospitality and rooms.",
    rating: 5,
  },
  {
    n: "Amol Kalbhor",
    c: "Google",
    q: "Safe parking, nice rooms, swimming pool, and delicious food.",
    rating: 5,
  },
  {
    n: "Shrikant Khanvilkar",
    c: "Google",
    q: "Great experience — had fun, nice location, and the swimming pool water is clean too.",
    rating: 4,
  },
];

function Testimonials() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-secondary/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Guest Stories</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">What guests say</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 perspective-stage">
          {TESTIMONIALS.map((t, i) => {
            const r = Math.min(5, Math.max(1, t.rating ?? 5));
            return (
              <figure
                key={`${t.n}-${i}`}
                className={`reveal reveal-delay-${(i % 5) + 1} depth-card p-8 rounded-2xl bg-background border border-border shadow-soft hover:shadow-elegant transition-all duration-500`}
              >
                <div
                  className="mb-3 text-2xl tracking-tight"
                  aria-label={`${r} out of 5 stars`}
                >
                  <span className="text-accent">{"★".repeat(r)}</span>
                  <span className="text-accent/30">{"★".repeat(5 - r)}</span>
                </div>
                <blockquote className="font-serif text-lg text-foreground/90 leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-semibold text-primary">{t.n}</div>
                  <div className="text-muted-foreground">{t.c}</div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Find Us</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">Near Mapro Garden, Mahabaleshwar</h2>
        </div>
        <div className="reveal rounded-3xl overflow-hidden shadow-elegant border border-border aspect-[16/9]">
          <iframe
            title="Rajyog Resort & Villa Location"
            src={MAP_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
        <p className="reveal mt-4 text-center text-sm text-muted-foreground">
          <a
            href={MAP_GOOGLE_LINK}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Open in Google Maps
          </a>
        </p>
        <p className="reveal mt-2 text-center text-sm text-muted-foreground">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
          >
            <Instagram size={16} aria-hidden="true" />
            Follow us on Instagram
          </a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const footerNav = NAV;
  return (
    <footer className="footer-cinematic text-primary-foreground px-6 lg:px-10 pt-20 pb-7">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto mb-6 w-10 h-10 rounded-full border border-accent/60 flex items-center justify-center text-accent">
          <span className="text-lg leading-none">◆</span>
        </div>
        <h3 className="font-serif text-4xl md:text-5xl text-primary-foreground">
          Rajyog Resort & Villa
        </h3>
        <p className="mt-3 text-primary-foreground/70 text-sm md:text-base max-w-2xl mx-auto">
          Peaceful hillside stays near Mapro Garden, Mahabaleshwar.
        </p>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-primary-foreground/80">
          {footerNav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-accent transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Booking"
            className="w-11 h-11 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-accent/70 flex items-center justify-center text-sm transition"
          >
            WA
          </a>
          <a
            href={PHONE}
            aria-label="Call Rajyog Resort & Villa"
            className="w-11 h-11 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-accent/70 flex items-center justify-center text-sm transition"
          >
            ☎
          </a>
          <a
            href="#gallery"
            aria-label="View gallery"
            className="w-11 h-11 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-accent/70 flex items-center justify-center text-sm transition"
          >
            ◉
          </a>
        </div>

        <div className="mt-8 text-sm text-primary-foreground/70 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>Phone: +91 70309 29651</span>
          <span className="hidden sm:inline">•</span>
          <span>Near Mapro Garden, Mahabaleshwar, MH</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-5 border-t border-primary-foreground/10 text-xs text-primary-foreground/60 flex flex-col sm:flex-row gap-2 justify-between">
        <div>© {new Date().getFullYear()} Rajyog Resort & Villa. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-accent transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant pulse-ring hover:scale-110 transition-transform"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.67a11.84 11.84 0 0 0 5.65 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.44ZM12.06 21.5h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.8.99 1.02-3.7-.23-.38a9.6 9.6 0 0 1-1.47-5.07c0-5.31 4.32-9.63 9.65-9.63 2.58 0 5 1 6.83 2.83a9.59 9.59 0 0 1 2.82 6.81c0 5.31-4.32 9.7-9.56 9.7Zm5.27-7.2c-.29-.14-1.7-.84-1.97-.94-.27-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.43-1.71-1.6-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.14-.65-1.56-.89-2.13-.23-.56-.47-.49-.65-.5-.17-.01-.36-.01-.55-.01-.2 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.14.2 2.07 3.16 5.02 4.43.7.3 1.25.49 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.55-.34Z"/>
      </svg>
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-elegant focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        Skip to main content
      </a>
      <main id="main-content" className="bg-background text-foreground" tabIndex={-1}>
        <Header />
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Experience />
        <Events />
        <Food />
        <Policies />
        <Gallery />
        <Testimonials />
        <Location />
        <HoverFooter />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
