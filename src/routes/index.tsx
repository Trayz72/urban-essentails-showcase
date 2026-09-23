import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  Check,
  Copy,
  Download,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "../assets/ue-hero-still-life.jpg";
import sipperImage from "../assets/ue-sipper-editorial.jpg";
import diningImage from "../assets/ue-dining-editorial.jpg";
import conceptA from "../assets/urban-essentials-logo-concept-a.png";
import conceptB from "../assets/urban-essentials-logo-concept-b.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "URBAN ESSENTIALS — Brand Guidelines" },
      {
        name: "description",
        content:
          "The official identity system for URBAN ESSENTIALS — luxury in the everyday.",
      },
      { property: "og:title", content: "URBAN ESSENTIALS — Brand Guidelines" },
      {
        property: "og:description",
        content: "A refined identity for objects of everyday distinction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandGuidelines,
});

const sections = [
  ["01", "Foundation", "foundation"],
  ["02", "Logo system", "logo"],
  ["03", "Construction", "construction"],
  ["04", "Colour", "colour"],
  ["05", "Typography", "typography"],
  ["06", "Voice", "voice"],
  ["07", "Photography", "photography"],
  ["08", "Application", "application"],
] as const;

const palette = [
  { name: "Deep Espresso", hex: "#241A16", rgb: "36 26 22", cmyk: "0 28 39 86", pantone: "Black 4 C", usage: "20%", className: "bg-espresso text-ivory" },
  { name: "Warm Ivory", hex: "#F4F0E8", rgb: "244 240 232", cmyk: "0 2 5 4", pantone: "7527 C", usage: "70%", className: "bg-ivory text-espresso" },
  { name: "Warm Taupe", hex: "#A69686", rgb: "166 150 134", cmyk: "0 10 19 35", pantone: "7530 C", usage: "4%", className: "bg-taupe text-espresso" },
  { name: "Architectural Stone", hex: "#C9C2B8", rgb: "201 194 184", cmyk: "0 3 8 21", pantone: "Warm Gray 3 C", usage: "3%", className: "bg-stone text-espresso" },
  { name: "Champagne", hex: "#B89B6A", rgb: "184 155 106", cmyk: "0 16 42 28", pantone: "872 C*", usage: "3%", className: "bg-champagne text-espresso" },
  { name: "Urban Graphite", hex: "#383735", rgb: "56 55 53", cmyk: "0 2 5 78", pantone: "Black 7 C", usage: "Optional", className: "bg-graphite text-ivory" },
] as const;

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 180" role="img" aria-label="UE monogram">
      {/* U — thick stems, thin transitional curve. No overlap with the E. */}
      <path d="M22 22v86c0 33 11 50 27 50s27-17 27-50V22" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="butt" />
      {/* E — thick stem, high-contrast hairline bars */}
      <path d="M100 22v136" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="butt" />
      <path d="M100 26h38M100 90h29M100 154h38" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="butt" />
    </svg>
  );
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "wordmark wordmark-compact" : "wordmark"}>
      <span>URBAN</span><span>ESSENTIALS</span>
    </div>
  );
}

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-button"
      aria-label={`Copy ${value}`}
      title={`Copy ${value}`}
      onClick={() => {
        void navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function BrandGuidelines() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoMode, setLogoMode] = useState<"light" | "dark" | "metal">("light");

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const exportPdf = () => window.print();

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <header className="site-header">
        <a href="#top" className="brand-link" aria-label="URBAN ESSENTIALS home">
          <Monogram className="header-monogram" />
          <Wordmark compact />
        </a>
        <div className="header-actions">
          <span className="edition">BRAND GUIDELINES · 2026</span>
          <button className="text-button export-button" type="button" onClick={exportPdf}>
            <Download size={15} /> Export PDF
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open contents" title="Contents">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className={`menu-panel ${menuOpen ? "menu-panel-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="icon-button menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close contents"><X size={20} /></button>
        <p className="micro-label">CONTENTS</p>
        <nav>{sections.map(([n, label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>{n}</span>{label}</a>)}</nav>
        <p className="menu-note">URBAN ESSENTIALS<br />Identity system · Edition 01</p>
      </div>

      <section id="top" className="hero">
        <img src={heroImage} alt="Premium everyday objects arranged on travertine" width={1920} height={1280} />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-kicker">BRAND IDENTITY · EDITION 01</p>
          <h1><span>URBAN</span><span>ESSENTIALS</span></h1>
          <div className="hero-footer"><p>Luxury in the Everyday.</p><a href="#foundation" aria-label="Begin reading"><ArrowDown size={19} /></a></div>
        </div>
      </section>

      <section id="foundation" className="section section-ivory">
        <Label number="01">Foundation</Label>
        <div className="intro-grid reveal">
          <h2>Ordinary objects.<br /><em>Extraordinary presence.</em></h2>
          <div className="body-copy">
            <p className="lead">URBAN ESSENTIALS elevates the objects that quietly shape modern life.</p>
            <p>From morning coffee to a considered table, from water at the desk to lunch in transit—every interaction is an opportunity for better design, finer materials and more deliberate living.</p>
            <p>We create objects of everyday distinction: purposeful in function, architectural in form and enduring in character.</p>
          </div>
        </div>
        <div className="principles-grid">
          {[
            ["01", "Considered", "Nothing exists without purpose."],
            ["02", "Architectural", "Form, balance and proportion lead."],
            ["03", "Tactile", "Materials are felt before explained."],
            ["04", "Enduring", "Designed beyond seasons and trends."],
          ].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="manifesto-band">
          <p className="micro-label">THE MANIFESTO</p>
          <blockquote>Luxury is not reserved for occasions.<br />It lives in the ritual, the object,<br />the detail held every day.</blockquote>
          <p>Designed for modern living. Made to be noticed quietly.</p>
        </div>
      </section>

      <section id="logo" className="section section-espresso">
        <Label number="02">Logo system</Label>
        <div className="section-title-row">
          <h2>A signature of<br /><em>quiet confidence.</em></h2>
          <p>The identity balances editorial contrast with architectural structure. Concept A is the recommended direction: expressive enough to own, disciplined enough to engrave.</p>
        </div>

        <div className="concept-grid">
          <article className="concept recommended">
            <div className="concept-tag">RECOMMENDED · A</div>
            <img src={conceptA} alt="Recommended interlocking UE logo concept" loading="lazy" width={1536} height={1024} />
            <h3>Interlocking Signature</h3><p>A fluid U crosses the E with one controlled gesture—an expression of utility elevated by elegance.</p>
          </article>
          <article className="concept">
            <div className="concept-tag">ALTERNATE · B</div>
            <img src={conceptB} alt="Architectural UE logo concept" loading="lazy" width={1536} height={1024} />
            <h3>Architectural Portal</h3><p>A precise, enclosed construction inspired by façades, thresholds and the geometry of the city.</p>
          </article>
        </div>

        <div className="logo-stage-wrap">
          <div className="segmented" aria-label="Logo treatment">
            {(["light", "dark", "metal"] as const).map((mode) => <button key={mode} type="button" className={logoMode === mode ? "active" : ""} onClick={() => setLogoMode(mode)}>{mode === "metal" ? "Champagne" : mode}</button>)}
          </div>
          <div className={`logo-stage logo-stage-${logoMode}`}>
            <Monogram className="stage-monogram" /><Wordmark />
          </div>
        </div>

        <div className="monogram-directions">
          {[
            ["01", "Interlocking", "A continuous, expressive relationship."],
            ["02", "Architectural", "A structural urban portal."],
            ["03", "Editorial", "High-contrast fashion proportions."],
            ["04", "Minimal", "Reduced for 8 mm applications."],
          ].map(([n, title, copy], i) => <article key={n} className={i === 0 ? "selected" : ""}><div className={`mini-mark mini-mark-${i}`}><Monogram /></div><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section id="construction" className="section section-paper">
        <Label number="03">Construction & usage</Label>
        <div className="construction-layout">
          <div><h2>Built on<br /><em>proportion.</em></h2><p className="lead">A disciplined geometry keeps every expression recognisable—from a 6 mm base stamp to a full architectural façade.</p></div>
          <div className="grid-diagram">
            <div className="grid-lines" />
            <Monogram />
            <span className="measure measure-x">1X</span><span className="measure measure-y">4.5X</span>
          </div>
        </div>
        <div className="spec-row">
          <div><span>WORDMARK RATIO</span><strong>8.4 : 1</strong><p>Never alter the fixed relationship.</p></div>
          <div><span>CLEAR SPACE</span><strong>1 × U</strong><p>Minimum on every outer edge.</p></div>
          <div><span>PRINT MINIMUM</span><strong>24 mm</strong><p>Monogram alone: 6 mm.</p></div>
          <div><span>DIGITAL MINIMUM</span><strong>140 px</strong><p>Monogram alone: 20 px.</p></div>
        </div>
        <div className="lockups">
          <article><p className="micro-label">01 · HORIZONTAL</p><div className="horizontal-lockup"><Monogram /><Wordmark compact /></div></article>
          <article><p className="micro-label">02 · STACKED</p><div className="stacked-lockup"><Monogram /><Wordmark compact /></div></article>
          <article><p className="micro-label">03 · SYMBOL</p><Monogram className="symbol-lockup" /></article>
        </div>
        <div className="donts">
          <p className="micro-label">LOGO MISUSE</p><h3>Preserve the signature.</h3>
          <div className="dont-grid">
            {["Do not stretch", "Do not rotate", "Do not add shadows", "Do not outline", "Do not recolour", "Avoid noisy fields"].map((item, i) => <div key={item} className={`dont dont-${i}`}><X size={18} /><Wordmark compact /><span>{item}</span></div>)}
          </div>
        </div>
      </section>

      <section id="colour" className="section section-ivory">
        <Label number="04">Colour system</Label>
        <div className="section-title-row dark-copy"><h2>Understated<br /><em>by design.</em></h2><p>Warm neutrals create a tactile, residential foundation. Deep Espresso carries authority. Champagne appears only as a material accent—not decoration.</p></div>
        <div className="palette-grid">
          {palette.map((c) => <article className={`swatch ${c.className}`} key={c.name}>
            <div><span className="usage">{c.usage}</span><h3>{c.name}</h3></div>
            <dl><div><dt>HEX</dt><dd>{c.hex}<CopyValue value={c.hex} /></dd></div><div><dt>RGB</dt><dd>{c.rgb}</dd></div><div><dt>CMYK</dt><dd>{c.cmyk}</dd></div><div><dt>PANTONE</dt><dd>{c.pantone}</dd></div></dl>
          </article>)}
        </div>
        <div className="ratio-bar" aria-label="Colour usage: 70% ivory, 20% espresso, 7% taupe and stone, 3% champagne"><span className="ratio-ivory" /><span className="ratio-espresso" /><span className="ratio-neutral" /><span className="ratio-champagne" /></div>
        <div className="ratio-labels"><span>70 · Warm Ivory</span><span>20 · Deep Espresso</span><span>7 · Neutrals</span><span>3 · Champagne</span></div>
        <p className="footnote">* Metallic Pantone references are starting points only. Approve physical drawdowns against the selected substrate and finish.</p>
      </section>

      <section id="typography" className="section section-type">
        <Label number="05">Typography</Label>
        <div className="type-showcase"><span className="type-index">Aa</span><h2>Poise meets<br /><em>precision.</em></h2><p>Instrument Serif brings editorial contrast to key moments. Manrope provides quiet, exacting clarity everywhere else.</p></div>
        <div className="type-specimens">
          <article className="serif-spec"><div><p>DISPLAY · INSTRUMENT SERIF</p><span>Regular / Italic</span></div><strong>Luxury in the<br /><em>Everyday.</em></strong></article>
          <article className="sans-spec"><div><p>UTILITY · MANROPE</p><span>Regular / Medium / Semibold</span></div><strong>PREMIUM<br />EVERYDAY<br />OBJECTS</strong></article>
        </div>
        <div className="type-scale">
          {[
            ["Display 01", "72 / 72", "Luxury, made essential."],
            ["Display 02", "48 / 50", "Objects of distinction."],
            ["Heading", "28 / 34", "Designed for modern living."],
            ["Body", "16 / 26", "A considered collection for everyday rituals."],
            ["Label", "11 / 16 · +0.18em", "MATERIAL · CAPACITY · CARE"],
          ].map(([name, size, sample]) => <div key={name}><span>{name}<small>{size}</small></span><p>{sample}</p></div>)}
        </div>
        <div className="type-rules"><p><strong>Case</strong> Sentence case for editorial language. Uppercase only for labels and the logo.</p><p><strong>Spacing</strong> Display: 0. Utility labels: +0.12–0.18em. Never force tracked body copy.</p><p><strong>Numbers</strong> Manrope Medium with tabular figures for price, dimensions and specifications.</p></div>
      </section>

      <section id="voice" className="section section-espresso">
        <Label number="06">Verbal identity</Label>
        <div className="voice-lead"><h2>Say less.<br /><em>Mean more.</em></h2><p>Our voice is confident, intelligent and composed. It never shouts, overclaims or reaches for status. The object and its details do the persuading.</p></div>
        <div className="voice-columns">
          <article><p className="micro-label">WE ARE</p>{["Assured, not arrogant", "Precise, not clinical", "Aspirational, not distant", "Sensory, not sentimental", "Minimal, never empty"].map(x => <div className="voice-line" key={x}><Check size={14} /><span>{x}</span></div>)}</article>
          <article><p className="micro-label">WE NEVER SAY</p>{["Best price", "Buy now", "Amazing quality", "Unbeatable offer", "Must-have deal"].map(x => <div className="voice-line avoid" key={x}><X size={14} /><span>{x}</span></div>)}</article>
        </div>
        <div className="phrase-wall"><span>Designed for the everyday.</span><span>Made to be noticed.</span><span>Elevate the ordinary.</span><span>Objects of everyday distinction.</span><span>Luxury, made essential.</span></div>
        <div className="copy-examples">
          <article><p className="micro-label">PRODUCT DESCRIPTION</p><h3>The Arc Tumbler</h3><p>Double-walled steel, resolved in a quiet silhouette. Cool to the touch. Considered in the hand. Designed to move through the day without interruption.</p></article>
          <article><p className="micro-label">SOCIAL</p><h3>Morning, reconsidered.</h3><p>The Ritual Cup in Warm Ivory. A precise form for the first hour of the day.</p><span>#UrbanEssentials · #EverydayDistinction</span></article>
          <article><p className="micro-label">DIGITAL</p><h3>Objects for modern living.</h3><p>Explore considered forms, tactile materials and details designed to endure.</p><span>DISCOVER THE COLLECTION →</span></article>
        </div>
      </section>

      <section id="photography" className="section section-photography">
        <Label number="07">Photography direction</Label>
        <div className="photo-intro"><h2>Light. Material.<br /><em>Atmosphere.</em></h2><p>Every image should feel observed, not arranged. We borrow from architecture, hospitality and fashion—not conventional product catalogues.</p></div>
        <div className="photo-grid">
          <figure className="photo-main"><img src={diningImage} alt="Editorial dining setting in warm architectural light" loading="lazy" width={1600} height={1200} /><figcaption>01 · HOSPITALITY / NATURAL DIRECTIONAL LIGHT</figcaption></figure>
          <figure className="photo-tall"><img src={sipperImage} alt="Espresso sipper in dramatic side light" loading="lazy" width={1280} height={1600} /><figcaption>02 · PRODUCT / CONTROLLED SHADOW</figcaption></figure>
        </div>
        <div className="photo-rules">
          <article><p className="micro-label">LIGHT</p><h3>Sculpt with restraint.</h3><p>Use directional window light, soft side light, controlled highlights and deliberate shadows. Occasional hard sun is reserved for campaign work.</p></article>
          <article><p className="micro-label">SURFACE</p><h3>Let materials speak.</h3><p>Warm plaster, travertine, marble, dark wood, concrete, linen and brushed metal. Patina is welcome; clutter is not.</p></article>
          <article><p className="micro-label">COMPOSITION</p><h3>Build in space.</h3><p>Architectural lines, asymmetry and generous negative space. Crop with intent and leave room for editorial typography.</p></article>
          <article className="avoid-photo"><p className="micro-label">AVOID</p><h3>Never feel catalogued.</h3><p>No flat white-box lighting, uncontrolled flash, oversaturation, busy props, fake reflections, excessive garnish or generic gift styling.</p></article>
        </div>
      </section>

      <section id="application" className="section section-ivory">
        <Label number="08">Application</Label>
        <div className="section-title-row dark-copy"><h2>Identity,<br /><em>made tangible.</em></h2><p>The identity earns its value in material execution. Quiet placement, generous space and tactile finishes turn the system into an experience.</p></div>
        <div className="application-grid">
          <div className="box-mockup"><div className="box-top"><Monogram /></div><div className="box-side"><Wordmark compact /><span>THE RITUAL COLLECTION</span></div></div>
          <div className="bag-mockup"><Monogram /><Wordmark compact /><span>NEW DELHI · INDIA</span></div>
          <div className="seal-mockup"><Monogram /><span>UE</span></div>
          <div className="plate-mockup"><div><Monogram /></div><span>BLIND EMBOSS · 12 MM</span></div>
        </div>
        <div className="application-specs">
          <article><span>PACKAGING</span><h3>Uncoated, tactile, restrained.</h3><p>Warm ivory or espresso rigid board. Blind emboss first; champagne foil only for limited emphasis. Avoid gloss lamination and oversized branding.</p></article>
          <article><span>PRODUCT MARKING</span><h3>Discovered, not displayed.</h3><p>Place the monogram on bases, lids or quiet faces. Laser engraving: 8–14 mm. Ceramic emboss: minimum 10 mm with generous relief.</p></article>
          <article><span>DIGITAL</span><h3>Space is part of the identity.</h3><p>Use editorial crops, clear hierarchy and measured transitions. Never use urgency mechanics, crowded banners or promotional colour floods.</p></article>
        </div>
      </section>

      <footer>
        <div><Monogram /><Wordmark compact /></div><p>Luxury in the Everyday.</p><p className="micro-label">BRAND GUIDELINES · EDITION 01 · 2026</p>
      </footer>
    </main>
  );
}