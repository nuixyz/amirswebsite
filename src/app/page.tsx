import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";
import SocialCard from "@/components/SocialCard";
import AboutSection from "@/components/AboutSection";
import OverlapHero from "@/components/OverlapHero";
import ScrollColorWipe from "@/components/ScrollColorWipe";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const latestRelease = {
  title: "meow",
  artist: "amirthetrash",
  album: "meow",
  coverSrc: "/tetoplush.jpg",
  audioSrc: "/audio/mommyyukari.mp3",
};

const COLORS = {
  surface: "#ffb0ca",
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
          heading="i make meow music."
          accentWord="meow"
          imageSrc="/tetoplush.jpg"
          imageAlt="amirthetrash in the studio"
        />

        {/*
          Section 1: pink bg, transitions to red when scrolled away
        */}
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
