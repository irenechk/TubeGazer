import { useReducer, useState, useCallback } from "react";

const initialQueue = [
  "React Hooks Explained",
  "JavaScript Array Methods",
  "CSS Grid Layout Mastery",
];

function queueReducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (!action.video.trim()) return state;
      return [...state, action.video.trim()];
    case "PLAY_NEXT":
      return state.slice(1);
    case "REMOVE":
      return state.filter((_, i) => i !== action.index);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function NextVideoQueue() {
  const [queue, dispatch] = useReducer(queueReducer, initialQueue);
  const [inputVal, setInputVal] = useState("");

  const handleAdd = useCallback(() => {
    if (!inputVal.trim()) return;
    dispatch({ type: "ADD", video: inputVal });
    setInputVal("");
  }, [inputVal]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleAdd();
    },
    [handleAdd]
  );

  return (
    <section className="section card" id="queue">
      <h2>🎬 Next Video Queue</h2>
      <p className="section-sub">Manage your upcoming content schedule.</p>

      <div className="queue-input-row">
        <input
          type="text"
          placeholder="Add a video title..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd} className="btn-add">+ Add</button>
      </div>

      <div className="queue-list">
        {queue.length === 0 ? (
          <p className="empty-state">Queue is empty. Add a video above!</p>
        ) : (
          queue.map((video, index) => (
            <div className="queue-item" key={index}>
              <span className="queue-num">{index + 1}</span>
              <span className="queue-title">{video}</span>
              <div className="queue-actions">
                {index === 0 && (
                  <span className="queue-next-badge">Up Next</span>
                )}
                <button
                  className="btn-icon"
                  onClick={() => dispatch({ type: "REMOVE", index })}
                  title="Remove"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {queue.length > 0 && (
        <div className="queue-footer">
          <button className="secondary" onClick={() => dispatch({ type: "PLAY_NEXT" })}>
            ▶ Play Next
          </button>
          <button className="danger" onClick={() => dispatch({ type: "CLEAR" })}>
            🗑 Clear All
          </button>
        </div>
      )}
    </section>
  );
}

export default NextVideoQueue;