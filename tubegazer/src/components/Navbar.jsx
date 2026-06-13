import { useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useVideoSearch } from "../hooks/useVideoSearch";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { query, results, handleSearch, clearSearch } = useVideoSearch();
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // useEffect: close search dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        clearSearch();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [clearSearch]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">TubeGazer Studio</Link>
        {location.pathname !== "/" && (
          <Link to="/" className="nav-back">← Dashboard</Link>
        )}
      </div>

      <div className="search-wrapper" ref={dropdownRef}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search videos, tags..."
            value={query}
            onChange={handleSearch}
          />
          {query && (
            <button className="search-clear" onClick={clearSearch}>✕</button>
          )}
        </div>

        {query && (
          <div className="search-dropdown">
            {results.length === 0 ? (
              <div className="search-empty">No results for "{query}"</div>
            ) : (
              results.map((v) => (
                <Link
                  key={v.id}
                  to={`/video/${v.id}`}
                  className="search-result-item"
                  onClick={clearSearch}
                >
                  <span className="search-thumb">{v.thumbnail}</span>
                  <div>
                    <p className="search-title">{v.title}</p>
                    <p className="search-meta">{v.category} · {v.performance}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <div className="navbar-right">
        {user && (
          <div className="nav-user">
            <span className="nav-avatar">{user.avatar || "🎬"}</span>
            <span className="nav-username">{user.displayName || user.username}</span>
          </div>
        )}
        <button className="btn-export">Export Report</button>
        {user && (
          <button className="btn-logout" onClick={logout} title="Sign out">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;