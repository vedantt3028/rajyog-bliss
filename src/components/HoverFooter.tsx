"use client";

import React from "react";
import { Facebook, Globe, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

type LinkItem = { label: string; href: string; pulse?: boolean };
type LinkSection = { title: string; links: LinkItem[] };
type ContactItem = { icon: React.ReactNode; text: string; href?: string };
type SocialItem = { icon: React.ReactNode; label: string; href: string };

export function HoverFooter({
  brandTitle = "Rajyog",
  brandSubtitle = "Resort & Villa",
  description = "Peaceful hillside stays near Mapro Garden, Mahabaleshwar.",
  sections,
  contacts,
  socials,
  hoverText = "RAJYOG",
}: {
  brandTitle?: string;
  brandSubtitle?: string;
  description?: string;
  sections?: LinkSection[];
  contacts?: ContactItem[];
  socials?: SocialItem[];
  hoverText?: string;
}) {
  const defaultSections: LinkSection[] = [
    {
      title: "Explore",
      links: [
        { label: "About", href: "#about" },
        { label: "Rooms", href: "#rooms" },
        { label: "Amenities", href: "#amenities" },
        { label: "Gallery", href: "#gallery" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Support", href: "#" },
        { label: "Live Chat", href: "#", pulse: true },
      ],
    },
  ];

  const defaultContacts: ContactItem[] = [
    {
      icon: <Mail size={18} className="text-accent" />,
      text: "hello@rajyogresort.com",
      href: "mailto:hello@rajyogresort.com",
    },
    {
      icon: <Phone size={18} className="text-accent" />,
      text: "+91 70309 29651",
      href: "tel:+917030929651",
    },
    {
      icon: <MapPin size={18} className="text-accent" />,
      text: "Near Mapro Garden, Mahabaleshwar, MH",
      href: "#location",
    },
  ];

  const defaultSocials: SocialItem[] = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Globe size={20} />, label: "Website", href: "#top" },
  ];

  const footerLinks = sections ?? defaultSections;
  const contactInfo = contacts ?? defaultContacts;
  const socialLinks = socials ?? defaultSocials;

  return (
    <footer className="footer-cinematic text-primary-foreground relative overflow-hidden pt-16 pb-10">
      <div className="mx-6 lg:mx-10 rounded-3xl overflow-hidden border border-primary-foreground/10 bg-primary/10">
        <div className="max-w-7xl mx-auto p-10 md:p-14 z-40 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-accent text-3xl font-extrabold">◆</span>
                <div className="leading-tight">
                  <div className="text-white text-2xl md:text-3xl font-serif font-semibold">{brandTitle}</div>
                  <div className="text-white/70 text-xs uppercase tracking-[0.25em]">{brandSubtitle}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{description}</p>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-lg font-semibold mb-6">{section.title}</h4>
                <ul className="space-y-3 text-white/70">
                  {section.links.map((link) => (
                    <li key={link.label} className="relative">
                      <a href={link.href} className="hover:text-accent transition-colors">
                        {link.label}
                      </a>
                      {link.pulse && (
                        <span className="absolute top-1 right-[-10px] w-2 h-2 rounded-full bg-accent animate-pulse" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                {contactInfo.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-white/70">
                    {item.icon}
                    {item.href ? (
                      <a href={item.href} className="hover:text-accent transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span className="hover:text-accent transition-colors">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-t border-white/10 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-white/50">
              {socialLinks.map(({ icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="hover:text-accent transition-colors">
                  {icon}
                </a>
              ))}
            </div>

            <p className="text-center md:text-left text-white/50">
              © {new Date().getFullYear()} {brandTitle} {brandSubtitle}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
          <TextHoverEffect text={hoverText} className="z-50" />
        </div>

        <FooterBackgroundGradient />
      </div>
    </footer>
  );
}

