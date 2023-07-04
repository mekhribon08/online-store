import { useEffect, useState } from "react";

export default function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(url);
  }, [url]);

  async function fetchPosts(url) {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: method,
      });
      const data = await res.json();

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
  };
}
