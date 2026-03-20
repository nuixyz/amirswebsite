import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";
import SocialCard from "@/components/SocialCard";
import AboutSection from "@/components/AboutSection";
import OverlapHero from "@/components/OverlapHero";
import Footer from "@/components/Footer";

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
      <Footer />
    </>
  );
}
