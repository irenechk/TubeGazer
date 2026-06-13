import { useState, useCallback, useMemo } from "react";
import { videos } from "../data/video.js";

function QualityOptimizer() {
  const [duration, setDuration] = useState(12);

  const handleDurationChange = useCallback((e) => {
    const val = Math.max(1, Number(e.target.value));
    setDuration(val);
  }, []);

  const segments = useMemo(() => {
    const segmentLength = 3;
    const totalSegments = Math.ceil(duration / segmentLength);
    return Array.from({ length: totalSegments }, (_, index) => ({
      id: index + 1,
      start: index * segmentLength,
      end: Math.min((index + 1) * segmentLength, duration),
    }));
  }, [duration]);

  const qualityTip = useMemo(() => {
    if (duration <= 5) return { msg: "Short-form content — great for retention!", icon: "🚀" };
    if (duration <= 15) return { msg: "Optimal length for tutorial content.", icon: "✅" };
    if (duration <= 30) return { msg: "Consider adding chapters for navigation.", icon: "📖" };
    return { msg: "Long-form content — ensure high value density.", icon: "⚠️" };
  }, [duration]);

  return (
    <section className="section card full" id="quality">
      <div className="section-header">
        <div>
          <h2>⚡ Quality Optimizer</h2>
          <p className="section-sub">
            Splits video into buffering-optimized segments to improve playback quality.
          </p>
        </div>
        <div className="quality-tip">
          <span>{qualityTip.icon}</span>
          <span>{qualityTip.msg}</span>
        </div>
      </div>

      <div className="quality-controls">
        <label className="input-label">Video Duration (minutes)</label>
        <div className="duration-row">
          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            min={1}
            max={120}
            className="duration-input"
          />
          <span className="duration-display">{duration} min → {segments.length} segments</span>
        </div>
        <input
          type="range"
          min={1}
          max={60}
          value={duration}
          onChange={handleDurationChange}
          className="duration-slider"
        />
      </div>

      <div className="segments">
        {segments.map((segment) => (
          <div className="segment" key={segment.id}>
            <span className="segment-num">Seg {segment.id}</span>
            <span className="segment-range">{segment.start}–{segment.end} min</span>
          </div>
        ))}
      </div>

      {videos.filter((v) => v.processingError).length > 0 && (
        <div className="quality-warning">
          ⚠️ {videos.filter((v) => v.processingError).length} video(s) have processing errors and may need re-encoding.
        </div>
      )}
    </section>
  );
}

export default QualityOptimizer;