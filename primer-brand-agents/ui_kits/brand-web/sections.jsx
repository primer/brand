/* GitHub Brand-Web UI Kit — page sections */
const { useState: useStateS } = React;

/* ---------- Hero ---------- */
function Hero({ onSignup }) {
  return (
    <header className="hero" data-screen-label="Hero">
      <div className="wrap">
        <div className="hero-text">
          <Eyebrow>GitHub Copilot</Eyebrow>
          <h1>Command your craft</h1>
          <p className="lede">The AI developer tool that writes, reviews, and ships code with you — right where you work.</p>
          <div className="hero-cta">
            <Button variant="primary" onClick={onSignup}>Get started for free</Button>
            <Button variant="secondary" icon="zap">Watch the demo</Button>
          </div>
        </div>
        <div className="visual">
          <Editor tab="rate_limiter.ts" lines={9}>
{<><span className="c-com"># Copilot, add a sliding-window rate limiter</span>{"\n"}
<span className="c-key">export function </span><span className="c-fn">rateLimit</span>(<span className="c-var">key</span>: <span className="c-def">string</span>) {"{"}{"\n"}
{"  "}<span className="c-key">const </span><span className="c-var">now</span> = <span className="c-fn">Date</span>.<span className="c-fn">now</span>(){"\n"}
{"  "}<span className="c-key">const </span><span className="c-var">win</span> = <span className="c-num">60_000</span>{"\n"}
{"  "}<span className="ghost">hits = hits.filter(t =&gt; now - t &lt; win)</span>{"\n"}
{"  "}<span className="ghost">if (hits.length &gt;= 100) return false</span>{"\n"}
{"  "}<span className="ghost">hits.push(now); return true</span>{"\n"}
{"}"}</>}
          </Editor>
        </div>
      </div>
    </header>
  );
}

/* ---------- Logo strip ---------- */
function LogoStrip() {
  const logos = ["shopify", "msft", "decathlon", "doctolib"];
  return (
    <section className="logostrip">
      <div className="wrap">
        <p className="center" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 24 }}>
          Trusted by the world's leading teams
        </p>
        <div className="row">
          {logos.map(l => <img key={l} src={`../../assets/logos/${l}.svg`} alt={l} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section header ---------- */
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="sec-head">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

/* ---------- River ---------- */
function River({ flip, eyebrow, title, body, children }) {
  return (
    <div className={"river" + (flip ? " flip" : "")}>
      <div className="river-text">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        <p>{body}</p>
        <Button variant="tertiary" trailingArrow>Learn more</Button>
      </div>
      <div className="river-visual">{children}</div>
    </div>
  );
}

/* PR suggestion popover visual */
function PRVisual() {
  return (
    <div className="visual" style={{ background: "radial-gradient(120% 120% at 80% 0%, #5FB9FF 0%, #3094FF 40%, #0040A7 100%)" }}>
      <div className="popover">
        <div className="po-head"><Icon name="copilot" size={18} color="var(--accent-green-strong)" /> Copilot review</div>
        <div className="po-body">
          <div className="row" style={{ gap: 8, marginBottom: 4 }}>
            <span className="chip"><Icon name="issue-opened" size={13} /> auth.py</span>
            <span className="chip">+12 −3</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5 }}>This token comparison is vulnerable to timing attacks. Use a constant-time compare:</p>
          <div className="suggestion">+ hmac.compare_digest(a, b)</div>
        </div>
      </div>
    </div>
  );
}

/* Terminal visual */
function TermVisual() {
  return (
    <div className="visual" style={{ background: "radial-gradient(120% 120% at 20% 100%, #8CF2A6 0%, #08872B 45%, #0E4A2E 100%)" }}>
      <div className="editor">
        <div className="editor-bar"><span className="dot" style={{ background: "#FF5F57" }} /><span className="dot" style={{ background: "#FEBC2E" }} /><span className="dot" style={{ background: "#28C840" }} /><span className="editor-tab">zsh — copilot</span></div>
        <div style={{ padding: "16px 18px", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.8, color: "#e6edf3" }}>
          <div><span style={{ color: "#5FED83" }}>➜</span> <span style={{ color: "#79C0FF" }}>~/app</span> gh copilot suggest <span className="c-str">"revert last commit"</span></div>
          <div style={{ color: "#8b949e" }}># Suggestion</div>
          <div><span className="c-str">git reset --soft HEAD~1</span></div>
          <div style={{ color: "#5FED83" }}>✓ Run · ✎ Revise · ✗ Cancel</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Customer story ---------- */
function CustomerStory() {
  return (
    <div className="story">
      <div className="story-text">
        <Eyebrow>Customer story</Eyebrow>
        <p className="quote">"Copilot lets our engineers stay in flow and focus on the work that actually matters."</p>
        <p style={{ fontSize: 14, color: "var(--fg-muted)" }}>— VP of Engineering, Grupo Boticário</p>
        <div style={{ marginTop: 20 }}><Button variant="secondary" trailingArrow>Read the story</Button></div>
      </div>
      <div className="story-photo">
        <div className="stat"><div className="big">94%</div><div style={{ fontSize: 14, opacity: .9, maxWidth: "22ch", marginTop: 6 }}>increase in developer productivity with Copilot</div></div>
      </div>
    </div>
  );
}

/* ---------- Pricing ---------- */
const PLANS = [
  { name: "Free", m: 0, y: 0, desc: "For developers getting started with AI.", feat: false, cta: "Sign up", features: ["2,000 code completions / mo", "50 chat messages / mo", "Access to GPT-class models"] },
  { name: "Pro", m: 10, y: 8, desc: "For individual developers shipping daily.", feat: true, cta: "Get started", features: ["Unlimited completions & chat", "Copilot in the CLI & editor", "Premium model access", "Code review suggestions"] },
  { name: "Enterprise", m: 39, y: 32, desc: "For organizations operating at scale.", feat: false, cta: "Contact sales", features: ["Everything in Pro", "Enterprise-grade security", "Audit logs & policy controls", "SSO & SCIM provisioning"] },
];
function Pricing({ onSignup }) {
  const [annual, setAnnual] = useStateS(true);
  return (
    <section className="section" id="pricing" data-screen-label="Pricing">
      <SectionHead eyebrow="Pricing" title="Take flight with GitHub Copilot" sub="Start for free. Upgrade as your team grows. Cancel anytime." />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="bill-toggle">
          <button className={annual ? "" : "on"} onClick={() => setAnnual(false)}>Monthly</button>
          <button className={annual ? "on" : ""} onClick={() => setAnnual(true)}>Annual · save 20%</button>
        </div>
      </div>
      <div className="wrap"><div className="plans">
        {PLANS.map(p => (
          <div key={p.name} className={"plan" + (p.feat ? " feat" : "")}>
            <span className="pname">{p.name}</span>
            <div className="price">${annual ? p.y : p.m}<small> / mo</small></div>
            <p className="pdesc">{p.desc}</p>
            <Button variant={p.feat ? "primary" : "secondary"} onClick={onSignup}>{p.cta}</Button>
            <ul>{p.features.map(f => <li key={f}><Icon name="check" size={16} /> {f}</li>)}</ul>
          </div>
        ))}
      </div></div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "What's the difference between the Free and Pro plans?", a: "Free includes a capped number of completions and chat messages each month. Pro removes those limits, adds premium model access, and brings Copilot into the CLI and code review." },
  { q: "Can I use GitHub Copilot for free?", a: "Yes. The Free plan is available to all developers with a GitHub account and requires no credit card to start." },
  { q: "Which models does Copilot use?", a: "Copilot routes to a range of frontier models. Paid plans unlock premium model access for higher-quality reasoning and larger context." },
  { q: "Is my code used to train models?", a: "No. Your private code is never used to train the underlying models. Enterprise plans add additional data residency and policy controls." },
];
function FAQ() {
  const [open, setOpen] = useStateS(0);
  return (
    <section className="section" data-screen-label="FAQ">
      <SectionHead title="Frequently asked questions" />
      <div className="faq">
        {FAQS.map((f, i) => (
          <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q} <Icon name="chevron-down" size={18} />
            </button>
            <div className="faq-a" style={{ maxHeight: open === i ? 200 : 0 }}><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA banner ---------- */
function CTABanner({ onSignup }) {
  return (
    <section className="cta" data-screen-label="CTA">
      <div className="wrap">
        <Eyebrow>Get started</Eyebrow>
        <h2>Millions of developers build on GitHub. Join them.</h2>
        <div className="hero-cta">
          <Button variant="primary" onClick={onSignup}>Sign up for free</Button>
          <Button variant="secondary" trailingArrow>Contact sales</Button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, LogoStrip, SectionHead, River, PRVisual, TermVisual, CustomerStory, Pricing, FAQ, CTABanner });
