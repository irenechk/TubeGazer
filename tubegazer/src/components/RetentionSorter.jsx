import { useMemo, useState, useCallback } from "react";
import { videos } from "../data/video.js";

const SORT_OPTIONS = [
  { value: "retention", label: "Retention %" },
  { value: "views",     label: "Views" },
  { value: "likes",     label: "Likes" },
];

function RetentionSorter() {
  const [sortBy, setSortBy] = useState("retention");

  const handleSortChange = useCallback((val) => {
    setSortBy(val);
  }, []);

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sortBy]);

  const topVideo = sortedVideos[0];

  return (
    <section className="section card" id="retention">
      <div className="section-header">
        <h2>📈 Retention Sorter</h2>
        <div className="sort-pills">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`sort-pill ${sortBy === opt.value ? "active" : ""}`}
              onClick={() => handleSortChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="section-sub">
        Top performer: <strong>{topVideo.title}</strong> ({topVideo[sortBy]}{sortBy === "retention" ? "%" : ""})
      </p>

      <div className="retention-list">
        {sortedVideos.map((video, index) => (
          <div className="list-item" key={video.id}>
            <span className={`rank-badge ${index === 0 ? "rank-gold" : index === 1 ? "rank-silver" : index === 2 ? "rank-bronze" : ""}`}>
              #{index + 1}
            </span>
            <div className="list-info">
              <h4>{video.title}</h4>
              <div className="list-bar-row">
                <div className="list-bar">
                  <div
                    className="list-bar-fill"
                    style={{
                      width: sortBy === "retention"
                        ? `${video.retention}%`
                        : `${Math.min((video[sortBy] / sortedVideos[0][sortBy]) * 100, 100)}%`
                    }}
                  />
                </div>
                <span className="list-val">
                  {sortBy === "retention" ? `${video.retention}%` : video[sortBy]?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RetentionSorter;