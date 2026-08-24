"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CoverScreen from "@/components/CoverScreen";
import Hero from "@/components/Hero";
import OpeningQuote from "@/components/OpeningQuote";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import ClosingMessage from "@/components/ClosingMessage";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";

const EVENT_DATE = "2026-08-27T09:00:00+08:00";
const EVENT_END_TIME = "14:00"; // jam selesai, format 24 jam

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName =
    searchParams.get("to")?.replace(/-/g, " ") || "Bapak/Ibu/Saudara/i";

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="relative min-h-screen bg-[#265caa] overflow-x-hidden">
      <audio ref={audioRef} loop src="/audio/0823.mp3" />

      {!isOpen && <CoverScreen guestName={guestName} onOpen={handleOpen} />}

      {isOpen && (
        <>
          <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
          <Hero />
          <OpeningQuote />
          <EventDetails eventDateISO={EVENT_DATE} endTime={EVENT_END_TIME} />
          <Countdown targetDateISO={EVENT_DATE} />
          <ClosingMessage />
          <Wishes guestName={guestName} />
          <Footer />
        </>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InvitationContent />
    </Suspense>
  );
}
