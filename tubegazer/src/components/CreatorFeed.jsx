import { useMemo } from "react";
import { useFetchFeed } from "../hooks/useFetchFeed";
import { videos, channelStats } from "../data/video.js";

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n;
}

function CreatorFeed() {
  const { feed, loading, error } = useFetchFeed();

  // Channel-specific insights derived from video data
  const channelInsights = useMemo(() => {
    const best = [...videos].sort((a, b) => b.views - a.views)[0];
    const worst = [...videos].sort((a, b) => a.retention - b.retention)[0];
    const avgViews = Math.round(videos.reduce((s, v) => s + v.views, 0) / videos.length);
    const copyrightWarnings = videos.filter((v) => v.copyright !== "Safe").length;
    const totalLikes = videos.reduce((s, v) => s + v.likes, 0);

    return [
      {
        icon: "🔥",
        color: "#ff4b6e",
        label: "Top Performing Video",
        body: `"${best.title}" is leading with ${formatNum(best.views)} views and ${best.retention}% retention. Double down on this content style!`,
      },
      {
        icon: "⚠️",
        color: "#ffc107",
        label: "Retention Alert",
        body: `"${worst.title}" has the lowest retention at ${worst.retention}%. Review your hook strategy and pacing for this video.`,
      },
      {
        icon: "📊",
        color: "#7df9ff",
        label: "Channel Average Views",
        body: `Your videos average ${formatNum(avgViews)} views each. The channel has earned ${formatNum(totalLikes)} total likes — keep the momentum!`,
      },
      {
        icon: "🛡️",
        color: copyrightWarnings > 0 ? "#ffc107" : "#00ffaa",
        label: "Copyright Health",
        body: copyrightWarnings > 0
          ? `${copyrightWarnings} video(s) have copyright warnings. Check hashes in the Copyright Checker above.`
          : `All ${videos.length} videos are copyright safe. Your licensing is in great shape!`,
      },
      {
        icon: "🎯",
        color: "#a855f7",
        label: "Creator Score",
        body: `Your overall creator score is ${channelStats.creatorScore}% — up ${channelStats.monthlyGrowth} this month. Consistency is key to hitting 100!`,
      },
    ];
  }, []);

  return (
    <section className="section" id="feed">
      <div className="section-header">
        <h2>📡 Channel Insights Feed</h2>
        <span className="section-badge live-badge">● Live Analytics</span>
      </div>
      <p className="section-sub">
        Personalized insights for your channel — plus trending creator tips from the community.
      </p>

      {/* Channel-specific insights (from local video data) */}
      <div className="feed-channel-label">Your Channel · Powered by TubeGazer AI</div>
      <div className="feed-grid feed-insights">
        {channelInsights.map((insight, i) => (
          <div className="feed-card insight-card" key={i} style={{ "--insight-color": insight.color }}>
            <div className="insight-header">
              <span className="insight-icon">{insight.icon}</span>
              <strong className="insight-label" style={{ color: insight.color }}>{insight.label}</strong>
            </div>
            <p className="feed-body">{insight.body}</p>
          </div>
        ))}
      </div>

      {/* Community tips from DummyJSON API (useEffect) */}
      <div className="feed-channel-label" style={{ marginTop: "24px" }}>
        Creator Community · Live from the Web
      </div>

      {loading && (
        <div className="feed-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="feed-card skeleton">
              <div className="skeleton-line wide" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="feed-error">⚠️ Could not load community feed: {error}</div>
      )}

      {!loading && !error && (
        <div className="feed-grid">
          {feed.map((post) => (
            <div className="feed-card" key={post.id}>
              <div className="feed-tags">
                {post.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="feed-tag">#{tag}</span>
                ))}
              </div>
              <h4 className="feed-title">{post.title}</h4>
              <p className="feed-body">{post.body}</p>
              <div className="feed-meta">
                <span>👍 {post.reactions?.likes ?? 0}</span>
                <span>👎 {post.reactions?.dislikes ?? 0}</span>
                <span>👁 {post.views ?? "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CreatorFeed;
