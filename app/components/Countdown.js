"use client";

import { useEffect, useState } from "react";

function diffParts(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

const ZERO = { d: 0, h: 0, m: 0, s: 0 };

export default function Countdown({ target }) {
  const targetMs = new Date(target).getTime();
  // Start at zero on both server and client's first render to avoid a
  // hydration mismatch, then sync to the real value once mounted.
  const [parts, setParts] = useState(ZERO);

  useEffect(() => {
    setParts(diffParts(targetMs));
    const id = setInterval(() => setParts(diffParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="countdown">
      <div className="cd-box"><b>{pad(parts.d)}</b><span>Dias</span></div>
      <div className="cd-box"><b>{pad(parts.h)}</b><span>Horas</span></div>
      <div className="cd-box"><b>{pad(parts.m)}</b><span>Min</span></div>
      <div className="cd-box"><b>{pad(parts.s)}</b><span>Seg</span></div>
    </div>
  );
}
