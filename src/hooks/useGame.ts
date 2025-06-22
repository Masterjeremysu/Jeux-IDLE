import { useState, useEffect, useCallback } from 'react';
import { GameState, Hero, Equipment, Buff } from '../types/game';
import {
  generateEnemy,
  calculateDamage,
  generateLoot,
  calculateHeroStats,
  checkLevelUp,
  checkAchievements,
  addCombatLog
} from '../utils/gameLogic';
import { ACHIEVEMENTS, SHOP_PRICES, SHOP_BUFFS, EQUIPMENT_POOL } from '../data/gameData';
import { applyBuff, clearExpiredBuffs } from '../utils/buffManager';

const INITIAL_HERO: Hero = {
  hp: 100,
  maxHp: 100,
  atk: 20,
  def: 10,
  critChance: 5,
  critMultiplier: 150,
  gold: 100,
  xp: 0,
  level: 1,
  potions: 3,
  isDefending: false,
  class: 'warrior',
  activeBuffs: []
};

const INITIAL_STATE: GameState = {
  hero: INITIAL_HERO,
  currentEnemy: null,
  inventory: [],
  equippedItems: {},
  achievements: ACHIEVEMENTS.map(a => ({ ...a })),
  enemiesKilled: 0,
  isAutoMode: false,
  combatLog: ['🎮 Welcome to Fantasy Idle RPG! Start your adventure!'],
  shopUpgrades: { hp: 0, atk: 0, def: 0, crit: 0, potion: 0 }
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [availableBuffs, setAvailableBuffs] = useState<Buff[]>(() =>
    SHOP_BUFFS.slice(0, 3).map(b => ({ ...b, type: b.type as Buff['type'], expiresAt: 0 }))
  );
  const [combatAnimations, setCombatAnimations] = useState({
    heroAttack: false,
    enemyAttack: false,
    heroCrit: false,
    enemyCrit: false
  });

  const effectiveHero = calculateHeroStats(gameState.hero, gameState.equippedItems);

  const spawnEnemy = useCallback(() => {
    const newEnemy = generateEnemy(gameState.enemiesKilled);
    setGameState(prev => ({
      ...prev,
      currentEnemy: newEnemy,
      combatLog: addCombatLog(prev.combatLog, `${newEnemy.emoji} ${newEnemy.name} appears!${newEnemy.isBoss ? ' 👑 BOSS FIGHT!' : ''}`)
    }));
  }, [gameState.enemiesKilled]);

  const enemyAttack = useCallback(() => {
    if (!gameState.currentEnemy || gameState.currentEnemy.hp <= 0 || effectiveHero.hp <= 0) return;
    setCombatAnimations(a => ({ ...a, enemyAttack: true }));
    setTimeout(() => setCombatAnimations(a => ({ ...a, enemyAttack: false })), 300);

    const result = calculateDamage(gameState.currentEnemy, effectiveHero, gameState.hero.isDefending);
    const damage = result.damage;

    setGameState(prev => {
      const newHero = {
        ...prev.hero,
        hp: Math.max(0, prev.hero.hp - damage),
        isDefending: false
      };
      const critText = result.isCritical ? ' ⚡ CRITICAL!' : '';
      const defendText = prev.hero.isDefending ? ' (🛡️ defended)' : '';
      const newLog = `${prev.currentEnemy?.emoji} ${prev.currentEnemy?.name} deals ${damage} damage${critText}${defendText}`;
      return {
        ...prev,
        hero: newHero,
        combatLog: addCombatLog(prev.combatLog, newLog)
      };
    });
  }, [gameState.currentEnemy, effectiveHero, gameState.hero.isDefending]);

  const heroAttack = useCallback(() => {
    if (!gameState.currentEnemy || effectiveHero.hp <= 0) return;

    setCombatAnimations(a => ({ ...a, heroAttack: true }));
    setTimeout(() => setCombatAnimations(a => ({ ...a, heroAttack: false })), 300);

    const result = calculateDamage(effectiveHero, gameState.currentEnemy);
    const { damage, isCritical } = result;

    if (isCritical) {
      setCombatAnimations(a => ({ ...a, heroCrit: true }));
      setTimeout(() => setCombatAnimations(a => ({ ...a, heroCrit: false })), 500);
    }

    setGameState(prev => {
      if (!prev.currentEnemy) return prev;

      const updatedEnemy = { ...prev.currentEnemy, hp: Math.max(0, prev.currentEnemy.hp - damage) };
      const newLog = `⚔️ You deal ${damage} damage${isCritical ? ' ⚡ CRITICAL!' : ''}`;

      if (updatedEnemy.hp <= 0) {
        const loot = generateLoot();
        const updatedHero = { ...prev.hero };
        const inventory = [...prev.inventory];

        updatedHero.gold += loot.gold + prev.currentEnemy.goldReward;
        updatedHero.xp += prev.currentEnemy.xpReward;
        if (loot.potion) updatedHero.potions += 1;
        if (loot.equipment) inventory.push(loot.equipment);
        if (loot.buff) updatedHero.activeBuffs.push({ ...loot.buff, type: loot.buff.type as Buff['type'], expiresAt: Date.now() + loot.buff.duration * 1000 });

        const levelUp = checkLevelUp(updatedHero);
        if (levelUp.leveledUp) {
          updatedHero.level = levelUp.newLevel;
          updatedHero.maxHp += 10;
          updatedHero.atk += 1;
          updatedHero.hp = Math.min(updatedHero.hp + 10, updatedHero.maxHp);
          updatedHero.xp -= (levelUp.newLevel - 1) * 100;
        }

        const newEnemiesKilled = prev.enemiesKilled + 1;
        let log = addCombatLog(prev.combatLog, newLog);
        log = addCombatLog(log, `💀 ${prev.currentEnemy.name} defeated!`);
        log = addCombatLog(log, `💰 +${loot.gold}g ✨ +${prev.currentEnemy.xpReward}XP`);
        if (loot.potion) log = addCombatLog(log, '🧪 Found a health potion!');
        if (loot.equipment) log = addCombatLog(log, `⚡ Looted ${loot.equipment.emoji} ${loot.equipment.name} (${loot.equipment.rarity})`);
        if (loot.buff) log = addCombatLog(log, `🧬 Gained Buff: ${loot.buff.icon} ${loot.buff.label} (+${loot.buff.value} ${loot.buff.type.toUpperCase()})`);
        if (levelUp.leveledUp) log = addCombatLog(log, `🎉 LEVEL UP! Now level ${levelUp.newLevel}`);

        const nextState = {
          ...prev,
          hero: updatedHero,
          currentEnemy: null,
          inventory,
          enemiesKilled: newEnemiesKilled,
          combatLog: log
        };

        const unlocked = checkAchievements(nextState);
        if (unlocked.length > 0) {
          unlocked.forEach(a => {
            updatedHero.gold += a.reward.gold;
            updatedHero.xp += a.reward.xp;
            log = addCombatLog(log, `🏆 Achievement Unlocked: ${a.name} (+${a.reward.gold}g, +${a.reward.xp}XP)`);
          });
          const achievements = prev.achievements.map(a =>
            unlocked.find(u => u.id === a.id) ? { ...a, unlocked: true } : a
          );
          setTimeout(spawnEnemy, 1500);
          return { ...nextState, hero: updatedHero, achievements, combatLog: log };
        }

        setTimeout(spawnEnemy, 1500);
        return nextState;
      }

      return {
        ...prev,
        currentEnemy: updatedEnemy,
        combatLog: addCombatLog(prev.combatLog, newLog)
      };
    });

    setTimeout(() => {
      setGameState(current => {
        if (current.currentEnemy?.hp && current.currentEnemy.hp > 0 && current.hero.hp > 0) {
          enemyAttack();
        }
        return current;
      });
    }, 800);
  }, [gameState.currentEnemy, effectiveHero, spawnEnemy, enemyAttack]);

  const defend = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hero: { ...prev.hero, isDefending: true },
      combatLog: addCombatLog(prev.combatLog, '🛡️ You prepare to defend! (-75% damage next turn)')
    }));
    setTimeout(() => enemyAttack(), 800);
  }, [enemyAttack]);

  const usePotion = useCallback(() => {
    setGameState(prev => {
      if (prev.hero.potions <= 0 || prev.hero.hp >= effectiveHero.maxHp) return prev;
      const healAmount = Math.floor(effectiveHero.maxHp * 0.3);
      const newHp = Math.min(prev.hero.hp + healAmount, effectiveHero.maxHp);
      return {
        ...prev,
        hero: { ...prev.hero, hp: newHp, potions: prev.hero.potions - 1 },
        combatLog: addCombatLog(prev.combatLog, `🧪 Used health potion! Healed ${healAmount} HP`)
      };
    });
  }, [effectiveHero.maxHp]);

  const toggleAutoMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isAutoMode: !prev.isAutoMode,
      combatLog: addCombatLog(prev.combatLog, `🤖 Auto Mode ${!prev.isAutoMode ? 'enabled' : 'disabled'}`)
    }));
  }, []);

  const buyUpgrade = useCallback((type: keyof typeof SHOP_PRICES) => {
  setGameState(prev => {
    const currentLevel = prev.shopUpgrades[type];
    const cost = type === 'potion'
      ? SHOP_PRICES.potion
      : SHOP_PRICES[type] * (currentLevel + 1);

    if (prev.hero.gold < cost) return prev;

    const newHero = { ...prev.hero, gold: prev.hero.gold - cost };
    const newUpgrades = { ...prev.shopUpgrades };

    switch (type) {
      case 'hp':
        newHero.maxHp += 10;
        newHero.hp = Math.min(newHero.hp + 10, newHero.maxHp);
        newUpgrades.hp += 1;
        break;
      case 'atk':
        newHero.atk += 5;
        newUpgrades.atk += 1;
        break;
      case 'def':
        newHero.def += 5;
        newUpgrades.def += 1;
        break;
      case 'crit':
        newHero.critChance += 5;
        newUpgrades.crit += 1;
        break;
      case 'potion':
        newHero.potions += 1;
        break;
    }

    return {
      ...prev,
      hero: newHero,
      shopUpgrades: newUpgrades,
      combatLog: addCombatLog(prev.combatLog, `🛒 Purchased ${type.toUpperCase()} upgrade for ${cost}g!`)
    };
  });
  }, []);

  const buyThreePotions = useCallback(() => {
  const price = SHOP_PRICES.potion * 2;
  setGameState(prev => {
    if (prev.hero.gold < price) return prev;
    return {
      ...prev,
      hero: {
        ...prev.hero,
        gold: prev.hero.gold - price,
        potions: prev.hero.potions + 3
      },
      combatLog: addCombatLog(prev.combatLog, `🎁 Bought 3 potions for the price of 2! 🧪🧪🧪 (-${price}g)`)
    };
  });
  }, []);

  const buyBuff = useCallback((buffId: string) => {
    const buff = availableBuffs.find(b => b.id === buffId);
    if (!buff || typeof buff.price !== 'number' || gameState.hero.gold < buff.price) return;

    setGameState(prev => {
      const applied = applyBuff(
        { ...prev.hero, gold: prev.hero.gold - (buff.price ?? 0) },
        { ...buff, type: buff.type as Buff['type'], expiresAt: Date.now() + buff.duration * 1000 }
      );
      return {
        ...prev,
        hero: applied,
        combatLog: addCombatLog(prev.combatLog, `🧪 Bought ${buff.icon} ${buff.label} (+${buff.value} ${buff.type.toUpperCase()} for ${buff.duration}s)`)
      };
    });
  }, [gameState.hero.gold, availableBuffs]);

  const buyRandomBuff = useCallback(() => {
    const price = 20;
    if (gameState.hero.gold < price) return;

    const random = SHOP_BUFFS[Math.floor(Math.random() * SHOP_BUFFS.length)];
    const newBuff: Buff = { ...random, type: random.type as Buff['type'], expiresAt: Date.now() + random.duration * 1000 };

    setGameState(prev => {
      const alreadyBuff = prev.hero.activeBuffs.find(b => b.id === newBuff.id);
      const activeBuffs = alreadyBuff
        ? prev.hero.activeBuffs.map(b =>
            b.id === newBuff.id ? { ...b, expiresAt: b.expiresAt + newBuff.duration * 1000 } : b
          )
        : [...prev.hero.activeBuffs, newBuff];

      return {
        ...prev,
        hero: { ...prev.hero, gold: prev.hero.gold - price, activeBuffs },
        combatLog: addCombatLog(prev.combatLog, `🎲 Mystery Buff: ${newBuff.icon} ${newBuff.label} (+${newBuff.value} ${newBuff.type.toUpperCase()} for ${newBuff.duration}s)`)
      };
    });
  }, [gameState.hero.gold]);

  const buyMysteryEquipment = useCallback(() => {
    const cost = 150;
    if (gameState.hero.gold < cost) return;

    const random = EQUIPMENT_POOL[Math.floor(Math.random() * EQUIPMENT_POOL.length)];
    const newEquipment = { ...random, id: crypto.randomUUID() };

    setGameState(prev => ({
      ...prev,
      hero: { ...prev.hero, gold: prev.hero.gold - cost },
      inventory: [...prev.inventory, newEquipment],
      combatLog: addCombatLog(prev.combatLog, `🎲 Found Mystery Equipment: ${newEquipment.emoji} ${newEquipment.name} (${newEquipment.rarity})`)
    }));
  }, [gameState.hero.gold]);

  const rerollShop = useCallback(() => {
    const cost = 30;
    if (gameState.hero.gold < cost) return;
    const newBuffs: Buff[] = [...SHOP_BUFFS].sort(() => 0.5 - Math.random()).slice(0, 3).map(b => ({ ...b, type: b.type as Buff['type'], expiresAt: 0 }));
    setAvailableBuffs(newBuffs);
    setGameState(prev => ({
      ...prev,
      hero: { ...prev.hero, gold: prev.hero.gold - cost },
      combatLog: addCombatLog(prev.combatLog, `🔄 Rerolled shop buffs (-${cost}g)`)
    }));
  }, [gameState.hero.gold]);

  const equipItem = useCallback((item: Equipment) => {
    setGameState(prev => {
      const newEquippedItems = { ...prev.equippedItems };
      const currentItem = newEquippedItems[item.type];
      let newInventory = [...prev.inventory];
      if (currentItem) newInventory.push(currentItem);
      newEquippedItems[item.type] = item;
      newInventory = newInventory.filter(i => i.id !== item.id);
      return {
        ...prev,
        inventory: newInventory,
        equippedItems: newEquippedItems,
        combatLog: addCombatLog(prev.combatLog, `⚡ Equipped ${item.emoji} ${item.name}`)
      };
    });
  }, []);

  const sellEquipment = useCallback((item: Equipment) => {
    const sellPrice = 50;
    setGameState(prev => ({
      ...prev,
      hero: { ...prev.hero, gold: prev.hero.gold + sellPrice },
      inventory: prev.inventory.filter(i => i.id !== item.id),
      combatLog: addCombatLog(prev.combatLog, `💰 Sold ${item.emoji} ${item.name} for ${sellPrice} gold`)
    }));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('fantasy-rpg-save');
    if (saved) {
      try {
        const loaded = JSON.parse(saved);
        const achiev = ACHIEVEMENTS.map(a => {
          const s = (loaded.achievements as { id: string; unlocked: boolean }[] | undefined)?.find(b => b.id === a.id);
  return s ? { ...a, unlocked: s.unlocked } : a;
        });
        setGameState({ ...loaded, achievements: achiev });
      } catch (e) {
        console.error('Load failed:', e);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('fantasy-rpg-save', JSON.stringify(gameState));
    }, 5000);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        hero: clearExpiredBuffs(prev.hero)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!gameState.currentEnemy) {
      const timer = setTimeout(spawnEnemy, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentEnemy, spawnEnemy]);

  return {
    gameState,
    effectiveHero,
    combatAnimations,
    availableBuffs,
    actions: {
      heroAttack,
      enemyAttack,
      usePotion,
      defend,
      toggleAutoMode,
      equipItem,
      buyUpgrade,
      buyBuff,
      buyThreePotions,
      buyRandomBuff,
      buyMysteryEquipment,
      sellEquipment,
      rerollShop
    }
  };
}
