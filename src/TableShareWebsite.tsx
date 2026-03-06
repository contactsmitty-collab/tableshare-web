// @ts-nocheck
import { useState, useEffect, useRef } from "react";

// ─── Brand Tokens ───
const C = {
  coral: "#E8573D",
  coralDark: "#C44A33",
  coralLight: "#FDF0EE",
  midnight: "#1B2A3D",
  midnightLight: "#243447",
  slate: "#3D5066",
  snow: "#F9FAFB",
  cloud: "#EFF3F7",
  mist: "#C8D3DE",
  stone: "#8494A7",
  sage: "#2E8B6A",
  sageLight: "#EEFAF5",
  amber: "#D4920B",
  white: "#FFFFFF",
};

const fonts = `'DM Sans', sans-serif`;
const fontSerif = `'DM Serif Display', serif`;
const fontMono = `'DM Mono', monospace`;

// Replace with your TestFlight public link: https://testflight.apple.com/join/XXXXX
const APP_DOWNLOAD_URL = "https://testflight.apple.com/join/YOUR_TESTFLIGHT_LINK";

// ─── Smooth scroll helper ───
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ─── Section wrapper ───
function Section({ id, bg = C.white, children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        backgroundColor: bg,
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
        {children}
      </div>
    </section>
  );
}

// ─── Section label ───
function SectionLabel({ children, light = false }) {
  return (
    <div
      style={{
        fontFamily: fontMono,
        fontSize: 11,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: light ? "rgba(255,255,255,0.4)" : C.stone,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section title ───
function SectionTitle({ children, light = false, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: fontSerif,
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 400,
        color: light ? C.white : C.midnight,
        margin: "0 0 16px",
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function SectionSubtitle({ children, light = false }) {
  return (
    <p
      style={{
        fontFamily: fonts,
        fontSize: 17,
        color: light ? "rgba(255,255,255,0.6)" : C.slate,
        lineHeight: 1.6,
        margin: "0 0 48px",
        maxWidth: 560,
      }}
    >
      {children}
    </p>
  );
}

// ═══════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "How It Works", id: "how" },
    { label: "Features", id: "features" },
    { label: "For Restaurants", id: "restaurants" },
    { label: "About", id: "about" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(27,42,61,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: C.coral,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* White plate */}
              <circle cx="11" cy="11" r="9" fill="white" opacity="0.95"/>
              {/* Fork - left */}
              <line x1="8.5" y1="6" x2="8.5" y2="16" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="7" y1="6" x2="7" y2="9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="10" y1="6" x2="10" y2="9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M7 9.5 Q8.5 11 10 9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              {/* Knife - right */}
              <line x1="13.5" y1="6" x2="13.5" y2="16" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M13.5 6 Q15.5 7.5 13.5 10" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span
            style={{
              fontFamily: fontSerif,
              fontSize: 20,
              color: C.white,
            }}
          >
            TableShare
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((l) => (
            <span
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                fontFamily: fonts,
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = C.white)}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
            >
              {l.label}
            </span>
          ))}
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: fonts,
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: C.coral,
              color: C.white,
              border: "none",
              borderRadius: 999,
              padding: "9px 22px",
              cursor: "pointer",
              transition: "transform 0.2s, background-color 0.2s",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Get the App
          </a>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function Hero() {
  return (
    <section
      id="hero"
      style={{
        background: `linear-gradient(160deg, ${C.midnight} 0%, #1F3044 40%, ${C.slate} 100%)`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,87,61,0.08) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,146,11,0.05) 0%, transparent 70%)`,
        }}
      />
      {/* Grid dots pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          opacity: 0.03,
          backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "120px 32px 80px",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left — Copy */}
        <div>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: C.coral,
              marginBottom: 20,
            }}
          >
            Live on TestFlight · Chicago 2026
          </div>
          <h1
            style={{
              fontFamily: fontSerif,
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              color: C.white,
              margin: "0 0 24px",
              lineHeight: 1.08,
            }}
          >
            Never Eat
            <br />
            Alone Again.
          </h1>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 18,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.65,
              margin: "0 0 40px",
              maxWidth: 440,
            }}
          >
            Discover restaurants, check in where you dine, match with nearby companions, and share a table. Book your next visit, rate your meal — all in one app. Not dating — just great food with great company.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: fonts,
                fontSize: 15,
                fontWeight: 600,
                backgroundColor: C.coral,
                color: C.white,
                border: "none",
                borderRadius: 999,
                padding: "14px 32px",
                cursor: "pointer",
                transition: "all 0.2s",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get the App
            </a>
            <button
              onClick={() => scrollTo("how")}
              style={{
                fontFamily: fonts,
                fontSize: 15,
                fontWeight: 500,
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "14px 28px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.target.style.color = C.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.target.style.color = "rgba(255,255,255,0.8)";
              }}
            >
              See How It Works
            </button>
          </div>

          {/* Social proof pills */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            {[
              { val: "81+", label: "restaurants" },
              { val: "100%", label: "platonic" },
              { val: "Check in", label: "& match" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: 999,
                  padding: "8px 16px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 16,
                    color: C.coral,
                    fontWeight: 400,
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontFamily: fonts,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual card stack */}
        <div style={{ position: "relative" }}>
          {/* Mock match card */}
          <div
            style={{
              backgroundColor: C.white,
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              transform: "rotate(2deg)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: fontMono,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: C.stone,
                marginBottom: 16,
              }}
            >
              New match found
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.coral} 0%, ${C.coralDark} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                🍽
              </div>
              <div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontWeight: 600,
                    fontSize: 17,
                    color: C.midnight,
                  }}
                >
                  Sarah K.
                </div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontSize: 13,
                    color: C.stone,
                  }}
                >
                  Main Course · 4.9★ · 15 tables shared
                </div>
              </div>
            </div>

            {/* Shared interests */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              {["Italian", "Sushi", "Wine", "Foodie", "Casual"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: fontMono,
                    fontSize: 10,
                    fontWeight: 500,
                    backgroundColor: C.coralLight,
                    color: C.coralDark,
                    borderRadius: 999,
                    padding: "4px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              style={{
                backgroundColor: C.snow,
                borderRadius: 12,
                padding: 14,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>✨</span>
              <div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontWeight: 600,
                    fontSize: 13,
                    color: C.midnight,
                  }}
                >
                  You both want to try Girl & The Goat
                </div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontSize: 12,
                    color: C.stone,
                  }}
                >
                  West Loop · $$ · Contemporary American
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                style={{
                  flex: 1,
                  fontFamily: fonts,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: C.coral,
                  color: C.white,
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 0",
                  cursor: "pointer",
                }}
              >
                Share a Table
              </button>
              <button
                style={{
                  fontFamily: fonts,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: C.cloud,
                  color: C.slate,
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 20px",
                  cursor: "pointer",
                }}
              >
                Later
              </button>
            </div>
          </div>

          {/* Background card */}
          <div
            style={{
              position: "absolute",
              top: -12,
              left: 16,
              right: -16,
              bottom: 12,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              transform: "rotate(-1deg)",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════
function HowItWorks() {
  const UserIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
  const ZapIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
  const MapPinIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
  const StarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );

  const steps = [
    { num: "01", title: "Discover & Check In", desc: "Browse For You, Trending, and Explore. Add spots to your lists. When you arrive, check in — you'll appear to others dining nearby.", Icon: MapPinIcon },
    { num: "02", title: "Match & Message", desc: "See who's dining at the same restaurant or nearby. Send a table-share request. Our AI suggests spots that work for you both.", Icon: ZapIcon },
    { num: "03", title: "Share a Table", desc: "Plan dinner together, book a reservation, or join the waitlist. Meet at the restaurant and enjoy a great meal.", Icon: UserIcon },
    { num: "04", title: "Rate & Return", desc: "When you check out, rate your experience. Tap 'Book next visit' to reserve again. Earn points for every shared meal.", Icon: StarIcon },
  ];

  return (
    <Section id="how" bg={C.snow}>
      <SectionLabel>How It Works</SectionLabel>
      <SectionTitle>Four steps to your next great dinner.</SectionTitle>
      <SectionSubtitle>
        No awkward meetups. No complicated setup. Just real people sharing real meals at real restaurants.
      </SectionSubtitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            style={{
              backgroundColor: C.white,
              borderRadius: 16,
              padding: 28,
              border: `1px solid ${C.cloud}`,
              position: "relative",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: C.coralLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.coral,
                }}
              >
                <step.Icon />
              </div>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 12,
                  fontWeight: 500,
                  color: C.mist,
                }}
              >
                {step.num}
              </span>
            </div>
            <div
              style={{
                fontFamily: fonts,
                fontWeight: 700,
                fontSize: 16,
                color: C.midnight,
                marginBottom: 10,
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontFamily: fonts,
                fontSize: 14,
                color: C.stone,
                lineHeight: 1.55,
              }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════
function Features() {
  const MapPinIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
  const MatchIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
  const BellIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
  const ListIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
  const SparkleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>
      <path d="M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const StarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
  const CalendarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
  const MailIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
  const TrophyIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
    </svg>
  );

  const features = [
    { title: "Check In & Discover", desc: "Check in where you dine. Browse For You, Trending, and Explore. See who's dining nearby and view diner photos at each restaurant.", Icon: MapPinIcon, color: C.coral, bg: C.coralLight },
    { title: "Smart Matching", desc: "Paired by cuisine taste, dining style, and conversation interests. Send table-share requests to nearby diners or browse matches.", Icon: MatchIcon, color: C.slate, bg: C.cloud },
    { title: "Reservations & Waitlist", desc: "Book tables, modify dates and times, add to your calendar. Join the waitlist and get notified when your table is ready.", Icon: CalendarIcon, color: C.sage, bg: C.sageLight },
    { title: "Post-Meal Ratings", desc: "Rate restaurants after you check out. Earn points for feedback. One tap to book your next visit at the same spot.", Icon: StarIcon, color: C.amber, bg: "#FFF8EB" },
    { title: "Dining Lists & Table Alerts", desc: 'Save spots to "Want to Try" lists. Get notified when someone wants to share a table at a restaurant you saved.', Icon: ListIcon, color: C.sage, bg: C.sageLight },
    { title: "Seat at the Table Rewards", desc: "Earn points for check-ins, shared meals, and ratings. Level up from First Course to Chef's Table for exclusive perks.", Icon: TrophyIcon, color: C.amber, bg: "#FFF8EB" },
  ];

  return (
    <Section id="features" bg={C.white}>
      <SectionLabel>Features</SectionLabel>
      <SectionTitle>Everything you need to dine socially.</SectionTitle>
      <SectionSubtitle>
        Built for people who love restaurants but want someone great to share them with.
      </SectionSubtitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              backgroundColor: C.snow,
              borderRadius: 16,
              padding: 28,
              border: `1px solid ${C.cloud}`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: f.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: f.color,
                marginBottom: 20,
              }}
            >
              <f.Icon />
            </div>
            <div
              style={{
                fontFamily: fonts,
                fontWeight: 700,
                fontSize: 16,
                color: C.midnight,
                marginBottom: 10,
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontFamily: fonts,
                fontSize: 14,
                color: C.stone,
                lineHeight: 1.55,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// FOR RESTAURANTS
// ═══════════════════════════════════════
function ForRestaurants() {
  const benefits = [
    { val: "2x", label: "covers per match", desc: "Every successful match puts two diners in your restaurant who wouldn't have come otherwise." },
    { val: "$800–2.4K", label: "monthly incremental revenue", desc: "Projected per-restaurant monthly revenue from TableShare-driven covers." },
    { val: "Zero", label: "effort to start", desc: "We do the work. No hardware, no training, no menu changes. Just more diners." },
  ];

  const tiers = [
    { name: "Passive", desc: "We list you. Diners find you. You do nothing.", tag: "Most restaurants start here" },
    { name: "Active Availability", desc: "Share off-peak availability. We fill empty tables with matched diners.", tag: "Best ROI" },
    { name: "Integrated", desc: "Deep integration with your POS. Real-time table matching and analytics.", tag: "Coming Q3 2026" },
  ];

  return (
    <Section id="restaurants" bg={C.midnight} style={{ padding: "80px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        {/* Left */}
        <div>
          <SectionLabel light>For Restaurants</SectionLabel>
          <SectionTitle light>Zero risk. Zero effort. New revenue.</SectionTitle>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              margin: "0 0 40px",
            }}
          >
            We're not competing for your existing diners — we're creating new ones.
            Every TableShare match generates covers your restaurant wouldn't have had otherwise.
            That's not market share redistribution. That's market creation.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {benefits.map((b) => (
              <div
                key={b.label}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontSize: 28,
                    color: C.coral,
                    minWidth: 110,
                    lineHeight: 1,
                  }}
                >
                  {b.val}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: fonts,
                      fontWeight: 600,
                      fontSize: 14,
                      color: C.white,
                      marginBottom: 4,
                    }}
                  >
                    {b.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.5,
                    }}
                  >
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Partnership tiers */}
        <div>
          <div
            style={{
              fontFamily: fonts,
              fontWeight: 600,
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Partnership Tiers
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  padding: 24,
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts,
                      fontWeight: 700,
                      fontSize: 16,
                      color: C.white,
                    }}
                  >
                    {tier.name}
                  </div>
                  <span
                    style={{
                      fontFamily: fontMono,
                      fontSize: 10,
                      fontWeight: 500,
                      color: i === 1 ? C.coral : "rgba(255,255,255,0.3)",
                      backgroundColor: i === 1 ? "rgba(232,87,61,0.12)" : "rgba(255,255,255,0.04)",
                      borderRadius: 999,
                      padding: "3px 10px",
                    }}
                  >
                    {tier.tag}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.5,
                  }}
                >
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollTo("waitlist")}
            style={{
              fontFamily: fonts,
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: "rgba(255,255,255,0.08)",
              color: C.white,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "13px 28px",
              cursor: "pointer",
              marginTop: 24,
              transition: "all 0.2s",
              width: "100%",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = C.coral;
              e.target.style.borderColor = C.coral;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
              e.target.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Become a Partner Restaurant
          </button>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════
function About() {
  return (
    <Section id="about" bg={C.snow}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <SectionLabel>About</SectionLabel>
          <SectionTitle>Built for people who love restaurants.</SectionTitle>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 16,
              color: C.slate,
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            TableShare started with a simple observation: over 40% of American households
            are single-person. Millions of people love dining out but don't always have
            someone to go with. Meanwhile, restaurants have empty tables they'd love to fill.
          </p>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 16,
              color: C.slate,
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            We're building the social layer for dining — not a dating app, not a reservation
            tool, but the thing that gives you a reason to make the reservation in the first place.
          </p>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 16,
              color: C.slate,
              lineHeight: 1.7,
              margin: "0 0 0",
            }}
          >
            Launching in Chicago in 2026. Currently raising a $750K seed round to bring
            great meals and great company together at scale.
          </p>
        </div>

        {/* Values / Pillars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              title: "Human Connection",
              desc: "Technology should bring people together, not keep them on their phones. Every feature we build starts with the question: does this lead to a better dinner?",
              icon: "❤️",
            },
            {
              title: "Safety First",
              desc: "Photo verification, public venue meetings only, companion ratings, and report tools. We take trust seriously so you don't have to worry.",
              icon: "🛡️",
            },
            {
              title: "Restaurant Partners",
              desc: "We succeed when restaurants succeed. Zero risk, zero effort — just new diners who are excited to be there.",
              icon: "🤝",
            },
          ].map((v) => (
            <div
              key={v.title}
              style={{
                backgroundColor: C.white,
                borderRadius: 16,
                padding: 24,
                border: `1px solid ${C.cloud}`,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: C.coralLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {v.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.midnight,
                    marginBottom: 6,
                  }}
                >
                  {v.title}
                </div>
                <div
                  style={{
                    fontFamily: fonts,
                    fontSize: 14,
                    color: C.stone,
                    lineHeight: 1.55,
                  }}
                >
                  {v.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// WAITLIST / CTA
// ═══════════════════════════════════════
function Waitlist() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("diner");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <Section id="waitlist" bg={C.white} style={{ padding: "80px 0 0" }}>
      <div
        style={{
          background: `linear-gradient(160deg, ${C.midnight} 0%, #1F3044 40%, ${C.slate} 100%)`,
          borderRadius: 24,
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(232,87,61,0.06) 0%, transparent 60%)`,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: C.coral,
              marginBottom: 16,
            }}
          >
            Coming to Chicago · 2026
          </div>
          <h2
            style={{
              fontFamily: fontSerif,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: C.white,
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            Ready to share a table?
          </h2>
          <p
            style={{
              fontFamily: fonts,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              margin: "0 auto 36px",
              maxWidth: 460,
            }}
          >
            Get early access on TestFlight, or join the waitlist for launch updates.
            Whether you're a diner looking for company or a restaurant looking for new covers, we'd love to have you.
          </p>

          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: fonts,
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: C.coral,
              color: C.white,
              border: "none",
              borderRadius: 999,
              padding: "12px 24px",
              cursor: "pointer",
              marginBottom: 24,
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
          >
            Get the App (TestFlight)
          </a>
          {!submitted ? (
            <>
              <div style={{ fontFamily: fonts, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>— or join the waitlist —</div>
              {/* Type toggle */}
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 999,
                  padding: 4,
                  marginBottom: 24,
                }}
              >
                {[
                  { id: "diner", label: "I'm a Diner" },
                  { id: "restaurant", label: "I'm a Restaurant" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    style={{
                      fontFamily: fonts,
                      fontSize: 13,
                      fontWeight: type === t.id ? 600 : 400,
                      backgroundColor: type === t.id ? C.coral : "transparent",
                      color: type === t.id ? C.white : "rgba(255,255,255,0.5)",
                      border: "none",
                      borderRadius: 999,
                      padding: "9px 22px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Email input */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  maxWidth: 440,
                  margin: "0 auto",
                }}
              >
                <input
                  type="email"
                  placeholder={
                    type === "diner"
                      ? "your@email.com"
                      : "restaurant@email.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{
                    flex: 1,
                    fontFamily: fonts,
                    fontSize: 15,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: C.white,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(232,87,61,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                  }
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    fontFamily: fonts,
                    fontSize: 15,
                    fontWeight: 600,
                    backgroundColor: C.coral,
                    color: C.white,
                    border: "none",
                    borderRadius: 12,
                    padding: "14px 28px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = C.coralDark;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = C.coral;
                  }}
                >
                  Join Waitlist
                </button>
              </div>
              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 16,
                }}
              >
                Free. No spam. Early access when we launch.
              </div>
            </>
          ) : (
            <div>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "rgba(46,139,106,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  margin: "0 auto 20px",
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: fontSerif,
                  fontSize: 24,
                  color: C.white,
                  marginBottom: 8,
                }}
              >
                You're on the list!
              </div>
              <div
                style={{
                  fontFamily: fonts,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                We'll be in touch when we launch in Chicago.
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: C.midnight,
        padding: "48px 0 32px",
        borderTop: `1px solid rgba(255,255,255,0.04)`,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              backgroundColor: C.coral,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="9" fill="white" opacity="0.95"/>
              <line x1="8.5" y1="6" x2="8.5" y2="16" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="7" y1="6" x2="7" y2="9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="10" y1="6" x2="10" y2="9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M7 9.5 Q8.5 11 10 9.5" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              <line x1="13.5" y1="6" x2="13.5" y2="16" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M13.5 6 Q15.5 7.5 13.5 10" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span
            style={{
              fontFamily: fontSerif,
              fontSize: 17,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            TableShare
          </span>
        </div>

        <div
          style={{
            fontFamily: fontMono,
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © 2026 TableShare, Inc. · Chicago, IL
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {["Instagram", "Twitter", "LinkedIn"].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: fonts,
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = C.coral)}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.35)")
              }
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
export default function TableShareWebsite() {
  return (
    <div
      style={{
        fontFamily: fonts,
        backgroundColor: C.white,
        color: C.midnight,
        minHeight: "100vh",
        margin: 0,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr 1fr !important;
          }
          section > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <ForRestaurants />
      <About />
      <Waitlist />
      <Footer />
    </div>
  );
}
