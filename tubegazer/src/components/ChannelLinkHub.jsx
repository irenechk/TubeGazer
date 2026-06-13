import { useContext, useState, useCallback } from "react";
import { ChannelContext } from "../context/ChannelContext";

const platformIcons = {
  youtube: "▶️",
  instagram: "📸",
  twitter: "🐦",
  website: "🌐",
};

function ChannelLinkHub() {
  const links = useContext(ChannelContext);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = useCallback((platform, link) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedKey(platform);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);

  return (
    <section className="section card" id="links">
      <h2>🔗 Channel Link Hub</h2>
      <p className="section-sub">All your social presence in one place.</p>

      <div className="links-grid">
        {Object.entries(links).map(([platform, link]) => (
          <div className="link-box" key={platform}>
            <div className="link-platform">
              <span className="link-icon">{platformIcons[platform] || "🔗"}</span>
              <strong className="link-name">{platform.toUpperCase()}</strong>
            </div>
            <a
              href={`https://${link}`}
              target="_blank"
              rel="noreferrer"
              className="link-url"
            >
              {link}
            </a>
            <button
              className={`btn-copy ${copiedKey === platform ? "copied" : ""}`}
              onClick={() => handleCopy(platform, link)}
            >
              {copiedKey === platform ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChannelLinkHub;