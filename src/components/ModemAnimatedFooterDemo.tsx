"use client";

import React from "react";
import { Footer } from "@/components/ui/modem-animated-footer";
import { Github, Linkedin, Mail, NotepadTextDashed, Twitter } from "lucide-react";

export function ModemAnimatedFooterDemo() {
  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Github className="w-6 h-6" />, href: "https://github.com", label: "GitHub" },
    { icon: <Mail className="w-6 h-6" />, href: "mailto:hello@rajyogresort.com", label: "Email" },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Rooms", href: "#rooms" },
    { label: "Amenities", href: "#amenities" },
    { label: "Location", href: "#location" },
  ];

  return (
    <Footer
      brandName="Rajyog"
      brandDescription="Peaceful hillside stays near Mapro Garden, Mahabaleshwar."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Rajyog Resort & Villa"
      creatorUrl="#top"
      brandIcon={<NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
    />
  );
}

