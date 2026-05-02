import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroScene } from "@/components/HeroScene";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { useReveal } from "@/hooks/useReveal";
import heroImg from "@/assets/resort-hero.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomBalcony from "@/assets/room-balcony.jpg";
import roomFamily from "@/assets/room-family.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryView from "@/assets/gallery-view.jpg";
import galleryDining from "@/assets/gallery-dining.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP =
  "https://wa.me/917030929651?text=Hello%20I%20want%20to%20book%20Rajyog%20Resort";
const PHONE = "tel:+917030929651";

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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span
            className={`font-serif text-xl md:text-2xl font-semibold tracking-tight ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            Rajyog
          </span>
          <span
            className={`text-xs uppercase tracking-[0.25em] ${
              scrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            Resort
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/80 hover:text-primary"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href={PHONE}
            className="bg-gradient-gold text-gold-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Call Now
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block text-foreground/80 hover:text-primary"
            >
              {n.label}
            </a>
          ))}
          <a href={PHONE} className="block bg-gradient-gold text-gold-foreground text-center px-5 py-3 rounded-full font-semibold">
            Call Now
          </a>
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
      <div className="absolute inset-0 bg-gradient-hero hero-depth-mist" />
      <div className="hero-depth-vignette absolute inset-0" style={midLayerStyle} />
      {/* 3D particles */}
      <HeroScene />

      <div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 min-h-screen flex flex-col items-center justify-center text-center text-white pt-24 pb-16"
        style={foregroundStyle}
      >
        <span className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-md text-xs tracking-[0.3em] uppercase text-white/90 mb-8">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Mahabaleshwar · India
        </span>
        <h1
          className="animate-fade-up font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-balance max-w-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          Welcome to Rajyog Resort
        </h1>
        <p
          className="animate-fade-up mt-7 text-2xl md:text-3xl text-white/90 max-w-2xl font-serif"
          style={{ animationDelay: "0.3s" }}
        >
          Peace Begins Here <span aria-hidden="true">🌿</span>
        </p>
        <ul
          className="animate-fade-up mt-7 hero-feature-list text-white/90 max-w-3xl"
          style={{ animationDelay: "0.38s" }}
        >
          {[
            "Just 3 Minutes from Mapro Garden",
            "Deluxe Rooms for a Comfortable Stay",
            "Refreshing Swimming Pool",
            "Scenic Hill & Nature Views",
            "Perfect for Couples, Families & Groups",
          ].map((item) => (
            <li key={item}>
              <span className="hero-feature-icon" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-gold text-gold-foreground px-8 py-4 rounded-full text-base font-semibold shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Book on WhatsApp
          </a>
          <a
            href={PHONE}
            className="px-8 py-4 rounded-full text-base font-semibold border border-white/40 text-white hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-md"
          >
            Call +91 70309 29651
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-[0.3em] uppercase float-y">
        Scroll
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
          Tucked beside the lush strawberry fields of Mapro Garden, Rajyog Resort is a place
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
            <div key={s.l} className="p-6 rounded-2xl bg-background shadow-soft">
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
  { name: "Standard Room", desc: "Cozy, comfortable and quiet — perfect for couples.", img: roomDeluxe },
  { name: "Deluxe Room", desc: "Premium interiors with garden-side calm.", img: roomDeluxe },
  { name: "Balcony Room", desc: "Wake up to misty hills from your private balcony.", img: roomBalcony },
  { name: "Family Room", desc: "Spacious stay for families up to 4 guests.", img: roomFamily },
  { name: "2 BHK Villa", desc: "Two bedrooms, living area — for small groups.", img: roomFamily },
  { name: "4 BHK Villa", desc: "Our largest villa — ideal for big celebrations.", img: roomFamily },
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
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent-foreground transition-colors"
                >
                  Enquire on WhatsApp
                  <span className="transition-transform group-hover:translate-x-1">→</span>
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
              className={`reveal reveal-delay-${(i % 5) + 1} group p-8 rounded-2xl bg-background border border-border text-center hover:shadow-elegant hover:-translate-y-1 transition-all duration-500`}
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

function Experience() {
  return (
    <section className="py-28 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal img-zoom rounded-3xl overflow-hidden shadow-elegant aspect-[4/5]">
          <img src={galleryView} alt="Mahabaleshwar valley view" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
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
          className="reveal reveal-delay-3 inline-block mt-10 bg-gradient-gold text-gold-foreground px-8 py-4 rounded-full font-semibold shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300"
        >
          Plan Your Group Stay
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
              <div key={f.t} className="p-5 rounded-xl border border-border bg-card">
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
              className={`reveal reveal-delay-${i + 1} p-7 rounded-2xl bg-background border border-border hover:border-accent/60 hover:shadow-soft transition-all`}
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

const GALLERY = [
  { src: gallery1, alt: "Resort exterior" },
  { src: galleryView, alt: "Valley view" },
  { src: roomBalcony, alt: "Balcony room" },
  { src: galleryDining, alt: "Outdoor dining" },
  { src: galleryFood, alt: "Indian thali" },
  { src: roomDeluxe, alt: "Deluxe room" },
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
              className={`reveal reveal-delay-${(i % 5) + 1} img-zoom relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-accent ${
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

const TESTIMONIALS = [
  { n: "Priya & Rahul", c: "Mumbai", q: "The mornings here are unreal. Birds, mist, chai — we never wanted to leave." },
  { n: "The Sharma Family", c: "Pune", q: "Hosted 30 of us for a reunion. Food, rooms, hospitality — everything was perfect." },
  { n: "Aarav K.", c: "Bengaluru", q: "Walked to Mapro every evening. The villa felt like our own home in the hills." },
];

function Testimonials() {
  return (
    <section className="py-28 px-6 lg:px-10 bg-secondary/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">Guest Stories</p>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-primary">What guests say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-7 perspective-stage">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.n}
              className={`reveal reveal-delay-${i + 1} depth-card p-8 rounded-2xl bg-background border border-border shadow-soft hover:shadow-elegant transition-all duration-500`}
            >
              <div className="text-accent text-2xl mb-3">★★★★★</div>
              <blockquote className="font-serif text-lg text-foreground/90 leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold text-primary">{t.n}</div>
                <div className="text-muted-foreground">{t.c}</div>
              </figcaption>
            </figure>
          ))}
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
            title="Rajyog Resort Location"
            src="https://www.google.com/maps?q=Mapro+Garden+Mahabaleshwar&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
      <img src={heroImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <h2 className="reveal font-serif text-4xl md:text-6xl text-balance leading-tight">
          Ready for your perfect getaway?
        </h2>
        <p className="reveal reveal-delay-1 mt-6 text-white/85 text-lg">
          Reserve your moment of calm in Mahabaleshwar.
        </p>
        <div className="reveal reveal-delay-2 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-gold text-gold-foreground px-8 py-4 rounded-full font-semibold shadow-elegant hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            Book on WhatsApp
          </a>
          <a
            href={PHONE}
            className="px-8 py-4 rounded-full font-semibold border border-white/40 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md"
          >
            Call +91 70309 29651
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-serif text-2xl">Rajyog Resort</div>
          <p className="mt-3 text-primary-foreground/70 text-sm leading-relaxed">
            A calm, cozy resort where Mahabaleshwar's forests meet warm Indian hospitality.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Near Mapro Garden, Mahabaleshwar, MH</li>
            <li><a href={PHONE} className="hover:text-accent">+91 70309 29651</a></li>
            <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp Booking</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Follow</div>
          <div className="flex gap-3">
            {["Instagram", "Facebook"].map((s) => (
              <a key={s} href="#" className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-primary-foreground/60 flex flex-col sm:flex-row gap-2 justify-between">
        <div>© {new Date().getFullYear()} Rajyog Resort. All rights reserved.</div>
        <div>Made with care in Mahabaleshwar</div>
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
    <main className="bg-background text-foreground">
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
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
