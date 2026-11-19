import { useEffect, useRef } from 'react';

let observer;
function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  return observer;
}

/** Shared IntersectionObserver: adds `.is-visible` once an element enters the viewport. */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el) return undefined;
    if (!obs) {
      el.classList.add('is-visible');
      return undefined;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return ref;
}
