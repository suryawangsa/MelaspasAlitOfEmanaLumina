"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({
  targetDateISO,
}: {
  targetDateISO: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDateISO));
    const interval = setInterval(
      () => setTimeLeft(getTimeLeft(targetDateISO)),
      1000,
    );
    return () => clearInterval(interval);
  }, [targetDateISO]);

  const items = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className=" bg-[#265caa] text-cream pb-16 px-6">
      <div className="flex justify-center gap-8 md:gap-14 max-w-md mx-auto">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-body text-2xl md:text-3xl font-light">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="font-body text-[10px] tracking-[0.15em] text-cream/60 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
