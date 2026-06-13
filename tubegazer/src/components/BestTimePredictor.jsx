import { useMemo, useState, useCallback } from "react";
import { videos } from "../data/video.js";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_SLOTS = [
  { label: "Morning",   range: "6 AM – 10 AM",  hours: [6, 7, 8, 9] },
  { label: "Midday",    range: "10 AM – 2 PM",  hours: [10, 11, 12, 13] },
  { label: "Afternoon", range: "2 PM – 6 PM",   hours: [14, 15, 16, 17] },
  { label: "Evening",   range: "6 PM – 10 PM",  hours: [18, 19, 20, 21] },
  { label: "Night",     range: "10 PM – 2 AM",  hours: [22, 23, 0, 1] },
];

function BestTimePredictor() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [metric, setMetric] = useState("views");

  const handleDayClick = useCallback((day) => {
    setSelectedDay((prev) => (prev === day ? null : day));
  }, []);

  // Build engagement heatmap: day → slot → total metric
  const heatmap = useMemo(() => {
    const map = {};
    DAYS.forEach((day) => {
      map[day] = {};
      TIME_SLOTS.forEach((slot) => {
        const relevant = videos.filter(
          (v) => v.uploadDay === day && slot.hours.includes(v.uploadHour)
        );
        const total = relevant.reduce((sum, v) => sum + (v[metric] || 0), 0);
        map[day][slot.label] = { total, count: relevant.length };
      });
    });
    return map;
  }, [metric]);

  // Global max for scaling colors
  const globalMax = useMemo(() => {
    let max = 0;
    Object.values(heatmap).forEach((dayData) => {
      Object.values(dayData).forEach(({ total }) => {
        if (total > max) max = total;
      });
    });
    return max || 1;
  }, [heatmap]);

  // Top 3 recommendations
  const recommendations = useMemo(() => {
    const slots = [];
    DAYS.forEach((day) => {
      TIME_SLOTS.forEach((slot) => {
        const { total, count } = heatmap[day][slot.label];
        if (count > 0) slots.push({ day, slot: slot.label, range: slot.range, total, count });
      });
    });
    return slots.sort((a, b) => b.total - a.total).slice(0, 3);
  }, [heatmap]);

  const filteredDays = selectedDay ? [selectedDay] : DAYS;

  return (
    <section className="section card full" id="predictor">
      <div className="section-header">
        <h2>🕐 Best Time to Upload Predictor</h2>
        <div className="sort-pills">
          {["views", "likes", "comments"].map((m) => (
            <button
              key={m}
              className={`sort-pill ${metric === m ? "active" : ""}`}
              onClick={() => setMetric(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <p className="section-sub">
        Based on your past upload performance — the darker the cell, the higher the engagement.
      </p>

      {/* Recommendations */}
      <div className="predictor-recs">
        {recommendations.map((rec, i) => (
          <div key={i} className={`rec-card rec-${i + 1}`}>
            <span className="rec-rank">#{i + 1}</span>
            <div className="rec-info">
              <p className="rec-slot">{rec.day} · {rec.range}</p>
              <p className="rec-val">
                {metric === "views" ? rec.total.toLocaleString() + " views" :
                 metric === "likes" ? rec.total.toLocaleString() + " likes" :
                 rec.total + " comments"}
              </p>
            </div>
            {i === 0 && <span className="rec-best-badge">Best Slot 🔥</span>}
          </div>
        ))}
      </div>

      {/* Day filter */}
      <div className="day-filter">
        {DAYS.map((day) => (
          <button
            key={day}
            className={`day-pill ${selectedDay === day ? "active" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day.slice(0, 3)}
          </button>
        ))}
        {selectedDay && (
          <button className="secondary day-pill" onClick={() => setSelectedDay(null)}>
            All Days
          </button>
        )}
      </div>

      {/* Heatmap grid */}
      <div className="heatmap">
        {/* Column headers */}
        <div className="heatmap-header">
          <div className="heatmap-corner" />
          {TIME_SLOTS.map((slot) => (
            <div key={slot.label} className="heatmap-col-label">
              <span className="slot-name">{slot.label}</span>
              <span className="slot-range">{slot.range}</span>
            </div>
          ))}
        </div>

        {filteredDays.map((day) => (
          <div key={day} className="heatmap-row">
            <div className="heatmap-row-label">{day.slice(0, 3)}</div>
            {TIME_SLOTS.map((slot) => {
              const { total, count } = heatmap[day][slot.label];
              const intensity = total / globalMax;
              const alpha = count === 0 ? 0.04 : 0.1 + intensity * 0.85;
              return (
                <div
                  key={slot.label}
                  className="heatmap-cell"
                  style={{
                    background: count === 0
                      ? "rgba(255,255,255,0.03)"
                      : `rgba(125, 249, 255, ${alpha})`,
                    borderColor: count > 0 ? `rgba(125,249,255,${alpha * 0.6})` : "transparent",
                  }}
                  title={`${day} ${slot.label}: ${total.toLocaleString()} ${metric} (${count} video${count !== 1 ? "s" : ""})`}
                >
                  {count > 0 && (
                    <>
                      <span className="cell-total">
                        {metric === "views"
                          ? total >= 1000 ? (total / 1000).toFixed(0) + "K" : total
                          : total}
                      </span>
                      <span className="cell-count">{count}v</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestTimePredictor;
