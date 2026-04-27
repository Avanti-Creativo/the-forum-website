"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { BOOK_TOUR_URL } from "@/lib/constants";
import { ArrowRight, Calendar } from "lucide-react";

export function PricingFinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-brand-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-bronze/20" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-semibold text-white mb-6"
          >
            Start With Strategy. Scale With Our Studio.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-brand-slate mb-10 leading-relaxed"
          >
            Not ready to commit? Download The Studio-Ready Content Blueprint, plan your content strategy, and see if this model fits your goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="xl" asChild>
              <Link href="#blueprint">
                Get The Free Content Blueprint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-brand-black"
              asChild
            >
              <a href={BOOK_TOUR_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Studio Tour
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
