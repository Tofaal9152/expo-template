import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";

export const useSearchDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue] = useDebounce(value, delay);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  const resetSearch = useCallback(() => {
    setPage(1);
  }, []);

  return {
    debouncedValue,
    page,
    setPage,
    resetSearch,
  };
};
