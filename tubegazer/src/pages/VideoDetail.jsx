import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { videos } from "../data/video.js";

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n;
}

const performanceColors = {
  Viral:     "#7df9ff",
  Excellent: "#a855f7",
  Good:      "#00ffaa",
  Average:   "#ffc107",
};

function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect: simulate fetching video detail by ID
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = videos.find((v) => v.id === Number(id));
      setVideo(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const segments = useMemo(() => {
    if (!video) return [];
    const segLen = 3;
    const total = Math.ceil(video.duration / segLen);
    return Array.from({ length: total }, (_, i) => ({
      id: i + 1,
      start: i * segLen,
      end: Math.min((i + 1) * segLen, video.duration),
    }));
  }, [video]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner" />
        <p>Loading video analytics...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="detail-not-found">
        <h2>404 — Video Not Found</h2>
        <p>This video doesn't exist in your dashboard.</p>
        <button onClick={() => navigate("/")}>← Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Header */}
      <div className="detail-hero">
        <div className="detail-thumb">{video.thumbnail}</div>
        <div className="detail-meta">
          <div className="detail-badges">
            <span className="video-category">{video.category}</span>
            <span
              className="perf-detail-badge"
              style={{ color: performanceColors[video.performance] }}
            >
              ● {video.performance}
            </span>
          </div>
          <h1 className="detail-title">{video.title}</h1>
          <p className="detail-desc">{video.description}</p>
          <div className="detail-tags">
            {video.tags.map((t) => (
              <span key={t} className="feed-tag">#{t}</span>
            ))}
          </div>
          <p className="detail-date">Uploaded: {video.uploadDate}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="detail-stats-grid">
        {[
          { icon: "👁", label: "Views",      value: formatNum(video.views) },
          { icon: "❤️", label: "Likes",      value: formatNum(video.likes) },
          { icon: "💬", label: "Comments",   value: video.comments },
          { icon: "📈", label: "Retention",  value: video.retention + "%" },
          { icon: "⏱", label: "Duration",   value: video.duration + " min" },
          { icon: "👥", label: "Subscribers",value: formatNum(video.subscribers) },
        ].map((s) => (
          <div key={s.label} className="detail-stat-card">
            <span className="detail-stat-icon">{s.icon}</span>
            <span className="detail-stat-val">{s.value}</span>
            <span className="detail-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Retention Bar */}
      <div className="detail-section">
        <h3>Viewer Retention</h3>
        <div className="retention-bar-row">
          <div className="retention-bar-bg">
            <div
              className="retention-bar-fill"
              style={{ width: `${video.retention}%` }}
            />
          </div>
          <span className="retention-pct">{video.retention}%</span>
        </div>
        <p className="retention-note">
          {video.retention >= 80 ? "🔥 Excellent — audience loves this content!" :
           video.retention >= 65 ? "✅ Good — solid engagement." :
           video.retention >= 50 ? "📊 Average — consider improving the hook." :
           "⚠️ Below average — review your content structure."}
        </p>
      </div>

      {/* Copyright */}
      <div className="detail-section">
        <h3>Copyright Status</h3>
        <div className={`checker-result ${video.copyright === "Safe" ? "safe" : "warn"}`}>
          {video.copyright === "Safe"
            ? `✅ Hash "${video.hash}" is licensed and copyright safe.`
            : `⚠️ Hash "${video.hash}" has a copyright warning — review usage.`}
        </div>
      </div>

      {/* Processing */}
      <div className="detail-section">
        <h3>Processing Status</h3>
        <div className={`checker-result ${video.processingError ? "warn" : "safe"}`}>
          {video.processingError
            ? "⚠️ Processing error detected — safe fallback slide is being displayed."
            : "✅ Video processed successfully — all systems normal."}
        </div>
      </div>

      {/* Quality Segments */}
      <div className="detail-section">
        <h3>Quality Segments ({segments.length} segments × 3 min)</h3>
        <div className="segments">
          {segments.map((seg) => (
            <div className="segment" key={seg.id}>
              <span className="segment-num">Seg {seg.id}</span>
              <span className="segment-range">{seg.start}–{seg.end} min</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-back" onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default VideoDetail;
