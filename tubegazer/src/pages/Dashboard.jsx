import { useMemo } from "react";
import VideoStatsDashboard from "../components/VideoStatsDashboard";
import RetentionSorter from "../components/RetentionSorter";
import CopyrightChecker from "../components/CopyrightChecker";
import WatchHistoryUndo from "../components/WatchHistoryUndo";
import NextVideoQueue from "../components/NextVideoQueue";
import ChannelLinkHub from "../components/ChannelLinkHub";
import VideoProcessingSafety from "../components/VideoProcessingSafety";
import QualityOptimizer from "../components/QualityOptimizer";
import BestTimePredictor from "../components/BestTimePredictor";
import CrossPlatformReach from "../components/CrossPlatformReach";
import CreatorFeed from "../components/CreatorFeed";
import { channelStats } from "../data/video.js";

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n;
}

function Dashboard() {
  const stats = useMemo(() => [
    { label: "Total Views",   value: formatNum(channelStats.totalViews),       icon: "👁" },
    { label: "Subscribers",   value: formatNum(channelStats.totalSubscribers), icon: "👥" },
    { label: "Videos",        value: channelStats.totalVideos,                 icon: "🎬" },
    { label: "Avg Retention", value: channelStats.avgRetention + "%",          icon: "📈" },
  ], []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <p className="tag">Creator Command Center</p>
          <h1>TubeGazer</h1>
          <p className="hero-desc">
            Track video performance, copyright safety, retention, upload timing,
            cross-platform reach and quality optimization — all in one powerful dashboard.
          </p>
          <div className="hero-actions">
            <a href="#stats" className="btn-primary">Explore Analytics →</a>
            <a href="#reach" className="btn-ghost">Cross-Platform Panel</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-score-card">
            <p className="score-label">Creator Score</p>
            <h2 className="score-value">{channelStats.creatorScore}%</h2>
            <p className="score-sub">Channel performance is strong</p>
            <div className="score-growth">{channelStats.monthlyGrowth} this month</div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="stats-strip">
        {stats.map((s) => (
          <div className="stat-chip" key={s.label}>
            <span className="stat-chip-icon">{s.icon}</span>
            <div>
              <p className="stat-chip-val">{s.value}</p>
              <p className="stat-chip-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <VideoStatsDashboard />

      <div className="grid-two">
        <RetentionSorter />
        <CopyrightChecker />
      </div>

      <div className="grid-two">
        <WatchHistoryUndo />
        <NextVideoQueue />
      </div>

      <div className="grid-two">
        <ChannelLinkHub />
        <VideoProcessingSafety />
      </div>

      <QualityOptimizer />

      <BestTimePredictor />

      <CrossPlatformReach />

      <CreatorFeed />
    </>
  );
}

export default Dashboard;
