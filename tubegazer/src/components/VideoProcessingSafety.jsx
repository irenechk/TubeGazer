import { videos } from "../data/video.js";

function VideoProcessingSafety() {
  const errorCount = videos.filter((v) => v.processingError).length;
  const safeCount = videos.length - errorCount;

  return (
    <section className="section card" id="safety">
      <h2>✅ Video Processing Safety</h2>
      <p className="section-sub">Monitor processing health across all your videos.</p>

      <div className="safety-summary">
        <div className="safety-stat safe-stat">
          <span className="safety-count">{safeCount}</span>
          <span>Processed OK</span>
        </div>
        <div className="safety-stat error-stat">
          <span className="safety-count">{errorCount}</span>
          <span>Need Attention</span>
        </div>
      </div>

      <div className="safety-list">
        {videos.map((video) => (
          <div className={`safety-box ${video.processingError ? "safety-error" : "safety-ok"}`} key={video.id}>
            <span className="safety-thumb">{video.thumbnail}</span>
            <div className="safety-info">
              <h4>{video.title}</h4>
              <span className="safety-duration">{video.duration} min · {video.category}</span>
            </div>
            <div className="safety-status">
              {video.processingError ? (
                <span className="status-badge warn">⚠️ Error — Fallback Active</span>
              ) : (
                <span className="status-badge safe">✅ Processed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideoProcessingSafety;