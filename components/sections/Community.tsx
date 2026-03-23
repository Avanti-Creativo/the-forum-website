"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GreekKeyBorder } from "@/components/ui/MeanderPattern";
import { COMMUNITY } from "@/lib/constants";
import { Users, Repeat, MessageSquare, Star, ArrowRight } from "lucide-react";

const iconList = [Users, Repeat, MessageSquare, Star];
const iconColors = [
  "from-brand-terracotta to-brand-terracotta-dark",
  "from-brand-gold to-brand-gold-light",
  "from-brand-terracotta-light to-brand-terracotta",
  "from-brand-gold-light to-brand-gold",
];

export function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream-dark/30 to-brand-cream" />

      {/* Greek Key Border - Top */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden z-10">
        <GreekKeyBorder className="w-full h-full" id="communityMeander" variant="dark" opacity={0.4} />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-terracotta/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-brand-gold/15 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-brand-terracotta/10 text-brand-terracotta font-medium text-sm tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-6">
            <Users className="w-4 h-4" />
            Community
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-black mb-6">
            {COMMUNITY.title}
          </h2>
          <p className="text-xl text-brand-slate leading-relaxed">{COMMUNITY.subtitle}</p>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-brand-slate text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {COMMUNITY.intro}
        </motion.p>

        {/* Benefits grid - modern card design */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {COMMUNITY.benefits.map((benefit, index) => {
            const Icon = iconList[index];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-brand-terracotta/10 hover:border-brand-terracotta/30 h-full overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative flex gap-5">
                    {/* Icon with gradient background */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconColors[index]} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-semibold text-brand-black mb-2 group-hover:text-brand-terracotta transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-brand-slate leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-terracotta/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" asChild className="rounded-full shadow-lg hover:shadow-xl">
            <Link href="#blueprint">
              Get The Free Content Blueprint
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Greek Key Border - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden z-10">
        <GreekKeyBorder className="w-full h-full" id="communityMeander" variant="dark" opacity={0.4} />
      </div>
    </section>
  );
}
