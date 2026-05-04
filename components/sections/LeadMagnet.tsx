"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GreekKeyBorder } from "@/components/ui/MeanderPattern";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BLUEPRINT_URL, LEAD_MAGNET } from "@/lib/constants";
import { toast } from "@/components/ui/Toaster";
import { Check, FileText, Sparkles, Download, ArrowRight } from "lucide-react";

export function LeadMagnet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contentType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contentTypeOptions = [
    { value: "podcast", label: "Podcast" },
    { value: "social-media", label: "Social Media Content" },
    { value: "youtube", label: "YouTube Video" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.contentType) {
      newErrors.contentType = "Please select an option";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      const data = (await res.json()) as { blueprintUrl?: string };
      const blueprintUrl = data.blueprintUrl || BLUEPRINT_URL;

      window.open(blueprintUrl, "_blank", "noopener,noreferrer");

      setFormData({ fullName: "", email: "", contentType: "" });
      toast("Your blueprint is opening in a new tab!", "success");
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blueprint" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta via-brand-terracotta-dark to-brand-black" />

      {/* Greek Key Border - Top */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden z-10">
        <GreekKeyBorder className="w-full h-full" id="leadMagnetMeander" strokeColor="#FAF5EE" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-medium text-white tracking-wide uppercase">Free Download</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                {LEAD_MAGNET.title}
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {LEAD_MAGNET.description}
              </p>

              <div className="space-y-4 mb-10">
                <p className="font-medium text-white tracking-wide">What&apos;s Inside:</p>
                {LEAD_MAGNET.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-brand-terracotta" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* PDF Preview card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden lg:block"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <FileText className="w-8 h-8 text-brand-terracotta" />
                    </motion.div>
                    <div>
                      <p className="font-heading font-semibold text-white text-lg">Content Blueprint</p>
                      <p className="text-white/60 text-sm">PDF Guide • 15 pages</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Download className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-brand-gold text-xs font-medium">Instant Download</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-gold/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-brand-terracotta/20 rounded-full blur-2xl" />

                <div className="relative">
                  <h3 className="font-heading text-2xl font-semibold text-brand-black mb-2 text-center">
                    Get Your Free Blueprint
                  </h3>
                  <p className="text-brand-slate text-center mb-8">
                    Join 500+ creators who&apos;ve downloaded this guide
                  </p>

                  <div className="space-y-5">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={errors.fullName}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                      required
                    />

                    <Select
                      label="What type of content are you creating?"
                      options={contentTypeOptions}
                      placeholder="Select an option"
                      value={formData.contentType}
                      onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                      error={errors.contentType}
                      required
                    />

                    <Button type="submit" size="lg" className="w-full rounded-full shadow-lg" disabled={isLoading}>
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Me The Blueprint
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-brand-slate text-center pt-2">
                      {LEAD_MAGNET.disclaimer}
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Greek Key Border - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden z-10">
        <GreekKeyBorder className="w-full h-full" id="leadMagnetMeander" strokeColor="#FAF5EE" />
      </div>
    </section>
  );
}
