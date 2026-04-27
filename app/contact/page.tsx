"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { BOOK_TOUR_URL, CONTACT_INFO, CONTACT_OPTIONS } from "@/lib/constants";
import {
  CalendarDays,
  MessageCircle,
  Download,
  MapPin,
  Clock,
  Mail,
  Phone,
  Instagram,
} from "lucide-react";

const iconMap = {
  CalendarDays,
  MessageCircle,
  Download,
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-black mb-4">
            Let&apos;s Talk About Your Content
          </h1>
          <p className="text-xl text-brand-slate">
            Whether you&apos;re ready to book your first session or just have
            questions about how the studio works, we&apos;re here to help.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20"
        >
          {CONTACT_OPTIONS.map((option, index) => {
            const Icon = iconMap[option.icon as keyof typeof iconMap];
            return (
              <Card key={option.title} className="text-center card-lift">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-peach flex items-center justify-center mx-auto mb-6">
                    {Icon && <Icon className="w-8 h-8 text-brand-bronze" />}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-brand-black mb-2">
                    {option.title}
                  </h3>
                  <p className="text-brand-slate text-sm mb-6">
                    {option.description}
                  </p>
                  <Button
                    variant={index === 0 ? "default" : "outline"}
                    className="w-full"
                    asChild
                  >
                    {index === 0 ? (
                      <a
                        href={BOOK_TOUR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {option.cta}
                      </a>
                    ) : (
                      <Link href={index === 2 ? "#blueprint" : "#form"}>
                        {option.cta}
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            id="form"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-semibold text-brand-black mb-8">
              Send Us a Message
            </h2>
            <ContactForm />
          </motion.div>

          {/* Location & Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-3xl font-semibold text-brand-black mb-8">
              Studio Location & Hours
            </h2>

            <div className="space-y-8">
              {/* Map placeholder */}
              <div className="aspect-video bg-brand-peach/30 rounded-2xl flex items-center justify-center border border-brand-peach">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-brand-bronze mx-auto mb-2" />
                  <p className="text-brand-slate">
                    Interactive map coming soon
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-bronze" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-black mb-1">
                    Studio Location
                  </h3>
                  <p className="text-brand-slate">{CONTACT_INFO.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-bronze" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-black mb-1">
                    Recording Hours
                  </h3>
                  <div className="text-brand-slate space-y-1">
                    <p>{CONTACT_INFO.hours.weekday}</p>
                    <p>{CONTACT_INFO.hours.saturday}</p>
                    <p>{CONTACT_INFO.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-peach flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-bronze" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-black mb-1">
                    Contact Info
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="flex items-center gap-2 text-brand-slate hover:text-brand-bronze transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {CONTACT_INFO.email}
                    </a>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="flex items-center gap-2 text-brand-slate hover:text-brand-bronze transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {CONTACT_INFO.phone}
                    </a>
                    <a
                      href={`https://instagram.com/${CONTACT_INFO.instagram.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-brand-slate hover:text-brand-bronze transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      {CONTACT_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
