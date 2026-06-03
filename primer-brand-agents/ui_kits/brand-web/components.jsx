/* GitHub Brand-Web UI Kit — primitives, chrome, faux product visuals */
const { useState, useEffect, useRef } = React;

/* ---------- Icon ---------- */
function Icon({ name, size = 16, color, style }) {
  const data = (window.GH_ICONS || {})[name];
  if (!data) return <span className="gh-icon" style={{ width: size, height: size, ...style }} />;
  return (
    <span className="gh-icon" style={{ width: size, height: size, color, ...style }}
      dangerouslySetInnerHTML={{ __html: `<svg viewBox="${data.vb}" fill="none" xmlns="http://www.w3.org/2000/svg">${data.inner}</svg>` }} />
  );
}

/* ---------- GitHub mark ---------- */
const MARK_PATH = "M40.529 0C18.12 0 0 18.562 0 41.528c0 18.36 11.607 33.893 27.711 39.394 2.016.413 2.754-.895 2.754-1.991 0-.962-.066-4.261-.066-7.704-11.275 2.472-13.623-4.952-13.623-4.952-1.809-4.81-4.497-6.05-4.497-6.05-3.692-2.539.265-2.539.265-2.539 4.091.278 6.24 4.26 6.24 4.26 3.625 6.328 9.458 4.54 11.814 3.434.332-2.683 1.41-4.539 2.547-5.568-8.994-.962-18.452-4.54-18.452-20.486 0-4.539 1.61-8.252 4.157-11.137-.407-1.029-1.809-5.29.406-11.002 0 0 3.419-1.097 11.143 4.261a38.6 38.6 0 0 1 10.13-1.376c3.418 0 6.911.481 10.13 1.376 7.716-5.367 11.142-4.261 11.142-4.261 2.216 5.703.805 9.973.407 11.002 2.613 2.885 4.157 6.598 4.157 11.137 0 15.955-9.459 19.456-18.518 20.486 1.476 1.308 2.754 3.78 2.754 7.703 0 5.569-.066 10.04-.066 11.416 0 1.096.738 2.404 2.754 1.991C69.393 75.421 81 59.888 81 41.528 81.066 18.562 62.88 0 40.537 0Z";
function GitHubMark({ size = 28, className }) {
  return (
    <span className={"gh-icon " + (className || "")} style={{ width: size, height: size }}>
      <svg viewBox="0 0 81 81" fill="currentColor"><path d={MARK_PATH} /></svg>
    </span>
  );
}

/* ---------- Button ---------- */
function Button({ variant = "primary", size, children, icon, trailingArrow, ...rest }) {
  const cls = ["btn", "btn-" + variant, size === "sm" ? "btn-sm" : ""].join(" ");
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {trailingArrow && <Icon name="__arrow" size={14} />}
    </button>
  );
}
/* simple arrow glyph for tertiary links */
(window.GH_ICONS = window.GH_ICONS || {}).__arrow = { vb: "0 0 16 16", inner: '<path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06l2.97-2.97H3a.75.75 0 0 1 0-1.5h8.19L8.22 4.03a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>' };

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}<span className="cur" /></span>;
}

/* ---------- Nav ---------- */
const PRODUCTS = [
  { t: "AI", items: [
    { ic: "copilot", b: "GitHub Copilot", s: "Write better code with AI" },
    { ic: "zap", b: "GitHub Spark", s: "Build and deploy intelligent apps" },
    { ic: "mcp", b: "MCP Registry", s: "Connect agents to your tools" },
  ]},
  { t: "Develop", items: [
    { ic: "codescan", b: "Code search", s: "Find more, search less" },
    { ic: "issue-opened", b: "Issues", s: "Plan and track work" },
    { ic: "gear", b: "Actions", s: "Automate any workflow" },
  ]},
  { t: "Secure", items: [
    { ic: "shield-lock", b: "Code security", s: "Secure your code as you build" },
    { ic: "lock", b: "Secret protection", s: "Stop leaks before they start" },
    { ic: "book", b: "Documentation", s: "Guides, APIs and references" },
  ]},
];
function Nav({ theme, onTheme, onSignup, onSignin }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const links = ["Solutions", "Resources", "Open source", "Enterprise", "Pricing"];
  return (
    <nav className="nav" ref={ref}>
      <div className="wrap">
        <GitHubMark size={28} className="nav-mark" />
        <div className="nav-links">
          <button className="nav-link" onClick={() => setOpen(o => !o)} aria-expanded={open}>
            Products <Icon name="chevron-down" size={14} style={{ transform: open ? "rotate(180deg)" : "none" }} />
          </button>
          {links.map(l => <a key={l} className="nav-link" href="#">{l}</a>)}
        </div>
        <div className="nav-spacer" />
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search"><Icon name="search" size={16} /></button>
          <button className="icon-btn" aria-label="Theme" onClick={onTheme}>
            <Icon name={theme === "dark" ? "zap" : "star"} size={16} />
          </button>
          <Button variant="tertiary" size="sm" onClick={onSignin} style={{ padding: "8px 12px" }}>Sign in</Button>
          <Button variant="primary" size="sm" onClick={onSignup}>Sign up</Button>
        </div>
      </div>
      {open && (
        <div className="wrap" style={{ position: "relative" }}>
          <div className="mega">
            {PRODUCTS.map(group => (
              <React.Fragment key={group.t}>
                <div className="mega-col-title">{group.t}</div>
                {group.items.map(it => (
                  <a key={it.b} className="mega-item" href="#" onClick={e => { e.preventDefault(); setOpen(false); }}>
                    <Icon name={it.ic} size={20} />
                    <span><b>{it.b}</b><span>{it.s}</span></span>
                  </a>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- Faux VS Code editor ---------- */
function Editor({ tab = "app.tsx", children, lines = 8 }) {
  return (
    <div className="editor">
      <div className="editor-bar">
        <span className="dot" style={{ background: "#FF5F57" }} />
        <span className="dot" style={{ background: "#FEBC2E" }} />
        <span className="dot" style={{ background: "#28C840" }} />
        <span className="editor-tab">{tab}</span>
      </div>
      <div className="editor-body">
        <div className="gutter">{Array.from({ length: lines }).map((_, i) => <div key={i}>{i + 1}</div>)}</div>
        <div className="code">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
const FOOT = {
  Product: ["Features", "Copilot", "Security", "Enterprise", "Pricing", "Team"],
  Platform: ["Developer API", "Partners", "Education", "GitHub CLI", "Desktop"],
  Support: ["Docs", "Community", "Support", "Status", "Contact"],
  Company: ["About", "Blog", "Careers", "Newsroom", "Inclusion"],
};
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <GitHubMark size={32} className="foot-mark" />
            <p style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 14, maxWidth: "24ch", lineHeight: 1.5 }}>
              The complete developer platform to build, scale, and deliver secure software.
            </p>
          </div>
          {Object.entries(FOOT).map(([h, items]) => (
            <div className="foot-col" key={h}>
              <h4>{h}</h4>
              {items.map(i => <a key={i} href="#">{i}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} GitHub, Inc. · Brand-web UI kit recreation</span>
          <span style={{ display: "flex", gap: 16 }}>
            <a href="#">Terms</a><a href="#">Privacy</a><a href="#">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, GitHubMark, Button, Eyebrow, Nav, Editor, Footer });
