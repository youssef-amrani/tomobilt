"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("tomobilt-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = (t: string) => {
    setTheme(t);
    localStorage.setItem("tomobilt-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[var(--bg-secondary)]/90 backdrop-blur-xl shadow-md" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid var(--border)" : "none" }}
    >
      <div className="container flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <span style={{ color: "var(--primary-light)" }}>TOMO</span>
          <span style={{ color: "var(--accent)" }}>BILT</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>.COM</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {["Accueil", "Notre Flotte", "Tarifs", "À Propos", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item === "Accueil" ? "accueil" : item === "Notre Flotte" ? "flotte" : item === "À Propos" ? "apropos" : item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-white/5 hover:text-[var(--primary-light)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item}
              </a>
            </li>
          ))}
          <li className="flex items-center ml-2">
            <div
              className="flex items-center gap-1 p-1 rounded-lg"
              style={{ background: "var(--theme-toggle-bg, rgba(255,255,255,0.08))" }}
            >
              <button
                onClick={() => toggleTheme("dark")}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                  theme === "dark" ? "bg-[var(--gradient-primary)] text-white shadow-md" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
                title="Mode Sombre"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              </button>
              <button
                onClick={() => toggleTheme("light")}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                  theme === "light" ? "bg-[var(--gradient-primary)] text-white shadow-md" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
                title="Mode Clair"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </button>
            </div>
          </li>
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0675606633"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 15px var(--primary-glow)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Réserver
          </a>

          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            style={{ background: "var(--glass-bg, rgba(255,255,255,0.04))" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} style={{ background: "var(--text-primary)" }}></span>
            <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "opacity-0" : ""}`} style={{ background: "var(--text-primary)" }}></span>
            <span className={`block w-5 h-0.5 rounded transition-all ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} style={{ background: "var(--text-primary)" }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-xs h-screen md:hidden transition-all duration-300 ${
          mobileOpen ? "right-0" : "-right-full"
        }`}
        style={{
          background: "rgba(10, 14, 26, 0.98)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid var(--border)",
          padding: "80px 32px",
        }}
      >
        <ul className="flex flex-col gap-1">
          {["Accueil", "Notre Flotte", "Tarifs", "À Propos", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item === "Accueil" ? "accueil" : item === "Notre Flotte" ? "flotte" : item === "À Propos" ? "apropos" : item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3.5 rounded-lg text-base font-medium transition-all hover:bg-white/5"
                style={{ color: "var(--text-secondary)" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-xl" style={{ background: "var(--theme-toggle-bg, rgba(255,255,255,0.08))" }}>
          <button onClick={() => toggleTheme("dark")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${theme === "dark" ? "bg-[var(--gradient-primary)] text-white" : "text-[var(--text-muted)]"}`}>Sombre</button>
          <button onClick={() => toggleTheme("light")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${theme === "light" ? "bg-[var(--gradient-primary)] text-white" : "text-[var(--text-muted)]"}`}>Clair</button>
        </div>
        <a
          href="tel:0675606633"
          className="flex items-center justify-center gap-2 w-full mt-6 py-3.5 rounded-xl text-base font-semibold text-white"
          style={{ background: "var(--gradient-primary)" }}
          onClick={() => setMobileOpen(false)}
        >
          Réserver maintenant
        </a>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </nav>
  );
}
