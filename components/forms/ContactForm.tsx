"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/components/ui/Toaster";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    referral: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const interestOptions = [
    { value: "tour", label: "Studio Tour" },
    { value: "membership", label: "Membership Info" },
    { value: "question", label: "General Question" },
    { value: "custom", label: "Custom Package" },
  ];

  const referralOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "google", label: "Google" },
    { value: "referral", label: "Referral" },
    { value: "event", label: "Event" },
    { value: "other", label: "Other" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.interest) newErrors.interest = "Please select an option";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
        referral: "",
      });
      toast("Message sent! We'll get back to you within 24 hours.", "success");
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Phone (optional)"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Select
          label="I'm interested in:"
          options={interestOptions}
          placeholder="Select an option"
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          error={errors.interest}
          required
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us about your content goals..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        required
      />

      <Select
        label="How did you hear about us?"
        options={referralOptions}
        placeholder="Select an option"
        value={formData.referral}
        onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
