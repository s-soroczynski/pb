import React, { useState, useEffect } from "react";
import { getItemFromLocalStorage } from "../helpers";

type UseFetch<T> = {
  response: T | null;
  loading: boolean;
  error: any;
};

export const useFetch = <T>(
  url: string,
  withAuth: boolean = false
): UseFetch<T> => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      setLoading(true);
      let options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
        },
      };

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (e: any) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { response, error, loading };
};
