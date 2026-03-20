import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";

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
    </>
  );
}
