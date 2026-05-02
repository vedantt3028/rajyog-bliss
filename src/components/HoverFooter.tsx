"use client";

import React from "react";
import { Facebook, Instagram, Leaf, Mail, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type LinkItem = { label: string; href: string; pulse?: boolean };
type ContactItem = { icon: React.ReactNode; text: string; href?: string };
type SocialItem = { icon: React.ReactNode; label: string; href: string };

export function HoverFooter({
  brandTitle = "Rajyog",
  brandSubtitle = "Resort & Villa",
  description = "Peaceful hillside stays near Mapro Garden, Mahabaleshwar.",
  contacts,
  socials,
  navLinks,
  tagline = "Peace Begins Here 🌿",
  className,
}: {
  brandTitle?: string;
  brandSubtitle?: string;
  description?: string;
  contacts?: ContactItem[];
  socials?: SocialItem[];
  navLinks?: LinkItem[];
  tagline?: string;
  className?: string;
}) {
  const defaultContacts: ContactItem[] = [
    {
      icon: <Phone size={16} className="text-[#d9b35c]" />,
      text: "+91 70309 29651",
      href: "tel:+917030929651",
    },
    {
      icon: <Mail size={16} className="text-[#d9b35c]" />,
      text: "hello@rajyogresort.com",
      href: "mailto:hello@rajyogresort.com",
    },
  ];

  const defaultSocials: SocialItem[] = [
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com" },
    { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: "https://www.facebook.com" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", href: "https://wa.me/917030929651" },
  ];

  const contactInfo = contacts ?? defaultContacts;
  const socialLinks = socials ?? defaultSocials;
  const links =
    navLinks ??
    ([
      { label: "Home", href: "#top" },
      { label: "Rooms", href: "#rooms" },
      { label: "Amenities", href: "#amenities" },
      { label: "Gallery", href: "#gallery" },
      { label: "Location", href: "#location" },
    ] satisfies LinkItem[]);

  return (
    <footer
      className={cn(
        "relative overflow-hidden px-6 lg:px-10 pt-20 pb-10",
        className
      )}
      style={{
        background:
          "linear-gradient(rgba(8, 10, 12, 0.88), rgba(8, 10, 12, 0.94)), url('https://images.unsplash.com/photo-1681488649971-812cff0982fe?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* soft glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,179,92,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-56 left-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,92,0.08),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-56 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(217,179,92,0.10),transparent_60%)] blur-2xl" />
      </div>

      {/* watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 select-none text-center font-serif font-bold tracking-[0.18em] text-white/[0.06] z-0"
        aria-hidden="true"
        style={{ fontSize: "clamp(4.5rem, 18vw, 16rem)" }}
      >
        RAJYOG
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center text-[#f6f0e4]">
        {/* top icon */}
        <div className="reveal mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(217,179,92,0.12),0_16px_50px_rgba(0,0,0,0.35)]">
          <Leaf className="h-6 w-6 text-[#d9b35c] drop-shadow-[0_0_18px_rgba(217,179,92,0.35)]" />
        </div>

        {/* title + tagline */}
        <h3 className="reveal reveal-delay-1 font-serif text-4xl md:text-5xl text-[#f8f2e8] drop-shadow-[0_0_22px_rgba(217,179,92,0.12)]">
          {brandTitle} {brandSubtitle}
        </h3>
        <p className="reveal reveal-delay-2 mt-4 text-base md:text-lg text-[#f6f0e4]/75">
          {tagline}
        </p>
        <p className="reveal reveal-delay-3 mt-2 text-sm md:text-base text-[#f6f0e4]/55 max-w-2xl mx-auto">
          {description}
        </p>

        {/* nav links */}
        <nav className="reveal reveal-delay-4 mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-[0.95rem]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative text-[#f6f0e4]/70 transition-colors hover:text-[#d9b35c] focus:outline-none focus:ring-2 focus:ring-[#d9b35c]/30 rounded-sm px-1
                         after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full after:origin-center after:scale-x-0 after:bg-[#d9b35c] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* social icons */}
        <div className="reveal reveal-delay-5 mt-10 flex items-center justify-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f6f0e4]/70 transition-all duration-300
                         hover:border-[#d9b35c]/40 hover:text-[#d9b35c] hover:shadow-[0_0_0_1px_rgba(217,179,92,0.18),0_18px_60px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
            >
              <span className="transition-transform duration-300 group-hover:scale-110">{s.icon}</span>
            </a>
          ))}
        </div>

        {/* contact */}
        <div className="reveal mt-8 flex flex-col items-center justify-center gap-2 text-sm text-[#f6f0e4]/70 sm:flex-row sm:gap-3">
          <span className="inline-flex items-center gap-2">
            <Phone size={16} className="text-[#d9b35c]" />
            <a href="tel:+917030929651" className="hover:text-[#d9b35c] transition-colors">
              Phone: +91 70309 29651
            </a>
          </span>
        </div>

        {/* divider + copyright */}
        <div className="reveal mt-10">
          <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <p className="mt-6 text-xs tracking-[0.18em] uppercase text-[#f6f0e4]/45">
            © 2026 {brandTitle} {brandSubtitle}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

