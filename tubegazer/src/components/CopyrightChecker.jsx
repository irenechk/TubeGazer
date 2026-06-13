import { useState, useCallback } from "react";
import { licenseDatabase } from "../data/video.js";

function CopyrightChecker() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const checkCopyright = useCallback(() => {
    if (!hash.trim()) {
      setResult({ status: "error", message: "Please enter a video hash." });
      return;
    }
    const found = licenseDatabase.find(
      (item) => item.toLowerCase() === hash.toLowerCase()
    );
    if (found) {
      setResult({ status: "safe", message: `✅ License found — "${hash.toUpperCase()}" is copyright safe.` });
    } else {
      setResult({ status: "warn", message: `⚠️ Hash not found — "${hash.toUpperCase()}" may have copyright issues.` });
    }
  }, [hash]);

  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Enter") checkCopyright(); },
    [checkCopyright]
  );

  const handleClear = useCallback(() => {
    setHash("");
    setResult(null);
  }, []);

  return (
    <section className="section card" id="copyright">
      <h2>🛡️ Copyright Checker</h2>
      <p className="section-sub">Verify if your video hash exists in the license database.</p>

      <div className="checker-input-row">
        <input
          type="text"
          placeholder="Enter video hash (e.g. RX101, JS202)"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="checker-actions">
        <button onClick={checkCopyright}>🔍 Verify Hash</button>
        {hash && <button className="secondary" onClick={handleClear}>Clear</button>}
      </div>

      {result && (
        <div className={`checker-result ${result.status}`}>
          {result.message}
        </div>
      )}

      <div className="hash-hints">
        <p className="hints-label">Try these hashes:</p>
        <div className="hint-pills">
          {["RX101", "JS202", "CSS303", "ND404"].map((h) => (
            <button key={h} className="hint-pill" onClick={() => setHash(h)}>
              {h}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CopyrightChecker;