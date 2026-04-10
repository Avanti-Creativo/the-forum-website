"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GreekKeyBorder } from "@/components/ui/MeanderPattern";
import { WHATS_INCLUDED } from "@/lib/constants";
import { Mic, Wand2, Calendar, Target, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

const iconMap = {
  Mic: Mic,
  Wand2: Wand2,
  Calendar: Calendar,
  Target: Target,
};

export function WhatsIncluded() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden">
      {/* Two-tone background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-brand-cream" />
        <div className="absolute top-0 left-0 w-full lg:w-1/3 h-full bg-brand-terracotta" />
      </div>

      {/* Greek Key Border - Top */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-brand-cream overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <GreekKeyBorder className="w-full h-full" id="whatsIncludedMeander" opacity={0.4} variant="dark" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative py-24 lg:py-32" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Header on terracotta */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 relative z-10"
          >
            <div className="lg:pr-8">
              <span className="inline-flex items-center gap-2 text-white/90 font-medium text-sm tracking-[0.2em] uppercase mb-6">
                <Sparkles className="w-4 h-4" />
                Membership Benefits
              </span>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1]">
                {WHATS_INCLUDED.title}
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {WHATS_INCLUDED.subtitle}
              </p>

              <p className="text-white/70 leading-relaxed mb-8 hidden lg:block">
                {WHATS_INCLUDED.intro}
              </p>

              <Button
                size="lg"
                asChild
                className="rounded-full bg-white text-brand-terracotta hover:bg-brand-cream border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="#blueprint">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <div className="lg:col-span-8">
            {/* Mobile intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/80 leading-relaxed mb-8 lg:hidden"
            >
              {WHATS_INCLUDED.intro}
            </motion.p>

            {/* Features Grid - 2x2 layout */}
            <div className="grid sm:grid-cols-2 gap-5">
              {WHATS_INCLUDED.features.map((feature, index) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-brand-terracotta/10 hover:border-brand-terracotta/30 h-full overflow-hidden">
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                      {/* Icon with decorative frame */}
                      <div className="relative mb-6">
                        {/* Frame around the icon - appears on hover */}
                        <div className="inline-block p-3 border-2 border-transparent group-hover:border-brand-terracotta/30 rounded-2xl transition-colors duration-300">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-terracotta to-brand-terracotta-dark flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                            {Icon && <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl font-semibold text-brand-black mb-3 group-hover:text-brand-terracotta transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-brand-slate leading-relaxed relative z-10">
                        {feature.description}
                      </p>

                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-terracotta/5 rounded-full transform translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Greek Key Border - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-brand-cream overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <GreekKeyBorder className="w-full h-full" id="whatsIncludedMeander" opacity={0.4} variant="dark" />
        </div>
      </div>
    </section>
  );
}
