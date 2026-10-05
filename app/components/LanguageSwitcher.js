"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { setLocale } from "../actions/locale";

function FlagPT(props) {
  return (
    <svg viewBox="0 0 30 20" width="18" height="13" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#D4213D" />
      <rect width="12" height="20" fill="#046A38" />
      <circle cx="12" cy="10" r="3.6" fill="#FFCC00" stroke="#046A38" strokeWidth=".6" />
    </svg>
  );
}

function FlagGB(props) {
  return (
    <svg viewBox="0 0 30 20" width="18" height="13" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#CF142B" strokeWidth="1.6" />
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0V20M0 10H30" stroke="#CF142B" strokeWidth="3.2" />
    </svg>
  );
}

function FlagES(props) {
  return (
    <svg viewBox="0 0 30 20" width="18" height="13" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}

function FlagFR(props) {
  return (
    <svg viewBox="0 0 30 20" width="18" height="13" aria-hidden="true" {...props}>
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  );
}

const LANGS = [
  { code: "pt", label: "PT", Flag: FlagPT },
  { code: "en", label: "EN", Flag: FlagGB },
  { code: "es", label: "ES", Flag: FlagES },
  { code: "fr", label: "FR", Flag: FlagFR },
];

export default function LanguageSwitcher({ current, compact }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const localeInputRef = useRef(null);
  const active = LANGS.find((l) => l.code === current) || LANGS[0];

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function choose(code) {
    setOpen(false);
    if (code === current) return;
    localeInputRef.current.value = code;
    formRef.current.requestSubmit();
  }

  return (
    <div className={`lang-switcher${compact ? " compact" : ""}${open ? " open" : ""}`} ref={rootRef}>
      <form ref={formRef} action={setLocale}>
        <input type="hidden" name="path" value={pathname} />
        <input type="hidden" name="locale" defaultValue={current} ref={localeInputRef} />
      </form>
      <button
        type="button"
        className="lang-current"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Idioma / Language"
      >
        <active.Flag />
        <span>{active.label}</span>
        <svg className="lang-caret" viewBox="0 0 12 8" width="9" height="6" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-option${l.code === current ? " active" : ""}`}
                onClick={() => choose(l.code)}
                role="option"
                aria-selected={l.code === current}
              >
                <l.Flag />
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
