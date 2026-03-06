// @ts-nocheck
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

// All CTAs scroll to #waitlist until a public TestFlight link is ready

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ─── Ionicons inline SVG icon components (outline variants) ───
// Official Ionicons paths, viewBox 512x512, stroke-based outline style
const ionicons = {
  "restaurant-outline": (
    <>
      <line x1="256" y1="48" x2="256" y2="206" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="192" y1="48" x2="192" y2="142" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="320" y1="48" x2="320" y2="142" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M192,142c0,36.45,28.65,66,64,66s64-29.55,64-66" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="256" y1="250" x2="256" y2="464" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M384,48c0,0,16,16,16,80s-16,96-16,96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="384" y1="224" x2="384" y2="464" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "location-outline": (
    <>
      <path d="M256,48c-79.5,0-144,61.39-144,137,0,87,96,224.87,131.25,272.49a15.77,15.77,0,0,0,25.5,0C304,409.89,400,272.07,400,185,400,109.39,335.5,48,256,48Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "flash-outline": (
    <path d="M315.27,33,132,279.91H240.12L196.73,480,380,233.09H271.88Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
  ),
  "people-outline": (
    <>
      <path d="M402,168c-2.93,40.67-33.1,72-66,72s-63.12-31.32-66-72c-3-42.31,26.37-72,66-72S405,126.46,402,168Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M336,304c-65.17,0-127.84,32.37-143.54,95.41-2.08,8.34,3.15,16.59,11.72,16.59H467.82c8.57,0,13.77-8.25,11.72-16.59C463.85,336.36,401.18,304,336,304Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
      <path d="M200,185.94c-2.34,32.48-26.72,58.06-53,58.06s-50.7-25.57-53-58.06C91.61,152.15,115.34,128,147,128S202.39,152.77,200,185.94Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M206,306c-18.05-8.27-37.93-11.45-59-11.45-52,0-102.1,25.85-114.65,76.2C30.7,377.41,35.88,384,44.14,384H182" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/>
    </>
  ),
  "star-outline": (
    <path d="M480,208H308L256,48,204,208H32l140,96L118,464,256,364,394,464,340,304Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/>
  ),
  "calendar-outline": (
    <>
      <rect x="48" y="80" width="416" height="384" rx="48" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="128" y1="48" x2="128" y2="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="384" y1="48" x2="384" y2="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="464" y1="160" x2="48" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "list-outline": (
    <>
      <line x1="160" y1="144" x2="448" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="160" y1="256" x2="448" y2="256" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="160" y1="368" x2="448" y2="368" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <circle cx="80" cy="144" r="16" fill="currentColor"/>
      <circle cx="80" cy="256" r="16" fill="currentColor"/>
      <circle cx="80" cy="368" r="16" fill="currentColor"/>
    </>
  ),
  "trophy-outline": (
    <>
      <path d="M400,80H112a16,16,0,0,0-16,16v48c0,44.18,35.82,80,80,80h0c44.18,0,80-35.82,80-80V96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M256,224v32a64,64,0,0,1-64,64H192a64,64,0,0,1-64-64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="256" y1="352" x2="256" y2="464" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <line x1="160" y1="464" x2="352" y2="464" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M112,96H64a16,16,0,0,0-16,16v16c0,44.18,35.82,80,80,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M400,96h48a16,16,0,0,1,16,16v16c0,44.18-35.82,80-80,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "sparkles-outline": (
    <>
      <path d="M259.92,262.91,216.4,149.77a9,9,0,0,0-16.8,0L156.08,262.91a9,9,0,0,1-5.17,5.17L37.77,311.6a9,9,0,0,0,0,16.8l113.14,43.52a9,9,0,0,1,5.17,5.17L199.6,490.23a9,9,0,0,0,16.8,0l43.52-113.14a9,9,0,0,1,5.17-5.17L378.23,328.4a9,9,0,0,0,0-16.8L265.09,268.08A9,9,0,0,1,259.92,262.91Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M108,68,88,16,68,68,16,88l52,20,20,52,20-52,52-20Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M426.67,117.33,400,48l-26.67,69.33L304,144l69.33,26.67L400,240l26.67-69.33L496,144Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "heart-outline": (
    <path d="M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
  ),
  "shield-checkmark-outline": (
    <>
      <path d="M463.1,112.37C373.68,96.33,336.71,84.45,256,48,175.29,84.45,138.32,96.33,48.9,112.37,32.7,369.13,256,448,256,448S479.3,369.13,463.1,112.37Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <polyline points="336 176 225.2 304 176 255.79" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "handshake-outline": (
    <>
      <path d="M256,112V48L176,128l80,80V144c53.02,0,96,42.98,96,96s-42.98,96-96,96-96-42.98-96-96H128c0,70.69,57.31,128,128,128s128-57.31,128-128S326.69,112,256,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "checkmark-outline": (
    <polyline points="416 128 192 384 96 288" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
  ),
  "link-outline": (
    <>
      <path d="M208,352H144a96,96,0,0,1,0-192h64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="36"/>
      <path d="M304,160h64a96,96,0,0,1,0,192H304" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="36"/>
      <line x1="163.29" y1="256" x2="348.71" y2="256" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="36"/>
    </>
  ),
  "logo-instagram": (
    <>
      <rect x="48" y="48" width="416" height="416" rx="80" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
      <circle cx="256" cy="256" r="100" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
      <circle cx="393.5" cy="118.5" r="26" fill="currentColor"/>
    </>
  ),
  "logo-twitter": (
    <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,14.67,399,203.31,203.31,0,0,1,0,398.1,278.68,278.68,0,0,0,150.36,448c180.39,0,279-147.3,279-274.9,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,480,109.5Z" fill="currentColor"/>
  ),
  "logo-linkedin": (
    <>
      <rect x="48" y="48" width="416" height="416" rx="80" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
      <path d="M136,208v160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M136,136v0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40"/>
      <path d="M232,208v160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      <path d="M232,264c0-32,17.1-56,48-56s48,24,48,56v104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </>
  ),
  "logo-apple": (
    <path d="M318.7,268.7c-.2-36.7,16.4-64.4,50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3,20.7-88.5,20.7-15,0-49.4-19.7-74.3-19.7C63.1,141.2,16,186.8,16,270.5c0,24.9,4.5,50.5,13.6,76.8C42.7,381,92.7,466.4,144.8,464c22.4-.5,38.2-15.6,67.2-15.6,28.1,0,42.8,15.6,67.2,15.1,53.4-.9,97.7-75.4,110.2-109.6C335,328.5,319,301.7,318.7,268.7ZM267.7,117.6c26.4-31.3,24.2-60,23.3-69.6-23.5,1.3-50.8,16.3-66.5,34.6-17.4,20.1-27.4,44.8-25.2,72.6C224.9,157.3,247.3,142.2,267.7,117.6Z" fill="currentColor"/>
  ),
};

// Ionicon wrapper – renders inline SVG with correct viewBox
function IonIcon({ name, size = 22, color = "currentColor", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      style={{ color, flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }}
    >
      {ionicons[name] || null}
    </svg>
  );
}

// ─── Section wrapper ───
function Section({ id, bg = C.white, children, style = {} }) {
  return (
    <section id={id} style={{ backgroundColor: bg, padding: "80px 0", position: "relative", overflow: "hidden", ...style }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>{children}</div>
    </section>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: light ? "rgba(255,255,255,0.4)" : C.stone, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, light = false, style = {} }) {
  return (
    <h2 style={{ fontFamily: fontSerif, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: light ? C.white : C.midnight, margin: "0 0 16px", lineHeight: 1.15, ...style }}>
      {children}
    </h2>
  );
}

function SectionSubtitle({ children, light = false }) {
  return (
    <p style={{ fontFamily: fonts, fontSize: 17, color: light ? "rgba(255,255,255,0.6)" : C.slate, lineHeight: 1.6, margin: "0 0 48px", maxWidth: 560 }}>
      {children}
    </p>
  );
}

// ═══════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(27,42,61,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.coral, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IonIcon name="restaurant-outline" size={18} color={C.white} />
          </div>
          <span style={{ fontFamily: fontSerif, fontSize: 20, color: C.white }}>TableShare</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((l) => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{ fontFamily: fonts, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = C.white)} onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}>
              {l.label}
            </span>
          ))}
          <button onClick={() => scrollTo("waitlist")} style={{ fontFamily: fonts, fontSize: 13, fontWeight: 600, backgroundColor: C.coral, color: C.white, border: "none", borderRadius: 999, padding: "9px 22px", cursor: "pointer", transition: "transform 0.2s, background-color 0.2s" }}>
            Join Waitlist
          </button>
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
    <section id="hero" style={{ background: `linear-gradient(160deg, ${C.midnight} 0%, #1F3044 40%, ${C.slate} 100%)`, minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,87,61,0.08) 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: "15%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(212,146,11,0.05) 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.03, backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 32px 80px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: C.coral, marginBottom: 20 }}>
            Coming Soon · Chicago 2026
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: C.white, margin: "0 0 24px", lineHeight: 1.08 }}>
            Never Eat<br />Alone Again.
          </h1>
          <p style={{ fontFamily: fonts, fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 40px", maxWidth: 440 }}>
            Discover restaurants, check in where you dine, match with nearby companions, and share a table. Book via OpenTable & Resy, rate your meal — all in one app. Not dating — just great food with great company.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("waitlist")} style={{ fontFamily: fonts, fontSize: 15, fontWeight: 600, backgroundColor: C.coral, color: C.white, border: "none", borderRadius: 999, padding: "14px 32px", cursor: "pointer", transition: "all 0.2s" }}>
              Join Waitlist
            </button>
            <button onClick={() => scrollTo("how")} style={{ fontFamily: fonts, fontSize: 15, fontWeight: 500, backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "14px 28px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; e.target.style.color = C.white; }} onMouseLeave={(e) => { e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; e.target.style.color = "rgba(255,255,255,0.8)"; }}>
              See How It Works
            </button>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 48, flexWrap: "wrap" }}>
            {[{ val: "81+", label: "restaurants" }, { val: "100%", label: "platonic" }, { val: "Check in", label: "& match" }].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 999, padding: "8px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: fontSerif, fontSize: 16, color: C.coral, fontWeight: 400 }}>{s.val}</span>
                <span style={{ fontFamily: fonts, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual card stack */}
        <div style={{ position: "relative" }}>
          <div style={{ backgroundColor: C.white, borderRadius: 20, padding: 28, boxShadow: "0 24px 80px rgba(0,0,0,0.3)", transform: "rotate(2deg)", position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: C.stone, marginBottom: 16 }}>New match found</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" alt="Sarah K." style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: fonts, fontWeight: 600, fontSize: 17, color: C.midnight }}>Sarah K.</div>
                <div style={{ fontFamily: fonts, fontSize: 13, color: C.stone }}>Main Course · 4.9★ · 15 tables shared</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {["Italian", "Sushi", "Wine", "Foodie", "Casual"].map((t) => (
                <span key={t} style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 500, backgroundColor: C.coralLight, color: C.coralDark, borderRadius: 999, padding: "4px 10px" }}>{t}</span>
              ))}
            </div>
            <div style={{ backgroundColor: C.snow, borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <IonIcon name="sparkles-outline" size={20} color={C.amber} />
              <div>
                <div style={{ fontFamily: fonts, fontWeight: 600, fontSize: 13, color: C.midnight }}>You both want to try Girl & The Goat</div>
                <div style={{ fontFamily: fonts, fontSize: 12, color: C.stone }}>West Loop · $$ · Contemporary American</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={{ flex: 1, fontFamily: fonts, fontSize: 14, fontWeight: 600, backgroundColor: C.coral, color: C.white, border: "none", borderRadius: 12, padding: "12px 0", cursor: "pointer" }}>Share a Table</button>
              <button style={{ fontFamily: fonts, fontSize: 14, fontWeight: 500, backgroundColor: C.cloud, color: C.slate, border: "none", borderRadius: 12, padding: "12px 20px", cursor: "pointer" }}>Later</button>
            </div>
          </div>
          <div style={{ position: "absolute", top: -12, left: 16, right: -16, bottom: 12, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", transform: "rotate(-1deg)", zIndex: 1 }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════
function HowItWorks() {
  const steps = [
    { num: "01", title: "Discover & Check In", desc: "Browse For You, Trending, and Explore. Add spots to your lists. When you arrive, check in — you'll appear to others dining nearby.", icon: "location-outline" },
    { num: "02", title: "Match & Message", desc: "See who's dining at the same restaurant or nearby. Send a table-share request. Our AI suggests spots that work for you both.", icon: "flash-outline" },
    { num: "03", title: "Share a Table", desc: "Plan dinner together, book a reservation through OpenTable or Resy, or join the waitlist. Meet at the restaurant and enjoy a great meal.", icon: "people-outline" },
    { num: "04", title: "Rate & Return", desc: "When you check out, rate your experience. Tap 'Book next visit' to reserve again. Earn points for every shared meal.", icon: "star-outline" },
  ];

  return (
    <Section id="how" bg={C.snow}>
      <SectionLabel>How It Works</SectionLabel>
      <SectionTitle>Four steps to your next great dinner.</SectionTitle>
      <SectionSubtitle>No awkward meetups. No complicated setup. Just real people sharing real meals at real restaurants.</SectionSubtitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {steps.map((step) => (
          <div key={step.num} style={{ backgroundColor: C.white, borderRadius: 16, padding: 28, border: `1px solid ${C.cloud}`, transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IonIcon name={step.icon} size={22} color={C.coral} />
              </div>
              <span style={{ fontFamily: fontMono, fontSize: 12, fontWeight: 500, color: C.mist }}>{step.num}</span>
            </div>
            <div style={{ fontFamily: fonts, fontWeight: 700, fontSize: 16, color: C.midnight, marginBottom: 10 }}>{step.title}</div>
            <div style={{ fontFamily: fonts, fontSize: 14, color: C.stone, lineHeight: 1.55 }}>{step.desc}</div>
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
  const features = [
    { title: "Check In & Discover", desc: "Check in where you dine. Browse For You, Trending, and Explore. See who's dining nearby and view diner photos at each restaurant.", icon: "location-outline", color: C.coral, bg: C.coralLight },
    { title: "Smart Matching", desc: "Paired by cuisine taste, dining style, and conversation interests. Send table-share requests to nearby diners or browse matches.", icon: "people-outline", color: C.slate, bg: C.cloud },
    { title: "OpenTable & Resy Booking", desc: "Book tables through OpenTable and Resy right inside the app. Modify dates and times, join the waitlist, and get notified when your table is ready.", icon: "calendar-outline", color: C.sage, bg: C.sageLight },
    { title: "Post-Meal Ratings", desc: "Rate restaurants after you check out. Earn points for feedback. One tap to book your next visit at the same spot.", icon: "star-outline", color: C.amber, bg: "#FFF8EB" },
    { title: "Dining Lists & Table Alerts", desc: 'Save spots to "Want to Try" lists. Get notified when someone wants to share a table at a restaurant you saved.', icon: "list-outline", color: C.sage, bg: C.sageLight },
    { title: "Seat at the Table Rewards", desc: "Earn points for check-ins, shared meals, and ratings. Level up from First Course to Chef's Table for exclusive perks.", icon: "trophy-outline", color: C.amber, bg: "#FFF8EB" },
  ];

  return (
    <Section id="features" bg={C.white}>
      <SectionLabel>Features</SectionLabel>
      <SectionTitle>Everything you need to dine socially.</SectionTitle>
      <SectionSubtitle>Built for people who love restaurants but want someone great to share them with.</SectionSubtitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {features.map((f) => (
          <div key={f.title} style={{ backgroundColor: C.snow, borderRadius: 16, padding: 28, border: `1px solid ${C.cloud}`, transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <IonIcon name={f.icon} size={24} color={f.color} />
            </div>
            <div style={{ fontFamily: fonts, fontWeight: 700, fontSize: 16, color: C.midnight, marginBottom: 10 }}>{f.title}</div>
            <div style={{ fontFamily: fonts, fontSize: 14, color: C.stone, lineHeight: 1.55 }}>{f.desc}</div>
          </div>
        ))}
      </div>
      {/* Integration partners strip */}
      <div style={{ marginTop: 48, padding: "28px 36px", backgroundColor: C.snow, borderRadius: 16, border: `1px solid ${C.cloud}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IonIcon name="link-outline" size={18} color={C.stone} />
          <span style={{ fontFamily: fontMono, fontSize: 11, color: C.stone, textTransform: "uppercase", letterSpacing: "0.1em" }}>Integrated with</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#DA3743" }} />
          <span style={{ fontFamily: fonts, fontSize: 16, fontWeight: 700, color: C.midnight }}>OpenTable</span>
        </div>
        <div style={{ width: 1, height: 24, backgroundColor: C.cloud }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#C3272B" }} />
          <span style={{ fontFamily: fonts, fontSize: 16, fontWeight: 700, color: C.midnight }}>Resy</span>
        </div>
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
    { val: "$2K–6K", label: "monthly incremental revenue", desc: "Projected per-restaurant monthly revenue from TableShare-driven covers at average check sizes." },
    { val: "Zero", label: "effort to start", desc: "We integrate with OpenTable and Resy. No hardware, no training, no menu changes. Just more diners." },
  ];
  const tiers = [
    { name: "Passive", desc: "We list you. Diners find you. You do nothing.", tag: "Most restaurants start here" },
    { name: "Active Availability", desc: "Share off-peak availability via OpenTable or Resy. We fill empty tables with matched diners.", tag: "Best ROI" },
    { name: "Integrated", desc: "Deep integration with your POS. Real-time table matching and analytics.", tag: "Coming Q3 2026" },
  ];

  return (
    <Section id="restaurants" bg={C.midnight} style={{ padding: "80px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <SectionLabel light>For Restaurants</SectionLabel>
          <SectionTitle light>Zero risk. Zero effort. New revenue.</SectionTitle>
          <p style={{ fontFamily: fonts, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 40px" }}>
            We're not competing for your existing diners — we're creating new ones. Every TableShare match generates covers your restaurant wouldn't have had otherwise. That's not market share redistribution. That's market creation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {benefits.map((b) => (
              <div key={b.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontFamily: fontSerif, fontSize: 28, color: C.coral, minWidth: 110, lineHeight: 1 }}>{b.val}</div>
                <div>
                  <div style={{ fontFamily: fonts, fontWeight: 600, fontSize: 14, color: C.white, marginBottom: 4 }}>{b.label}</div>
                  <div style={{ fontFamily: fonts, fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: fonts, fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>Partnership Tiers</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tiers.map((tier, i) => (
              <div key={tier.name} style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.06)", transition: "background-color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontFamily: fonts, fontWeight: 700, fontSize: 16, color: C.white }}>{tier.name}</div>
                  <span style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 500, color: i === 1 ? C.coral : "rgba(255,255,255,0.3)", backgroundColor: i === 1 ? "rgba(232,87,61,0.12)" : "rgba(255,255,255,0.04)", borderRadius: 999, padding: "3px 10px" }}>{tier.tag}</span>
                </div>
                <div style={{ fontFamily: fonts, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{tier.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollTo("waitlist")} style={{ fontFamily: fonts, fontSize: 14, fontWeight: 600, backgroundColor: "rgba(255,255,255,0.08)", color: C.white, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "13px 28px", cursor: "pointer", marginTop: 24, transition: "all 0.2s", width: "100%", textAlign: "center" }} onMouseEnter={(e) => { e.target.style.backgroundColor = C.coral; e.target.style.borderColor = C.coral; }} onMouseLeave={(e) => { e.target.style.backgroundColor = "rgba(255,255,255,0.08)"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}>
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
          <p style={{ fontFamily: fonts, fontSize: 16, color: C.slate, lineHeight: 1.7, margin: "0 0 24px" }}>
            TableShare started with a simple observation: over 40% of American households are single-person. Millions of people love dining out but don't always have someone to go with. Meanwhile, restaurants have empty tables they'd love to fill.
          </p>
          <p style={{ fontFamily: fonts, fontSize: 16, color: C.slate, lineHeight: 1.7, margin: "0 0 24px" }}>
            We're building the social layer for dining — not a dating app, not a reservation tool, but the thing that gives you a reason to make the reservation in the first place. With direct integration to OpenTable and Resy, booking is seamless.
          </p>
          <p style={{ fontFamily: fonts, fontSize: 16, color: C.slate, lineHeight: 1.7, margin: 0 }}>
            Launching in Chicago in 2026. Currently raising a $750K seed round to bring great meals and great company together at scale.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { title: "Human Connection", desc: "Technology should bring people together, not keep them on their phones. Every feature we build starts with the question: does this lead to a better dinner?", icon: "heart-outline" },
            { title: "Safety First", desc: "Photo verification, public venue meetings only, companion ratings, and report tools. We take trust seriously so you don't have to worry.", icon: "shield-checkmark-outline" },
            { title: "Restaurant Partners", desc: "We succeed when restaurants succeed. Zero risk, zero effort — just new diners who are excited to be there.", icon: "handshake-outline" },
          ].map((v) => (
            <div key={v.title} style={{ backgroundColor: C.white, borderRadius: 16, padding: 24, border: `1px solid ${C.cloud}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IonIcon name={v.icon} size={22} color={C.coral} />
              </div>
              <div>
                <div style={{ fontFamily: fonts, fontWeight: 700, fontSize: 15, color: C.midnight, marginBottom: 6 }}>{v.title}</div>
                <div style={{ fontFamily: fonts, fontSize: 14, color: C.stone, lineHeight: 1.55 }}>{v.desc}</div>
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

  const handleSubmit = (requestType) => { if (email.includes("@")) setSubmitted(requestType || "waitlist"); };

  return (
    <Section id="waitlist" bg={C.white} style={{ padding: "80px 0 0" }}>
      <div style={{ background: `linear-gradient(160deg, ${C.midnight} 0%, #1F3044 40%, ${C.slate} 100%)`, borderRadius: 24, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,87,61,0.06) 0%, transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: C.coral, marginBottom: 16 }}>Coming to Chicago · 2026</div>
          <h2 style={{ fontFamily: fontSerif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: C.white, margin: "0 0 16px", lineHeight: 1.15 }}>Ready to share a table?</h2>
          <p style={{ fontFamily: fonts, fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 auto 36px", maxWidth: 460 }}>
            Join the waitlist for launch updates, or request early access to try TableShare on TestFlight. Whether you're a diner looking for company or a restaurant looking for new covers, we'd love to have you.
          </p>
          {!submitted ? (
            <>
              <div style={{ display: "inline-flex", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 999, padding: 4, marginBottom: 24 }}>
                {[{ id: "diner", label: "I'm a Diner" }, { id: "restaurant", label: "I'm a Restaurant" }].map((t) => (
                  <button key={t.id} onClick={() => setType(t.id)} style={{ fontFamily: fonts, fontSize: 13, fontWeight: type === t.id ? 600 : 400, backgroundColor: type === t.id ? C.coral : "transparent", color: type === t.id ? C.white : "rgba(255,255,255,0.5)", border: "none", borderRadius: 999, padding: "9px 22px", cursor: "pointer", transition: "all 0.2s" }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }}>
                <input type="email" placeholder={type === "diner" ? "your@email.com" : "restaurant@email.com"} value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit("waitlist")} style={{ flex: 1, fontFamily: fonts, fontSize: 15, backgroundColor: "rgba(255,255,255,0.08)", color: C.white, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 18px", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => (e.target.style.borderColor = "rgba(232,87,61,0.5)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")} />
                <button onClick={() => handleSubmit("waitlist")} style={{ fontFamily: fonts, fontSize: 15, fontWeight: 600, backgroundColor: C.coral, color: C.white, border: "none", borderRadius: 12, padding: "14px 28px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.target.style.backgroundColor = C.coralDark; }} onMouseLeave={(e) => { e.target.style.backgroundColor = C.coral; }}>
                  Join Waitlist
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 20 }}>
                <div style={{ height: 1, width: 40, backgroundColor: "rgba(255,255,255,0.1)" }} />
                <button onClick={() => handleSubmit("testflight")} style={{ fontFamily: fonts, fontSize: 13, fontWeight: 500, backgroundColor: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "8px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                  <IonIcon name="logo-apple" size={14} />
                  Request TestFlight Access
                </button>
                <div style={{ height: 1, width: 40, backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>Free. No spam. Early access when we launch.</div>
            </>
          ) : (
            <div>
              <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(46,139,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <IonIcon name="checkmark-outline" size={32} color={C.sage} />
              </div>
              <div style={{ fontFamily: fontSerif, fontSize: 24, color: C.white, marginBottom: 8 }}>
                {submitted === "testflight" ? "TestFlight request received!" : "You're on the list!"}
              </div>
              <div style={{ fontFamily: fonts, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
                {submitted === "testflight" ? "We'll send a TestFlight invite to your email shortly." : "We'll be in touch when we launch in Chicago."}
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
    <footer style={{ backgroundColor: C.midnight, padding: "48px 0 32px", borderTop: `1px solid rgba(255,255,255,0.04)` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: C.coral, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IonIcon name="restaurant-outline" size={16} color={C.white} />
          </div>
          <span style={{ fontFamily: fontSerif, fontSize: 17, color: "rgba(255,255,255,0.6)" }}>TableShare</span>
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 TableShare, Inc. · Chicago, IL</div>
        <div style={{ display: "flex", gap: 24 }}>
          {[{ label: "Instagram", icon: "logo-instagram" }, { label: "Twitter", icon: "logo-twitter" }, { label: "LinkedIn", icon: "logo-linkedin" }].map((s) => (
            <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts, fontSize: 13, color: "rgba(255,255,255,0.35)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.coral)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              <IonIcon name={s.icon} size={16} />
              {s.label}
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
    <div style={{ fontFamily: fonts, backgroundColor: C.white, color: C.midnight, minHeight: "100vh", margin: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
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
