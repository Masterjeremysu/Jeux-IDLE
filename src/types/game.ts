// ✅ Types de base

export type HeroClass = 'warrior' | 'mage' | 'rogue';

export interface Buff {
  id: string;
  label: string;
  icon: string;
  type: 'atk' | 'def' | 'crit' | 'hp'; // ✅ restreint aux valeurs autorisées
  value: number;
  duration: number;
  expiresAt: number;
  price: number;
}

export interface Hero {
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  critChance: number;
  critMultiplier: number;
  gold: number;
  xp: number;
  level: number;
  potions: number;
  isDefending: boolean;
  activeBuffs: Buff[]; // ✅ buffs actifs en cours
  class?: HeroClass;   // ✅ optionnel si besoin pour affichage/stats
}

export interface Enemy {
  id: string;
  name: string;
  emoji: string;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  goldReward: number;
  xpReward: number;
  isBoss: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'helmet' | 'armor';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  bonuses: {
    atk?: number;
    def?: number;
    hp?: number;
    critChance?: number;
  };
  emoji: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (gameState: GameState) => boolean;
  reward: {
    xp: number;
    gold: number;
  };
  unlocked: boolean;
  emoji: string;
}

export interface GameState {
  hero: Hero;
  currentEnemy: Enemy | null;
  inventory: Equipment[];
  equippedItems: {
    weapon?: Equipment;
    helmet?: Equipment;
    armor?: Equipment;
  };
  achievements: Achievement[];
  enemiesKilled: number;
  isAutoMode: boolean;
  combatLog: string[];

  // ✅ 🔥 Ajout important ici : potion incluse dans les upgrades
  shopUpgrades: {
    hp: number;
    atk: number;
    def: number;
    crit: number;
    potion: number; // ✅ AJOUT pour faire fonctionner .potion dans Shop.tsx
  };
}

export interface CombatResult {
  damage: number;
  isCritical: boolean;
  isDead: boolean;
}
