import { useRef, useState, useCallback } from "react";

function WatchHistoryUndo() {
  const historyRef = useRef([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);

  const moveForward = useCallback(() => {
    historyRef.current.push(currentTime);
    const newStack = [...historyRef.current].slice(-5);
    setHistoryStack(newStack);
    setCurrentTime((prev) => prev + 30);
  }, [currentTime]);

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const previousTime = historyRef.current.pop();
    setHistoryStack([...historyRef.current].slice(-5));
    setCurrentTime(previousTime);
  }, []);

  const reset = useCallback(() => {
    historyRef.current = [];
    setHistoryStack([]);
    setCurrentTime(0);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="section card" id="history">
      <h2>⏪ Watch History Undo</h2>
      <p className="section-sub">Simulate and undo video watch position changes.</p>

      <div className="watch-display">
        <div className="watch-time-card">
          <span className="watch-label">Current Position</span>
          <span className="watch-time">{formatTime(currentTime)}</span>
          <span className="watch-secs">{currentTime}s</span>
        </div>
      </div>

      <div className="watch-controls">
        <button onClick={moveForward}>⏩ +30 Seconds</button>
        <button className="secondary" onClick={undo} disabled={historyStack.length === 0}>
          ↩ Undo
        </button>
        <button className="danger" onClick={reset}>↺ Reset</button>
      </div>

      {historyStack.length > 0 && (
        <div className="history-stack">
          <p className="stack-label">Position History (last {historyStack.length})</p>
          <div className="stack-list">
            {[...historyStack].reverse().map((t, i) => (
              <span key={i} className="stack-pill">
                {formatTime(t)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default WatchHistoryUndo;