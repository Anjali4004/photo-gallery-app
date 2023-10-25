import { useState, useEffect } from "react";
import { getNodes } from "../api/axios";

export const useNodes = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;

    getNodes(page, { signal })
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data.nodes]);
        setHasNextPage(Boolean(data.nodes.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });
  }, [page]);
  const handleCallback = () => {
    setPage((page) => page + 1);
  };

  return { isLoading, isError, error, items, hasNextPage, handleCallback };
};
