"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTargetDate(): Date {
  // 30 days from now
  const target = new Date();
  target.setDate(target.getDate() + 30);
  return target;
}

// Store target date in module scope so it doesn't reset on re-render
const TARGET_DATE = getTargetDate();

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(num: number): string {
  return num.toString().padStart(2, "0");
}

export function UrgencyBlock() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="urgency-block" aria-label="Batas waktu pendaftaran">
        <div className="slots-left">
          <span className="dot-pulse" aria-hidden="true" />
          Tersisa <strong>7 kursi</strong> untuk Batch Juli 2025
        </div>
        <div className="countdown" role="timer">
          {["Hari", "Jam", "Menit", "Detik"].map((label) => (
            <div key={label} className="countdown-unit">
              <span className="countdown-number">--</span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="urgency-block" aria-label="Batas waktu pendaftaran">
      <div className="slots-left">
        <span className="dot-pulse" aria-hidden="true" />
        Tersisa <strong>7 kursi</strong> untuk Batch Juli 2025
      </div>
      <div className="countdown" role="timer">
        <div className="countdown-unit">
          <span className="countdown-number">{pad(timeLeft.days)}</span>
          <span className="countdown-label">Hari</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{pad(timeLeft.hours)}</span>
          <span className="countdown-label">Jam</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{pad(timeLeft.minutes)}</span>
          <span className="countdown-label">Menit</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-number">{pad(timeLeft.seconds)}</span>
          <span className="countdown-label">Detik</span>
        </div>
      </div>
    </div>
  );
}
