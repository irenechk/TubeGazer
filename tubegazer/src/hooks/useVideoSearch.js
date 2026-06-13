import { useState, useMemo, useCallback } from "react";
import { videos } from "../data/video.js";

export function useVideoSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(lower) ||
        v.description.toLowerCase().includes(lower) ||
        v.tags.some((t) => t.includes(lower))
    );
  }, [query]);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return { query, results, handleSearch, clearSearch };
}
