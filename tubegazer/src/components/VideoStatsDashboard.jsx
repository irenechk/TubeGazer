import { videos } from "../data/video.js";
import VideoCard from "./VideoCard";

function VideoStatsDashboard() {
  return (
    <section className="section" id="stats">
      <div className="section-header">
        <h2>📊 Video Stats Dashboard</h2>
        <span className="section-badge">{videos.length} Videos</span>
      </div>
      <p className="section-sub">Click any video card to view detailed analytics.</p>

      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default VideoStatsDashboard;