import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ChannelContext } from "../context/ChannelContext";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { href: "#stats",     label: "Video Stats",       icon: "📊" },
  { href: "#retention", label: "Retention",          icon: "📈" },
  { href: "#copyright", label: "Copyright",          icon: "🛡️" },
  { href: "#history",   label: "Watch Undo",         icon: "⏪" },
  { href: "#queue",     label: "Queue",              icon: "🎬" },
  { href: "#links",     label: "Channel Links",      icon: "🔗" },
  { href: "#safety",    label: "Safety",             icon: "✅" },
  { href: "#quality",   label: "Quality",            icon: "⚡" },
  { href: "#predictor", label: "Upload Predictor",   icon: "🕐" },
  { href: "#reach",     label: "Cross-Platform",     icon: "📡" },
  { href: "#feed",      label: "Insights Feed",      icon: "🌐" },
];

function Sidebar() {
  const links = useContext(ChannelContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">TG</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-name">TubeGazer</span>
          <span className="sidebar-sub">Creator Studio</span>
        </div>
      </div>

      {user && (
        <div className="sidebar-user">
          <span className="sidebar-user-avatar">{user.avatar || "🎬"}</span>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user.displayName || user.username}</p>
            <p className="sidebar-user-handle">@{user.username}</p>
          </div>
        </div>
      )}

      <div className="sidebar-channel">
        <div className="channel-avatar">🎥</div>
        <div>
          <p className="channel-name">My Channel</p>
          <a
            href={`https://${links.youtube}`}
            target="_blank"
            rel="noreferrer"
            className="channel-link"
          >
            {links.youtube}
          </a>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">ANALYTICS</p>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="sidebar-link">
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-link footer-link">
          <span className="sidebar-icon">🏠</span>
          <span>Home</span>
        </NavLink>
        {user && (
          <button className="sidebar-logout" onClick={logout}>
            <span className="sidebar-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;