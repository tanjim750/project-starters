import { useEffect, useState } from "react";

export function useLocalStorage<TValue>(key: string, initialValue: TValue) {
  const [value, setValue] = useState<TValue>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as TValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
