"use client";

const partners = ["Partner A", "Partner B", "Partner C"];

export default function PartnersSection() {
  return (
    <section
      className="mx-12 py-20 px-6 bg-surface rounded-4xl"
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-label uppercase text-on-surface-variant text-center mb-12">
          Partners & Associates
        </p>

        {/* Partners grid */}
        <div className="items-center justify-between flex">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="font-display font-bold text-on-surface-variant/40 text-xl md:text-2xl
                       tracking-tight uppercase hover:text-on-surface-variant/70 
                       transition-colors duration-300 cursor-default select-none"
              style={{ letterSpacing: "-0.02em" }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
