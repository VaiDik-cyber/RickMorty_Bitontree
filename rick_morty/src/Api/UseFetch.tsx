import { useCallback, useState, useEffect } from "react";

interface FetchResult {
  data: [];
  error: Error | null;
  loading: boolean;
}

function useFetch(url: string, fullUrl: string): FetchResult {
  const [data, setData] = useState<[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const URL: string =
    url.length !== 0 ? `https://rickandmortyapi.com/api/${url}` : fullUrl;

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const fetchedData = await res.json();

      // You should see fetched data in the console to verify it contains the expected data.

      setData(fetchedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [URL]);

  useEffect(() => {
    fetchCharacters();
  }, [URL, fetchCharacters]);

  return { data, error, loading };
}

export default useFetch;
