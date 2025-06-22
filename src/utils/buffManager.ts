import { Hero, Buff } from '../types/game';

export function applyBuff(hero: Hero, newBuff: Buff): Hero {
  const now = Date.now();
  const updatedBuffs = [
    ...(hero.activeBuffs || []).filter(b => b.expiresAt > now && b.id !== newBuff.id),
    { ...newBuff }
  ];

  return {
    ...hero,
    activeBuffs: updatedBuffs
  };
}

export function clearExpiredBuffs(hero: Hero): Hero {
  const now = Date.now();
  return {
    ...hero,
    activeBuffs: (hero.activeBuffs || []).filter(buff => buff.expiresAt > now)
  };
}
