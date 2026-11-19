import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readStore, writeStore } from '../utils/storage';

const SCALES = [0.9, 1, 1.12, 1.25];
const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [index, setIndex] = useState(() => {
    const stored = Number(readStore('iaf-font-scale', 1));
    return SCALES.includes(stored) ? SCALES.indexOf(stored) : 1;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(SCALES[index]));
    writeStore('iaf-font-scale', String(SCALES[index]));
  }, [index]);

  const value = useMemo(
    () => ({
      scale: SCALES[index],
      canDecrease: index > 0,
      canIncrease: index < SCALES.length - 1,
      decrease: () => setIndex((i) => Math.max(0, i - 1)),
      increase: () => setIndex((i) => Math.min(SCALES.length - 1, i + 1)),
      reset: () => setIndex(1),
    }),
    [index],
  );
  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
