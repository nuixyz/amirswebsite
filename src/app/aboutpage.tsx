import Navbar from "@/components/Navbar";
import OverlapHero from "@/components/OverlapHero";
import ScrollColorTransition from "@/components/ScrollColorWipe";

// Define your color sequence here — each section transitions INTO the next
const sections = [
  {
    fromColor: "#0e0e0e", // surface
    toColor: "#131313", // surface-low
    label: "Chapter One",
    line1: "I",
    line2: "Make",
    line3: "Noise",
    body: "Started in a bedroom. Ended up everywhere.",
    imageSrc: "/images/photo-1.jpg",
    imageAlt: "amirthetrash in the studio",
  },
  {
    fromColor: "#131313", // surface-low
    toColor: "#1a1a1a", // surface-container
    label: "Chapter Two",
    line1: "You",
    line2: "Feel",
    line3: "It",
    body: "Music that lives in your chest before it reaches your ears.",
    imageSrc: "/images/photo-2.jpg",
    imageAlt: "amirthetrash performing",
  },
  {
    fromColor: "#1a1a1a", // surface-container
    toColor: "#0e0e0e", // back to surface
    label: "Chapter Three",
    line1: "We",
    line2: "Build",
    line3: "Worlds",
    body: "Every track is a place you can live inside.",
    imageSrc: "/images/photo-3.jpg",
    imageAlt: "amirthetrash in the studio",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        {sections.map((section, i) => {
          const isLast = i === sections.length - 1;

          // Last section doesn't need a curtain — no next section
          if (isLast) {
            return (
              <div key={i} style={{ backgroundColor: section.fromColor }}>
                <OverlapHero
                  label={section.label}
                  line1={section.line1}
                  line2={section.line2}
                  line3={section.line3}
                  body={section.body}
                  imageSrc={section.imageSrc}
                  imageAlt={section.imageAlt}
                />
              </div>
            );
          }

          return (
            <ScrollColorTransition
              key={i}
              fromColor={section.fromColor}
              toColor={section.toColor}
            >
              <OverlapHero
                label={section.label}
                line1={section.line1}
                line2={section.line2}
                line3={section.line3}
                body={section.body}
                imageSrc={section.imageSrc}
                imageAlt={section.imageAlt}
              />
            </ScrollColorTransition>
          );
        })}
      </main>
    </>
  );
}
