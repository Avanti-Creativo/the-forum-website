"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GreekKeyBorder } from "@/components/ui/MeanderPattern";
import { BLUEPRINT_URL, SITE_CONFIG, NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import * as React from "react";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setEmail("");
      toast("Thanks for joining the waitlist!", "success");
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-brand-cream relative overflow-hidden">
      {/* Greek Key Border - Top */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <GreekKeyBorder className="w-full h-full" id="footerMeander" variant="dark" opacity={0.15} />
      </div>

      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-terracotta/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & Tagline - Larger presence */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="dark" />
            <p className="text-brand-slate text-base leading-relaxed max-w-[280px]">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-11 h-11 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg font-semibold mb-5 text-brand-black">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-slate hover:text-brand-terracotta transition-colors text-sm tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={BLUEPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-slate hover:text-brand-terracotta transition-colors text-sm tracking-wide"
                >
                  Get The Blueprint
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-lg font-semibold mb-5 text-brand-black">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-brand-terracotta" />
                </div>
                <span className="text-brand-slate pt-1.5">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-brand-terracotta" />
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-brand-slate hover:text-brand-terracotta transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-brand-terracotta" />
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-brand-slate hover:text-brand-terracotta transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter - Elevated Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-terracotta/10">
              <h4 className="font-heading text-lg font-semibold mb-2 text-brand-black">
                Join the Waitlist
              </h4>
              <p className="text-brand-slate text-sm mb-4">
                Get tips and updates delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-brand-cream/50 border-brand-terracotta/20 text-brand-black placeholder:text-brand-slate/50 focus:border-brand-terracotta"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : (
                    <>
                      Subscribe
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-terracotta/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-brand-slate">
              © {new Date().getFullYear()} Creators LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-brand-slate hover:text-brand-terracotta transition-colors tracking-wide"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-brand-slate hover:text-brand-terracotta transition-colors tracking-wide"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
