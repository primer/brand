/* GitHub Brand-Web UI Kit — interactive demo assembly */
const { useState: useAppState } = React;

function SignupModal({ open, onClose, onDone }) {
  const [email, setEmail] = useAppState("");
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="__x" size={16} /></button>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><GitHubMark size={36} /></div>
        <h3 style={{ textAlign: "center" }}>Sign up for GitHub</h3>
        <p style={{ textAlign: "center" }}>Start building with Copilot — free, no credit card required.</p>
        <form onSubmit={e => { e.preventDefault(); onDone(email); }}>
          <div className="field"><label>Email address</label>
            <input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
          </div>
          <Button variant="primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>Create your account</Button>
        </form>
        <p style={{ fontSize: 12, textAlign: "center", marginTop: 16, marginBottom: 0 }}>
          By creating an account, you agree to the Terms of Service.
        </p>
      </div>
    </div>
  );
}
/* x glyph */
(window.GH_ICONS = window.GH_ICONS || {}).__x = { vb: "0 0 16 16", inner: '<path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" fill="currentColor"/>' };

function App() {
  const [theme, setTheme] = useAppState("dark");
  const [modal, setModal] = useAppState(false);
  const [toast, setToast] = useAppState(null);

  const signup = () => setModal(true);
  const done = (email) => {
    setModal(false);
    setToast(email ? `Welcome to GitHub, ${email.split("@")[0]}!` : "Account created!");
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <div data-theme={theme} style={{ background: "var(--canvas-default)", color: "var(--fg-default)", minHeight: "100vh", transition: "background .3s,color .3s" }}>
      <Nav theme={theme} onTheme={() => setTheme(t => t === "dark" ? "light" : "dark")} onSignup={signup} onSignin={signup} />
      <Hero onSignup={signup} />
      <LogoStrip />

      <section className="section">
        <SectionHead eyebrow="Why GitHub" title="Code, command, and collaborate" sub="Bring AI into every step of your workflow — from your first commit to production." />
        <div className="wrap">
          <River eyebrow="In the editor" title="Make your editor your most powerful accelerator"
            body="Copilot completes whole functions, explains unfamiliar code, and turns comments into working logic — without leaving your editor.">
            <div className="visual">
              <Editor tab="server.ts" lines={6}>
{<><span className="c-com"># build an Express health-check route</span>{"\n"}
<span className="c-key">app</span>.<span className="c-fn">get</span>(<span className="c-str">"/health"</span>, (<span className="c-var">req</span>, <span className="c-var">res</span>) =&gt; {"{"}{"\n"}
{"  "}<span className="ghost">res.json({"{"} status: "ok", ts: Date.now() {"}"})</span>{"\n"}
{"  "}<span className="ghost">// Copilot suggested ↑</span>{"\n"}
{"}"})</>}
              </Editor>
            </div>
          </River>
          <River flip eyebrow="In code review" title="Ship faster with AI that reviews with you"
            body="Copilot reviews your pull requests, catches bugs and security issues, and suggests fixes inline — so your team moves faster with confidence.">
            <PRVisual />
          </River>
          <River eyebrow="In the terminal" title="Bring AI to your terminal workflow"
            body="Ask Copilot in the CLI to explain, suggest, and run commands. Stay in flow without leaving the shell.">
            <TermVisual />
          </River>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><CustomerStory /></div>
      </section>

      <Pricing onSignup={signup} />
      <FAQ />
      <CTABanner onSignup={signup} />
      <Footer />

      <SignupModal open={modal} onClose={() => setModal(false)} onDone={done} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
