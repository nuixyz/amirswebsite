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
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => setSubmitStatus("idle"), 5000); // Clear success message after 5s
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
      className="py-20 px-6"
      data-scroll-section
    >
      <div className="max-w-2xl mx-auto">
        {/* Card container */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Heading */}
          <h2
            className="font-display font-bold text-on-surface mb-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Write an Email
          </h2>

          {/* Description */}
          <p className="text-on-surface-variant text-base mb-8">
            For bookings, chaos, or just saying hi.
          </p>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold text-sm">
                ✓ Message sent! I'll get back to you soon.
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold text-sm">
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-surface-container border-none rounded-lg
                           text-on-surface placeholder:text-on-surface-variant
                           focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-surface-container border-none rounded-lg
                           text-on-surface placeholder:text-on-surface-variant
                           focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={6}
                className="w-full px-4 py-3 bg-surface-container border-none rounded-lg
                         text-on-surface placeholder:text-on-surface-variant
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all resize-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold text-sm tracking-label uppercase
                       px-8 py-4 rounded-lg hover:opacity-90 transition-opacity
                       shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Transmission"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
