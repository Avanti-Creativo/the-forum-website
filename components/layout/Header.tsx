"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { BLUEPRINT_URL, NAV_LINKS } from "@/lib/constants";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Only use light/white text on home page when not scrolled (over terracotta hero)
  const isHomePage = pathname === "/";
  const useLightNav = !isScrolled && isHomePage;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <Logo variant="dark" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors relative group",
                    useLightNav
                      ? "hover:text-white/80"
                      : "hover:text-brand-terracotta",
                    pathname === link.href
                      ? useLightNav
                        ? "text-white"
                        : "text-brand-terracotta"
                      : useLightNav
                        ? "text-white"
                        : "text-brand-black"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    useLightNav ? "bg-white" : "bg-brand-terracotta",
                    pathname === link.href && "w-full"
                  )} />
                </Link>
              ))}
              <Button
                size="sm"
                asChild
                className={cn(
                  "rounded-full shadow-md hover:shadow-lg",
                  useLightNav && "bg-white text-brand-terracotta hover:bg-white/90"
                )}
              >
                <a
                  href={BLUEPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get The Blueprint
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all",
                isMobileMenuOpen
                  ? "bg-brand-terracotta text-white"
                  : "bg-brand-terracotta/10 text-brand-black hover:bg-brand-terracotta/20"
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-cream pt-24 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 p-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xl font-heading font-medium transition-colors hover:text-brand-terracotta",
                      pathname === link.href
                        ? "text-brand-terracotta"
                        : "text-brand-black"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
              >
                <Button size="lg" className="mt-4 w-full max-w-xs rounded-full shadow-lg" asChild>
                  <a
                    href={BLUEPRINT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get The Blueprint
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
