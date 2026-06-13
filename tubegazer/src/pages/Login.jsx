import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

const TABS = ["login", "register"];

function Login() {
  const { login, register } = useContext(AuthContext);
  const [tab, setTab]             = useState("login");
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [displayName, setDisplay] = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [loading, setLoading]     = useState(false);

  const handleTab = useCallback((t) => {
    setTab(t);
    setError("");
    setSuccess("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      if (!username.trim() || !password.trim()) {
        setError("All fields are required.");
        return;
      }
      setLoading(true);
      // Simulate async delay
      await new Promise((r) => setTimeout(r, 600));

      if (tab === "login") {
        const res = login(username, password);
        if (!res.success) setError(res.error);
      } else {
        const res = register(username, password, displayName);
        if (!res.success) {
          setError(res.error);
        } else {
          setSuccess("Account created! Logging you in...");
          await new Promise((r) => setTimeout(r, 800));
          login(username, password);
        }
      }
      setLoading(false);
    },
    [tab, username, password, displayName, login, register]
  );

  const demoLogin = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    login("studio", "tubegazer123");
    setLoading(false);
  }, [login]);

  return (
    <div className="login-page">
      {/* Background blobs */}
      <div className="login-blob blob-1" />
      <div className="login-blob blob-2" />
      <div className="login-blob blob-3" />

      <div className="login-card">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">TG</div>
          <div>
            <h1 className="login-app-name">TubeGazer</h1>
            <p className="login-tagline">Creator Command Center</p>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="login-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`login-tab ${tab === t ? "active" : ""}`}
              onClick={() => handleTab(t)}
            >
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {tab === "register" && (
            <div className="login-field">
              <label>Display Name</label>
              <input
                type="text"
                placeholder="e.g. TubeGazer Creator"
                value={displayName}
                onChange={(e) => setDisplay(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="pass-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass((p) => !p)}
              >
                {showPass ? "👁" : "🙈"}
              </button>
            </div>
          </div>

          {error   && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? (
              <span className="login-spinner" />
            ) : tab === "login" ? (
              "Sign In →"
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <div className="login-divider"><span>or</span></div>

        <button type="button" className="demo-btn" onClick={demoLogin} disabled={loading}>
          {loading ? "Loading..." : "🚀 Continue with Demo Account"}
        </button>

        {tab === "login" && (
          <div className="demo-hint">
            Demo credentials: <code>studio</code> / <code>tubegazer123</code>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
