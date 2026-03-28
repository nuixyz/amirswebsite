"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "28dff8e5-d6c2-40f6-bcc0-7604637e170c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name} via amirthetrash.com`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="mx-4 py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      data-scroll-section
    >
      <div className="max-w-2xl mx-auto">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 shadow-lg sm:shadow-xl">
          {/* Heading */}
          <h2
            className="font-display font-bold text-on-surface mb-2 sm:mb-3"
            style={{
              fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Send me a mail!
          </h2>

          {/* Description */}
          <p className="text-on-surface-variant text-sm sm:text-base mb-6 sm:mb-8">
            For bookings, chaos, or just saying hi.
          </p>

          {/* Success */}
          {submitStatus === "success" && (
            <div className="mb-5 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold text-xs sm:text-sm">
                ✓ Message sent! I'll get back to you soon.
              </p>
            </div>
          )}

          {/* Error */}
          {submitStatus === "error" && (
            <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold text-xs sm:text-sm">
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[10px] sm:text-xs tracking-label uppercase font-semibold text-on-surface mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container rounded-lg
                           text-on-surface placeholder:text-on-surface-variant
                           focus:outline-none focus:ring-2 focus:ring-primary/20
                           text-sm sm:text-base transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs tracking-label uppercase font-semibold text-on-surface mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container rounded-lg
                           text-on-surface placeholder:text-on-surface-variant
                           focus:outline-none focus:ring-2 focus:ring-primary/20
                           text-sm sm:text-base transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] sm:text-xs tracking-label uppercase font-semibold text-on-surface mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface-container rounded-lg
                         text-on-surface placeholder:text-on-surface-variant
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         text-sm sm:text-base transition-all resize-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold text-xs sm:text-sm tracking-label uppercase
                       px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:opacity-90 transition-opacity
                       shadow-md sm:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
