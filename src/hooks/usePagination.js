import { useEffect, useMemo, useState } from 'react';

/** Client-side pagination; resets to page 1 whenever `resetKey` changes. */
export function usePagination(items, perPage, resetKey) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  useEffect(() => setPage(1), [resetKey]);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);
  const slice = useMemo(() => items.slice((page - 1) * perPage, page * perPage), [items, page, perPage]);
  return { page, pages, setPage, slice };
}
