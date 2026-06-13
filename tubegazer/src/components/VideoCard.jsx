import { useNavigate } from "react-router-dom";

function formatViews(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

const performanceColors = {
  Viral: "badge-viral",
  Excellent: "badge-excellent",
  Good: "badge-good",
  Average: "badge-average",
};

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="card video-card"
      onClick={() => navigate(`/video/${video.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/video/${video.id}`)}
    >
      <div className="thumb">
        <span className="thumb-emoji">{video.thumbnail}</span>
        <span className={`perf-badge ${performanceColors[video.performance] || "badge-average"}`}>
          {video.performance}
        </span>
      </div>

      <div className="video-card-body">
        <span className="video-category">{video.category}</span>
        <h3 className="video-title">{video.title}</h3>
        <p className="video-desc">{video.description}</p>

        <div className="stats-row">
          <span>👁 {formatViews(video.views)}</span>
          <span>❤️ {formatViews(video.likes)}</span>
          <span>💬 {video.comments}</span>
        </div>

        <div className="progress">
          <div style={{ width: `${video.retention}%` }}></div>
        </div>
        <div className="retention-label">
          <span>{video.retention}% retention</span>
          <span className={video.copyright === "Safe" ? "text-safe" : "text-warn"}>
            {video.copyright === "Safe" ? "✅ Licensed" : "⚠️ Warning"}
          </span>
        </div>

        <p className="video-card-cta">View Details →</p>
      </div>
    </div>
  );
}

export default VideoCard;