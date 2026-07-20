// Inline SVG flag data for the ScanContext language dropdown.
// Each value is the *inner* markup only (no <svg> wrapper) sized for a
// `viewBox="0 0 24 18"` canvas. The wrapping <svg class="sc-flag" ...>
// element is produced by flagSvg() in i18n.js.
//
// Flags are simplified, recognizable public-domain forms — not
// heraldically exact. No external assets, no build step (CSP-safe).
window.SC_FLAGS = {
  // Germany: black/red/gold horizontal triband
  de: '<rect width="24" height="6" y="0" fill="#000"/><rect width="24" height="6" y="6" fill="#dd0000"/><rect width="24" height="6" y="12" fill="#ffce00"/>',

  // Serbia (used by sr + sr-Latn): red/blue/white triband.
  // The ћ/č badge is drawn separately by i18n.js — no letter baked in here.
  rs: '<rect width="24" height="6" y="0" fill="#c6363c"/><rect width="24" height="6" y="6" fill="#0c4076"/><rect width="24" height="6" y="12" fill="#fff"/>',

  // UK (English) — simplified Union flag
  gb: '<rect width="24" height="18" fill="#012169"/><path d="M0 0l24 18M24 0L0 18" stroke="#fff" stroke-width="3.5"/><path d="M0 0l24 18M24 0L0 18" stroke="#c8102e" stroke-width="1.6"/><path d="M12 0v18M0 9h24" stroke="#fff" stroke-width="5"/><path d="M12 0v18M0 9h24" stroke="#c8102e" stroke-width="2.6"/>',

  // Bulgaria: white/green/red horizontal triband
  bg: '<rect width="24" height="6" y="0" fill="#fff"/><rect width="24" height="6" y="6" fill="#00966e"/><rect width="24" height="6" y="12" fill="#d62612"/>',

  // Bosnia and Herzegovina: blue field, yellow triangle, white stars
  ba: '<rect width="24" height="18" fill="#002395"/><path d="M0 0L16 0L4 18L0 18Z" fill="#fecb00"/>' +
    '<circle cx="6" cy="2" r="0.9" fill="#fff"/><circle cx="8.2" cy="5" r="0.9" fill="#fff"/>' +
    '<circle cx="10.4" cy="8" r="0.9" fill="#fff"/><circle cx="12.6" cy="11" r="0.9" fill="#fff"/>' +
    '<circle cx="14.8" cy="14" r="0.9" fill="#fff"/><circle cx="17" cy="17" r="0.9" fill="#fff"/>',

  // Greece: blue/white stripes with a canton (simplified, no cross detail)
  gr: '<rect width="24" height="18" fill="#0d5eaf"/>' +
    '<rect width="24" height="2" y="2" fill="#fff"/><rect width="24" height="2" y="6" fill="#fff"/>' +
    '<rect width="24" height="2" y="10" fill="#fff"/><rect width="24" height="2" y="14" fill="#fff"/>' +
    '<rect width="10" height="10" x="0" y="0" fill="#0d5eaf"/>' +
    '<rect width="10" height="2" x="0" y="4" fill="#fff"/><rect width="2" height="10" x="4" y="0" fill="#fff"/>',

  // Spain: red/yellow/red horizontal, 1:2:1 (crest omitted)
  es: '<rect width="24" height="18" fill="#aa151b"/><rect width="24" height="9" y="4.5" fill="#f1bf00"/>',

  // France: blue/white/red vertical triband
  fr: '<rect width="8" height="18" x="0" fill="#0055a4"/><rect width="8" height="18" x="8" fill="#fff"/><rect width="8" height="18" x="16" fill="#ef4135"/>',

  // Croatia: red/white/blue horizontal with a simplified checkerboard square
  hr: '<rect width="24" height="6" y="0" fill="#ff0000"/><rect width="24" height="6" y="6" fill="#fff"/><rect width="24" height="6" y="12" fill="#171796"/>' +
    '<rect width="6" height="4.5" x="9" y="6.75" fill="#fff"/>' +
    '<rect width="1.5" height="1.5" x="9" y="6.75" fill="#ff0000"/><rect width="1.5" height="1.5" x="12" y="6.75" fill="#ff0000"/>' +
    '<rect width="1.5" height="1.5" x="10.5" y="8.25" fill="#ff0000"/><rect width="1.5" height="1.5" x="13.5" y="8.25" fill="#ff0000"/>' +
    '<rect width="1.5" height="1.5" x="9" y="9.75" fill="#ff0000"/><rect width="1.5" height="1.5" x="12" y="9.75" fill="#ff0000"/>',

  // Italy: green/white/red vertical triband
  it: '<rect width="8" height="18" x="0" fill="#009246"/><rect width="8" height="18" x="8" fill="#fff"/><rect width="8" height="18" x="16" fill="#ce2b37"/>',

  // Netherlands: red/white/blue horizontal triband
  nl: '<rect width="24" height="6" y="0" fill="#ae1c28"/><rect width="24" height="6" y="6" fill="#fff"/><rect width="24" height="6" y="12" fill="#21468b"/>',

  // Poland: white/red horizontal
  pl: '<rect width="24" height="9" y="0" fill="#fff"/><rect width="24" height="9" y="9" fill="#dc143c"/>',

  // Portugal: green/red vertical, 2:3, with a simple dot for the arms
  pt: '<rect width="9.6" height="18" x="0" fill="#046a38"/><rect width="14.4" height="18" x="9.6" fill="#da291c"/><circle cx="9.6" cy="9" r="2.6" fill="#ffce00"/>',

  // Romania: blue/yellow/red vertical triband
  ro: '<rect width="8" height="18" x="0" fill="#002b7f"/><rect width="8" height="18" x="8" fill="#fcd116"/><rect width="8" height="18" x="16" fill="#ce1126"/>',

  // Russia: white/blue/red horizontal triband
  ru: '<rect width="24" height="6" y="0" fill="#fff"/><rect width="24" height="6" y="6" fill="#0039a6"/><rect width="24" height="6" y="12" fill="#d52b1e"/>'
};
