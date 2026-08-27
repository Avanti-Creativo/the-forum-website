"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { PRICING_TIERS, FOUNDING_MEMBER, BOOK_TOUR_URL } from "@/lib/constants";
import { Check, Star, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function FoundingMemberBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="bg-gradient-to-r from-brand-bronze/10 via-brand-peach to-brand-bronze/10 rounded-2xl p-8 border-2 border-brand-bronze/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-bronze/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-brand-bronze" />
            <span className="text-sm font-medium text-brand-bronze">
              Limited Time
            </span>
          </div>

          <h3 className="font-heading text-2xl font-semibold text-brand-black mb-2">
            {FOUNDING_MEMBER.title}
          </h3>

          <p className="text-brand-slate mb-4">
            {FOUNDING_MEMBER.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 bg-brand-bronze text-white rounded-full px-4 py-2 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Current Status: {FOUNDING_MEMBER.status}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {FOUNDING_MEMBER.bonuses.map((bonus, index) => (
              <div key={index} className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-brand-bronze flex-shrink-0" />
                <span className="text-sm text-brand-black">{bonus}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="sm" asChild>
              <Link href="#blueprint">Get The Blueprint First</Link>
            </Button>

            <Button size="sm" variant="outline" asChild>
              <Link href="/contact">Claim Your Founding Spot</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PricingTiers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-black mb-4">
            Choose Your Creative Rhythm
          </h1>

          <p className="text-xl text-brand-slate">
            All memberships include studio access, professional equipment, and
            community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <Link
            href="#blueprint"
            className="text-brand-bronze hover:underline font-medium"
          >
            Not sure which package fits? Get The Free Content Blueprint first →
          </Link>
        </motion.div>

        {/* <FoundingMemberBanner /> */}

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
              }}
              className={cn(
  tier.name === "Hourly Rate" &&
    "lg:col-span-3"
)}
            >
              <Card
                className={cn(
                  "h-full relative overflow-hidden",
                  tier.popular &&
                    "border-brand-bronze shadow-lg scale-[1.02]"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-brand-bronze text-white text-center py-2 text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}

                <CardHeader
                  className={cn(tier.popular && "pt-14")}
                >
                  <div className="mb-4">
                    <h3 className="font-heading text-2xl font-semibold text-brand-black">
                      {tier.name}
                    </h3>

                    {tier.bestFor && (
                      <p className="text-sm text-brand-slate mt-1">
                        {tier.bestFor}
                      </p>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-brand-black">
                      {tier.price}
                    </span>

                    {tier.period && (
                      <span className="text-brand-slate">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  {tier.commitment && (
                    <p className="text-sm text-brand-slate mt-2">
                      {tier.commitment}
                    </p>
                  )}

                  {tier.savings && (
                    <p className="text-sm text-brand-bronze font-medium mt-1">
                      {tier.savings}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <Check className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />

                        <span className="text-sm text-brand-slate">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.additionalHours && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-brand-slate">
                        <strong className="text-brand-black">
                          Additional hours:
                        </strong>{" "}
                        {tier.additionalHours}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={tier.stripeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Now
                    </a>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={BOOK_TOUR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Studio Tour
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}