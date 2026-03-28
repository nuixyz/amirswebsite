"use client";

const partners = ["Partner A", "Partner B", "Partner C"];

export default function PartnersSection() {
  return (
    <section
      className="mx-4 sm:mx-8 lg:mx-12 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-surface rounded-3xl sm:rounded-4xl"
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[10px] sm:text-xs tracking-label uppercase text-on-surface-variant text-center mb-8 sm:mb-12">
          Partners & Associates
        </p>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 place-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="font-display font-bold text-on-surface-variant/40 
                       text-lg sm:text-xl md:text-2xl
                       tracking-tight uppercase text-center
                       hover:text-on-surface-variant/70 
                       transition-colors duration-300 
                       cursor-default select-none"
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
