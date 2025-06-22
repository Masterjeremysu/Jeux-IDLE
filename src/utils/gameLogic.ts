import { Hero, Enemy, Equipment, CombatResult, GameState, Buff, Achievement } from '../types/game';
import {
  ENEMY_TEMPLATES,
  BOSS_TEMPLATES,
  EQUIPMENT_POOL,
  ACHIEVEMENTS
} from '../data/gameData';

export function generateEnemy(enemiesKilled: number): Enemy {
  const isBoss = (enemiesKilled + 1) % 10 === 0;
  const templates = isBoss ? BOSS_TEMPLATES : ENEMY_TEMPLATES;
  const template = templates[Math.floor(Math.random() * templates.length)];

  const levelMultiplier = Math.floor(enemiesKilled / 10) * 0.3 + 1;
  const baseHp = isBoss ? 250 : 100;

  return {
    ...template,
    id: `enemy_${Date.now()}_${Math.random()}`,
    hp: Math.floor(baseHp * levelMultiplier),
    maxHp: Math.floor(baseHp * levelMultiplier),
    atk: Math.floor(template.atk * levelMultiplier),
    def: Math.floor(template.def * levelMultiplier),
    goldReward: Math.floor(template.goldReward * levelMultiplier),
    xpReward: Math.floor(template.xpReward * levelMultiplier)
  };
}

export function calculateDamage(attacker: Hero | Enemy, defender: Hero | Enemy, isHeroDefending = false): CombatResult {
  const baseDamage = Math.max(1, attacker.atk - defender.def);
  let damage = baseDamage + Math.floor(Math.random() * 10) - 5;
  damage = Math.max(1, damage);

  if (isHeroDefending && 'isDefending' in defender) {
    damage = Math.floor(damage * 0.25);
    damage = Math.max(1, damage);
  }

  let isCritical = false;
  if ('critChance' in attacker) {
    isCritical = Math.random() * 100 < attacker.critChance;
    if (isCritical) {
      damage = Math.floor(damage * (attacker.critMultiplier / 100));
    }
  }

  const newHp = Math.max(0, defender.hp - damage);
  const isDead = newHp === 0;

  return { damage, isCritical, isDead };
}

export function generateLoot(): {
  gold: number;
  potion: boolean;
  equipment?: Equipment;
  buff?: Buff;
} {
  const gold = Math.floor(Math.random() * 41) + 10; // 10-50 gold
  const potion = Math.random() < 0.15;
  const dropBuff = Math.random() < 0.2; // 20% chance de drop buff

  let equipment: Equipment | undefined;
  let buff: Buff | undefined;

  if (Math.random() < 0.25) {
    const rarityRoll = Math.random();
    let rarityPool = EQUIPMENT_POOL;

    if (rarityRoll < 0.5) {
      rarityPool = rarityPool.filter(i => i.rarity === 'common');
    } else if (rarityRoll < 0.75) {
      rarityPool = rarityPool.filter(i => i.rarity === 'uncommon');
    } else if (rarityRoll < 0.9) {
      rarityPool = rarityPool.filter(i => i.rarity === 'rare');
    } else if (rarityRoll < 0.98) {
      rarityPool = rarityPool.filter(i => i.rarity === 'epic');
    } else {
      rarityPool = rarityPool.filter(i => i.rarity === 'legendary');
    }

    if (rarityPool.length > 0) {
      const template = rarityPool[Math.floor(Math.random() * rarityPool.length)];
      equipment = { ...template, id: `equipment_${Date.now()}_${Math.random()}` };
    }
  }

  if (dropBuff) {
    const buffTypes: Buff['type'][] = ['atk', 'def', 'crit', 'hp'];
    const type = buffTypes[Math.floor(Math.random() * buffTypes.length)];
    const value = type === 'crit' ? 10 : 15;
    const duration = 20;
    buff = {
      id: `buff_${Date.now()}`,
      label: `Bonus ${type.toUpperCase()}`,
      icon: '✨',
      type,
      value,
      duration,
      expiresAt: Date.now() + duration * 1000
    };
  }

  return { gold, potion, equipment, buff };
}

export function calculateHeroStats(
  hero: Hero,
  equippedItems: { weapon?: Equipment; helmet?: Equipment; armor?: Equipment }
): Hero {
  let totalAtk = hero.atk;
  let totalDef = hero.def;
  let totalMaxHp = hero.maxHp;
  let totalCritChance = hero.critChance;

  Object.values(equippedItems).forEach(item => {
    if (item) {
      totalAtk += item.bonuses.atk || 0;
      totalDef += item.bonuses.def || 0;
      totalMaxHp += item.bonuses.hp || 0;
      totalCritChance += item.bonuses.critChance || 0;
    }
  });

  if (hero.activeBuffs) {
    for (const buff of hero.activeBuffs) {
      switch (buff.type) {
        case 'atk':
          totalAtk += buff.value;
          break;
        case 'def':
          totalDef += buff.value;
          break;
        case 'hp':
          totalMaxHp += buff.value;
          break;
        case 'crit':
          totalCritChance += buff.value;
          break;
      }
    }
  }

  return {
    ...hero,
    atk: totalAtk,
    def: totalDef,
    maxHp: totalMaxHp,
    critChance: Math.min(95, totalCritChance),
    hp: Math.min(hero.hp, totalMaxHp)
  };
}

export function checkLevelUp(hero: Hero): { leveledUp: boolean; newLevel: number } {
  const xpNeeded = hero.level * 100;
  if (hero.xp >= xpNeeded) {
    return { leveledUp: true, newLevel: hero.level + 1 };
  }
  return { leveledUp: false, newLevel: hero.level };
}

export function checkAchievements(gameState: GameState): Achievement[] {
  return ACHIEVEMENTS.filter(
    achievement =>
      !gameState.achievements.find(a => a.id === achievement.id)?.unlocked &&
      achievement.condition(gameState)
  );
}

export function addCombatLog(logs: string[], message: string, maxLogs: number = 8): string[] {
  const newLogs = [message, ...logs];
  return newLogs.slice(0, maxLogs);
}
