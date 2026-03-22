import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";
import SocialCard from "@/components/SocialCard";
import AboutSection from "@/components/AboutSection";
import OverlapHero from "@/components/OverlapHero";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const latestRelease = {
  title: "meow",
  artist: "amirthetrash",
  album: "meow",
  coverSrc: "/tetoplush.jpg",
  audioSrc: "/audio/mommyyukari.mp3",
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
          accentWord="meow" // this word gets swapped for the chevron icon
          imageSrc="/tetoplush.jpg"
          imageAlt="amirthetrash in the studio"
        />
        <OverlapHero
          label="My Story"
          line1="I"
          line2="Make"
          line3="Noise"
          body="Somewhere between a bedroom and a stage, this all started."
          imageSrc="/tetoplush.jpg"
          imageAlt="amirthetrash"
        />
        <OverlapHero
          label="My Work"
          line1="I"
          line2="Create"
          line3="Memories"
          body="I click good pictures too, you know."
          imageSrc="/tetoplush.jpg"
          imageAlt="amirthetrash"
        />
        <Footer />
      </SmoothScroll>
    </>
  );
}
