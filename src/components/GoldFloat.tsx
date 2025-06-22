// src/components/GoldFloat.tsx
import { useEffect, useState } from 'react';

export function GoldFloat({ amount }: { amount: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute top-0 right-4 text-yellow-400 text-lg font-bold animate-float-up z-50 pointer-events-none">
      💸 -{amount}g
    </div>
  );
}
