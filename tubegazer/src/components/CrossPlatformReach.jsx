import { useState, useCallback, useMemo } from "react";
import { platformReach } from "../data/video.js";

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n;
}

function CrossPlatformReach() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activePlatform, setActivePlatform] = useState(null);

  const handleCopy = useCallback((key, link) => {
    navigator.clipboard.writeText(`https://${link}`).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);

  const totalReach = useMemo(() => {
    return Object.values(platformReach).reduce(
      (acc, p) => ({ subscribers: acc.subscribers + p.subscribers, views: acc.views + p.views }),
      { subscribers: 0, views: 0 }
    );
  }, []);

  const maxSubscribers = useMemo(
    () => Math.max(...Object.values(platformReach).map((p) => p.subscribers)),
    []
  );

  const entries = Object.entries(platformReach);
  const selected = activePlatform ? platformReach[activePlatform] : null;

  return (
    <section className="section card full" id="reach">
      <div className="section-header">
        <h2>📡 Cross-Platform Reach Panel</h2>
        <div className="reach-totals">
          <span>👥 {formatNum(totalReach.subscribers)} total followers</span>
          <span>👁 {formatNum(totalReach.views)} total views</span>
        </div>
      </div>
      <p className="section-sub">
        All your distribution channels in one place — track reach, post frequency, and share links.
      </p>

      <div className="reach-grid">
        {entries.map(([key, platform]) => {
          const pct = Math.round((platform.subscribers / maxSubscribers) * 100);
          const isActive = activePlatform === key;
          return (
            <div
              key={key}
              className={`reach-card ${isActive ? "reach-active" : ""}`}
              style={{ "--platform-color": platform.color }}
              onClick={() => setActivePlatform(isActive ? null : key)}
            >
              <div className="reach-card-header">
                <div className="reach-platform-icon" style={{ background: `${platform.color}22` }}>
                  {platform.icon}
                </div>
                <div className="reach-platform-info">
                  <strong>{platform.label}</strong>
                  <span className={`reach-status ${platform.shortsEnabled ? "status-active" : "status-off"}`}>
                    {platform.shortsEnabled ? "● Shorts/Reels On" : "● Long-form Only"}
                  </span>
                </div>
                <span className="reach-last-post">{platform.lastPosted}</span>
              </div>

              <div className="reach-stats">
                <div className="reach-stat">
                  <span className="reach-val">{formatNum(platform.subscribers)}</span>
                  <span className="reach-lbl">Followers</span>
                </div>
                <div className="reach-stat">
                  <span className="reach-val">{formatNum(platform.views)}</span>
                  <span className="reach-lbl">Views</span>
                </div>
                <div className="reach-stat">
                  <span className="reach-val" style={{ color: platform.color }}>{platform.avgEngagement}</span>
                  <span className="reach-lbl">Eng. Rate</span>
                </div>
              </div>

              <div className="reach-bar-row">
                <div className="reach-bar-bg">
                  <div
                    className="reach-bar-fill"
                    style={{ width: `${pct}%`, background: platform.color }}
                  />
                </div>
                <span className="reach-pct">{pct}%</span>
              </div>

              <div className="reach-link-row">
                <a
                  href={`https://${platform.link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="reach-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗 {platform.link}
                </a>
                <button
                  className={`btn-copy ${copiedKey === key ? "copied" : ""}`}
                  onClick={(e) => { e.stopPropagation(); handleCopy(key, platform.link); }}
                >
                  {copiedKey === key ? "✅" : "📋"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="reach-detail" style={{ borderColor: `${selected.color}44` }}>
          <h3 style={{ color: selected.color }}>{selected.icon} {selected.label} — Distribution Tips</h3>
          <ul className="reach-tips">
            {selected.shortsEnabled && (
              <li>✂️ Repurpose your top clips as <strong>Shorts/Reels</strong> for extra reach.</li>
            )}
            <li>📅 Last posted: <strong>{selected.lastPosted}</strong> — stay consistent for algorithm boost.</li>
            <li>📈 Avg engagement <strong>{selected.avgEngagement}</strong> — {
              parseFloat(selected.avgEngagement) >= 5
                ? "excellent! Your audience is highly engaged."
                : parseFloat(selected.avgEngagement) >= 2
                ? "good. Try polls and CTAs to push it higher."
                : "lower than average. Add stronger hooks."
            }</li>
            <li>🔗 Share link: <code>https://{selected.link}</code></li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default CrossPlatformReach;
