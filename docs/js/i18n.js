/* ScanContext GitHub Pages i18n — shared by all static pages.
   Locale order: ?lang= > localStorage > navigator > 'en'. 'en' is the fallback. */
(function () {
  "use strict";

  var STORAGE_KEY = "sc_lang";
  var DEFAULT = "en";

  // code = dict filename (i18n/<code>.json); name = native label; flag = country code; badge = dual-script glyph
  var LOCALES = [
    { code: "bg",      name: "Български",           flag: "bg" },
    { code: "bs",      name: "Bosanski",            flag: "ba" },
    { code: "de",      name: "Deutsch",             flag: "de" },
    { code: "el",      name: "Ελληνικά",            flag: "gr" },
    { code: "en",      name: "English",             flag: "gb" },
    { code: "es",      name: "Español",             flag: "es" },
    { code: "fr",      name: "Français",            flag: "fr" },
    { code: "hr",      name: "Hrvatski",            flag: "hr" },
    { code: "it",      name: "Italiano",            flag: "it" },
    { code: "nl",      name: "Nederlands",          flag: "nl" },
    { code: "pl",      name: "Polski",              flag: "pl" },
    { code: "pt",      name: "Português",           flag: "pt" },
    { code: "ro",      name: "Română",              flag: "ro" },
    { code: "ru",      name: "Русский",             flag: "ru" },
    { code: "sr",      name: "Српски (ћирилица)",   flag: "rs", badge: "ћ" },
    { code: "sr-Latn", name: "Srpski (latinica)",   flag: "rs", badge: "č" }
  ];
  var BY_CODE = {};
  LOCALES.forEach(function (l) { BY_CODE[l.code] = l; });

  function isSupported(code) { return !!BY_CODE[code]; }

  // Map a BCP-47 nav tag to one of our codes (script/region aware).
  function matchNav(tag) {
    if (!tag) return null;
    var t = String(tag).toLowerCase();
    if (t === "sr-latn" || t.indexOf("sr-latn") === 0 || /^sr(-\w+)*-latn/.test(t)) return "sr-Latn";
    var base = t.split("-")[0];
    if (base === "sr") return "sr";           // sr, sr-Cyrl, sr-RS => Cyrillic
    if (isSupported(base)) return base;        // de-DE => de, pt-BR => pt
    return null;
  }

  function resolveLocale() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q) {
        // Accept an exact code (e.g. sr-Latn) OR a mappable tag (de-DE, sr-latn,
        // pt-BR) via the same normalization used for navigator languages.
        var qc = isSupported(q) ? q : matchNav(q);
        if (qc) {
          // Persist an explicit ?lang= choice so it carries to other pages/visits.
          try { window.localStorage.setItem(STORAGE_KEY, qc); } catch (e) {}
          return qc;
        }
      }
    } catch (e) {}
    try {
      var s = window.localStorage.getItem(STORAGE_KEY);
      if (s && isSupported(s)) return s;
    } catch (e) {}
    var navs = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || navigator.userLanguage];
    for (var i = 0; i < navs.length; i++) {
      var m = matchNav(navs[i]);
      if (m) return m;
    }
    return DEFAULT;
  }

  function getPath(dict, key) {
    // keys are flat dotted strings used as-is (dict is a flat map)
    return dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : undefined;
  }

  // ---- SC_T: JS-side lookup for strings injected outside data-i18n nodes ----
  // Fallback chain: current dict -> en dict -> the key itself.
  // window.__SC_DICT / window.__SC_EN are refreshed on every setLocale() below.
  var onLocaleCallbacks = [];
  window.SC_T = function (key, vars) {
    var dict = window.__SC_DICT || {};
    var en = window.__SC_EN || {};
    var val = getPath(dict, key);
    if (val === undefined) val = getPath(en, key);
    if (val === undefined) val = key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        // Function replacer so a value containing $ / $& / $1 is inserted
        // literally (the string form of replace() would interpret those).
        val = String(val).replace(new RegExp("\\{" + k + "\\}", "g"), function () { return vars[k]; });
      });
    }
    return val;
  };
  // Sanitized variant for callers that inject the result via innerHTML. The
  // dictionary value is run through the same allowlist sanitizer as applyDict(),
  // and interpolated vars are HTML-escaped, so a tampered translation cannot
  // introduce unsafe markup at an innerHTML sink. Use this (not SC_T) for innerHTML.
  window.SC_T_HTML = function (key, vars) {
    var safeVars = vars;
    if (vars) {
      safeVars = {};
      Object.keys(vars).forEach(function (k) { safeVars[k] = escapeAttr(vars[k]); });
    }
    return sanitizeHtml(window.SC_T(key, safeVars));
  };
  // Register a callback to be (re-)run once now and again after every locale
  // apply, so JS-injected strings (OS detection, version badge, etc.) stay in
  // sync with the active locale.
  window.SC_onLocale = function (fn) {
    if (typeof fn !== "function") return;
    onLocaleCallbacks.push(fn);
    try { fn(); } catch (e) {}
  };
  function notifyLocale() {
    onLocaleCallbacks.forEach(function (fn) {
      try { fn(); } catch (e) {}
    });
  }

  // Strict allowlist sanitizer for dictionary values injected via innerHTML.
  // Locale JSON accepts community contributions, so we permit only the inline
  // formatting tags/attributes the site actually uses and strip everything else
  // (scripts, SVG, unknown tags, event-handler attributes, javascript:/data: URLs).
  var ALLOWED_TAGS = {
    A: 1, B: 1, STRONG: 1, EM: 1, I: 1, U: 1, SMALL: 1,
    SPAN: 1, CODE: 1, BR: 1, P: 1, UL: 1, OL: 1, LI: 1
  };
  var ALLOWED_ATTRS = { class: 1, href: 1, target: 1, rel: 1, title: 1, style: 1 };
  // Inline styles are permitted (the authored content uses them) but locked down
  // to a safe property allowlist with no url()/expression()/positioning, so a
  // community translation cannot exfiltrate (background:url) or clickjack.
  var SAFE_STYLE_PROPS = {
    color: 1, background: 1, "background-color": 1,
    margin: 1, "margin-top": 1, "margin-right": 1, "margin-bottom": 1, "margin-left": 1,
    padding: 1, "padding-top": 1, "padding-right": 1, "padding-bottom": 1, "padding-left": 1,
    "font-size": 1, "font-style": 1, "font-weight": 1, "font-family": 1, "line-height": 1,
    "text-align": 1, "text-transform": 1, "letter-spacing": 1,
    border: 1, "border-color": 1, "border-width": 1, "border-style": 1, "border-radius": 1
  };
  function sanitizeStyle(v) {
    return String(v).split(";").map(function (decl) {
      var i = decl.indexOf(":");
      if (i < 0) return "";
      var prop = decl.slice(0, i).trim().toLowerCase();
      var val = decl.slice(i + 1).trim();
      if (!SAFE_STYLE_PROPS[prop]) return "";
      if (/url\(|expression|javascript:|@import|<|\/\*/i.test(val)) return "";
      return prop + ": " + val;
    }).filter(Boolean).join("; ");
  }
  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function safeHref(v) {
    // strip control chars/whitespace and normalize backslashes so obfuscated
    // schemes/authorities (java\\tscript:, \\/\\/host) can't slip through.
    var s = String(v).replace(/[\u0000-\u0020\u007f]/g, "").replace(/\\/g, "/").toLowerCase();
    if (s.indexOf("//") === 0) return false;                          // protocol-relative //host -> reject
    if (/^(https?:\/\/|mailto:|#|\/|\.\/|\.\.\/)/.test(s)) return true; // explicit safe forms
    return s.indexOf(":") === -1;                                     // scheme-less relative
  }
  function sanitizeNode(node) {
    var child = node.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (child.nodeType === 1) {          // element
        if (!ALLOWED_TAGS[child.tagName]) {
          sanitizeNode(child);              // clean its subtree, then unwrap it
          while (child.firstChild) node.insertBefore(child.firstChild, child);
          node.removeChild(child);
        } else {
          Array.prototype.slice.call(child.attributes).forEach(function (a) {
            var name = a.name.toLowerCase();
            if (name.indexOf("on") === 0 || !ALLOWED_ATTRS[name]) child.removeAttribute(a.name);
            else if (name === "href" && !safeHref(a.value)) child.removeAttribute(a.name);
            else if (name === "style") {
              var st = sanitizeStyle(a.value);
              if (st) child.setAttribute("style", st); else child.removeAttribute(a.name);
            }
          });
          // Force rel=noopener noreferrer on target=_blank links (reverse tabnabbing).
          if (child.tagName === "A" && (child.getAttribute("target") || "").toLowerCase() === "_blank") {
            child.setAttribute("rel", "noopener noreferrer");
          }
          sanitizeNode(child);
        }
      } else if (child.nodeType === 8) {   // comment
        node.removeChild(child);
      }
      child = next;
    }
  }
  function sanitizeHtml(html) {
    // <template> content is inert: parsing does not run scripts or load resources.
    var tpl = document.createElement("template");
    tpl.innerHTML = String(html);
    sanitizeNode(tpl.content);
    return tpl.innerHTML;
  }
  // For attribute-applied values (setAttribute): decode HTML entities and strip
  // any markup, since setAttribute stores the string verbatim (so "&mdash;"
  // would otherwise render literally, and tags would be meaningless/unsafe).
  function decodeText(s) {
    var tpl = document.createElement("template");
    tpl.innerHTML = String(s);
    return tpl.content.textContent || "";
  }

  function applyDict(dict, fallback) {
    var nodes = document.querySelectorAll("[data-i18n]");
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute("data-i18n");
      var val = getPath(dict, key);
      if (val === undefined) val = getPath(fallback, key);
      if (val === undefined) return;               // leave existing DOM text
      var attr = el.getAttribute("data-i18n-attr"); // e.g. "content","placeholder","aria-label","alt"
      if (attr) el.setAttribute(attr, decodeText(val)); // plain text: decode entities, strip markup
      else el.innerHTML = sanitizeHtml(val);            // allowlist-sanitized inline markup only
    });
  }

  function applyMeta(code, dict, fallback) {
    document.documentElement.setAttribute("lang", code);
    var dir = getPath(dict, "_dir") || "ltr";
    document.documentElement.setAttribute("dir", dir);
    // document.title is set by applyDict via the page's own <title data-i18n> element
    // (index uses meta.title, privacy uses privacy.meta.title). We must NOT force the
    // generic meta.title here — on privacy.html that would clobber the correct title.
  }

  function fetchDict(code) {
    return window.fetch("i18n/" + code + ".json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  // ---- flag rendering (inline SVG + optional dual-script badge) ----
  function flagSvg(loc) {
    var base = window.SC_FLAGS && window.SC_FLAGS[loc.flag]
      ? window.SC_FLAGS[loc.flag]
      : '<rect width="24" height="18" rx="2" fill="#334155"/>';
    var badge = "";
    if (loc.badge) {
      badge =
        '<g>' +
        '<circle cx="18.5" cy="4.5" r="5" fill="#0f172a" stroke="#e6edf7" stroke-width="1"/>' +
        '<text x="18.5" y="7.4" text-anchor="middle" font-size="7" font-weight="700" ' +
        'font-family="Georgia,\'Times New Roman\',serif" fill="#ffffff">' + loc.badge + '</text>' +
        '</g>';
    }
    return '<svg class="sc-flag" viewBox="0 0 24 18" width="24" height="18" ' +
           'aria-hidden="true" role="img">' + base + badge + '</svg>';
  }

  // ---- accessible dropdown ----
  // The switcher DOM + its document/host listeners are wired ONCE. Later locale
  // changes only re-sync the button label and option selection, so listeners do
  // not accumulate across setLocale() calls.
  var switcherWired = false;
  var activeCode = DEFAULT;
  var onPickCb = null;

  // Localized accessible name for the switcher (falls back to English).
  function langLabel() {
    var v = window.SC_T ? window.SC_T("a11y.language") : null;
    return (v && v !== "a11y.language") ? v : "Language";
  }

  function syncSwitcher(current) {
    var host = document.getElementById("lang-switcher");
    if (!host) return;
    activeCode = current;
    var cur = BY_CODE[current] || BY_CODE[DEFAULT];
    var lbl = langLabel();
    var btn = host.querySelector(".sc-lang-btn");
    if (btn) {
      btn.setAttribute("aria-label", lbl);
      btn.innerHTML = flagSvg(cur) + '<span class="sc-lang-name">' + cur.name + '</span>' +
        '<span class="sc-lang-caret" aria-hidden="true">▾</span>';
    }
    var list = host.querySelector(".sc-lang-list");
    if (list) list.setAttribute("aria-label", lbl);
    var opts = host.querySelectorAll('[role="option"]');
    Array.prototype.forEach.call(opts, function (o) {
      o.setAttribute("aria-selected", String(o.getAttribute("data-code") === current));
    });
  }

  function buildSwitcher(current, onPick) {
    var host = document.getElementById("lang-switcher");
    if (!host) return;
    onPickCb = onPick;
    if (switcherWired) { syncSwitcher(current); return; }
    activeCode = current;
    var cur = BY_CODE[current] || BY_CODE[DEFAULT];
    // Escaped for HTML-attribute context: langLabel() comes from community JSON.
    var lbl = escapeAttr(langLabel());

    host.innerHTML =
      '<button type="button" class="sc-lang-btn" aria-haspopup="listbox" aria-expanded="false" ' +
        'aria-label="' + lbl + '">' +
        flagSvg(cur) + '<span class="sc-lang-name">' + cur.name + '</span>' +
        '<span class="sc-lang-caret" aria-hidden="true">▾</span>' +
      '</button>' +
      '<ul class="sc-lang-list" role="listbox" tabindex="-1" aria-label="' + lbl + '" hidden>' +
        LOCALES.map(function (l, i) {
          return '<li role="option" data-code="' + l.code + '" id="sc-lang-opt-' + i + '" ' +
                 'aria-selected="' + (l.code === current) + '" tabindex="-1">' +
                 flagSvg(l) + '<span>' + l.name + '</span></li>';
        }).join("") +
      '</ul>';

    var btn = host.querySelector(".sc-lang-btn");
    var list = host.querySelector(".sc-lang-list");
    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));

    function open() {
      list.hidden = false; btn.setAttribute("aria-expanded", "true");
      var sel = list.querySelector('[aria-selected="true"]') || options[0];
      sel.focus();
    }
    function close(focusBtn) {
      list.hidden = true; btn.setAttribute("aria-expanded", "false");
      if (focusBtn) btn.focus();
    }
    function pick(code) {
      close(true);
      if (code !== activeCode) onPickCb(code);
    }
    btn.addEventListener("click", function () { list.hidden ? open() : close(true); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    options.forEach(function (opt, idx) {
      opt.addEventListener("click", function () { pick(opt.getAttribute("data-code")); });
      opt.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(opt.getAttribute("data-code")); }
        else if (e.key === "ArrowDown") { e.preventDefault(); (options[idx + 1] || options[0]).focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); (options[idx - 1] || options[options.length - 1]).focus(); }
        else if (e.key === "Escape") { e.preventDefault(); close(true); }
        else if (e.key === "Home") { e.preventDefault(); options[0].focus(); }
        else if (e.key === "End") { e.preventDefault(); options[options.length - 1].focus(); }
      });
    });
    document.addEventListener("click", function (e) {
      if (!host.contains(e.target)) close(false);
    });
    // Close when focus leaves the switcher entirely (e.g. Tab-away), not just
    // on outside click.
    host.addEventListener("focusout", function (e) {
      if (!list.hidden && !host.contains(e.relatedTarget)) close(false);
    });
    switcherWired = true;
  }

  // ---- init ----
  var enDictPromise = null;
  function getEn() {
    if (!enDictPromise) enDictPromise = fetchDict("en");
    return enDictPromise;
  }

  var setLocaleSeq = 0;
  function setLocale(code) {
    var seq = ++setLocaleSeq;
    Promise.all([fetchDict(code), code === "en" ? null : getEn()]).then(function (res) {
      // Drop a stale apply: if a newer setLocale() started while we were fetching
      // (fast switching / slow network), its result must win, not this one.
      if (seq !== setLocaleSeq) return;
      var loaded = res[0];                        // null if the requested dict failed to load
      var enDict = res[1] || (code === "en" ? loaded : null) || {};
      var dict = loaded || enDict;                // render English content if the dict is missing
      // Reflect what actually rendered: on a failed fetch the page shows English,
      // so <html lang> and the switcher must say "en", not the requested locale.
      var effective = loaded ? code : "en";
      window.__SC_DICT = dict;
      window.__SC_EN = enDict;
      applyDict(dict, enDict);
      applyMeta(effective, dict, enDict);
      buildSwitcher(effective, function (next) {
        try { window.localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
        try {
          var u = new URL(location.href); u.searchParams.set("lang", next);
          history.replaceState(null, "", u);
        } catch (e) {}
        setLocale(next);
      });
      notifyLocale(); // re-run JS-injected strings (OS detect, version badge, ...)
    });
  }

  function boot() { setLocale(resolveLocale()); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
