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

// transition colors
const COLORS = {
  surface: "#ffb0ca", // primary color
  surfaceLow: "#ff0000",
  surfaceMid: "#ffd500",
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
        <ScrollColorWipe fromColor={COLORS.surface} toColor={COLORS.surfaceLow}>
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
        <ScrollColorWipe
          fromColor={COLORS.surfaceLow}
          toColor={COLORS.surfaceMid}
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
        <div style={{ backgroundColor: COLORS.surfaceMid }}>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
