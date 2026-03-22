import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";
import SocialCard from "@/components/SocialCard";
import AboutSection from "@/components/AboutSection";
import OverlapHero from "@/components/OverlapHero";
import Albums from "@/components/Albums";
import ScrollColorWipe from "@/components/ScrollColorWipe";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const latestRelease = {
  title: "STARGAZER",
  artist: "amirthetrash",
  album: "STARGAZER",
  coverSrc: "/covers/stargazer.png",
  audioSrc: "/audio/STARGAZER.wav",
};

const COLORS = {
  surface: "#b33791",
  surfaceLow: "#ff0000",
  surfaceMid: "#ffd500",
  surfaceEnd: "#ffb0ca", // wraps back or any final color you want
};

export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <HeroSection />
        <LatestRelease track={latestRelease} />
        <SocialCard />
        <AboutSection
          label="About Me"
          heading='Amir (aka amirthetrash) is a producer and editor from Malaysia making everything from Lofi to Breakcore. He’s best known for "departures" and "frutiger aero," which have hit over 1.8M combined streams and counting. 🎶'
          accentWord="meow"
          imageSrc="/amir3.jpg"
          imageAlt="amirthetrash in the studio"
        />
        <Albums />
        <ScrollColorWipe
          bgColor={COLORS.surface}
          nextBgColor={COLORS.surfaceLow}
        >
          <OverlapHero
            label="My Story"
            line1="I"
            line2="Make"
            line3="Noise"
            body="Somewhere between a bedroom and a stage, this all started."
            imageSrc="/tetoplush.jpg"
            imageAlt="amirthetrash"
          />
        </ScrollColorWipe>

        {/*
          Section 2: red bg, transitions to yellow when scrolled away
        */}
        <ScrollColorWipe
          bgColor={COLORS.surfaceLow}
          nextBgColor={COLORS.surfaceMid}
        >
          <OverlapHero
            label="My Work"
            line1="I"
            line2="Create"
            line3="Memories"
            body="I click good pictures too, you know."
            imageSrc="/tetoplush.jpg"
            imageAlt="amirthetrash"
          />
        </ScrollColorWipe>

        {/* Footer on the final color */}
        <div style={{ backgroundColor: COLORS.surfaceMid }}>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
