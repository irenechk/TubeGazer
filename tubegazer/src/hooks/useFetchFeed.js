import { useState, useEffect } from "react";

export function useFetchFeed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://dummyjson.com/posts?limit=4&skip=0");
        if (!res.ok) throw new Error("Failed to fetch creator tips");
        const data = await res.json();
        if (!cancelled) {
          setFeed(data.posts);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFeed();

    return () => {
      cancelled = true;
    };
  }, []);

  return { feed, loading, error };
}
