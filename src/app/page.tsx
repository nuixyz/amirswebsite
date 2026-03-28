"use client";

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LatestRelease from "@/components/LatestRelease";
import SocialCard from "@/components/SocialCard";
import AboutSection from "@/components/AboutSection";
import OverlapHero from "@/components/OverlapHero";
import Albums from "@/components/Albums";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import DesktopMate from "@/components/DesktopMate";
import { useBodyColor } from "@/hooks/useBodyColor";
import Vault from "@/components/Vault";

import Playsound from "@/components/PlaySound";

const BG = {
  hero: "#f9f9f9",
  release: "#f9f9f9",
  social: "#f9f9f9",
  about: "#f9f9f9",
  albums: "#f9f9f9",
  story: "#526fa1", // blue
  work: "#ff0000", // red
  elementofsurprise: "#a18cd5",
  footer: "#ff0220", // yellow
};

const latestRelease = {
  title: "STARGAZER",
  artist: "amirthetrash",
  album: "STARGAZER",
  coverSrc: "/covers/stargazer.png",
  audioSrc: "/audio/STARGAZER.mp3",
};

export default function Home() {
  useBodyColor();

  return (
    <>
      <Navbar />
      <SmoothScroll>
        <div data-bg={BG.hero}>
          <HeroSection />
        </div>

        <div data-bg={BG.release}>
          <LatestRelease track={latestRelease} />
        </div>

        <div data-bg={BG.social}>
          <SocialCard />
        </div>

        <div data-bg={BG.about}>
          <AboutSection
            label="About Me"
            heading='Amir (aka amirthetrash) is a producer and editor from Malaysia making everything from Lofi to Breakcore. He&apos;s best known for "departures" and "frutiger aero," which have hit over 1.8M combined streams and counting. 🎶'
            accentWord="meow"
            imageSrc="/amir3.jpg"
            imageAlt="amirthetrash in the studio"
          />
        </div>

        <Vault />

        <div data-bg={BG.albums}>
          <Albums />
        </div>

        <div data-bg={BG.story}>
          <OverlapHero
            label="My Story"
            line1="I"
            line2="Make"
            line3="Music"
            body="Somewhere between a bedroom and a stage, this all started."
            imageSrc="/amir1.jpg"
            imageAlt="amirthetrash"
          />
        </div>

        <div data-bg={BG.work}>
          <OverlapHero
            label="My Work"
            line1="I"
            line2="Create"
            line3="Memories"
            body="I click good pictures too, you know."
            imageSrc="/amir3.jpg"
            imageAlt="amirthetrash"
          />
        </div>
        <div data-bg={BG.elementofsurprise}>
          <Playsound />
        </div>
        {/* <div data-bg={BG.footer}>
          <Footer />
        </div> */}
        <Footer />
      </SmoothScroll>
      <DesktopMate />
    </>
  );
}
