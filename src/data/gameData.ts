import { Enemy, Equipment, Achievement } from '../types/game';

export const ENEMY_TEMPLATES: Omit<Enemy, 'id' | 'hp' | 'maxHp'>[] = [
  { name: 'Goblin', emoji: '👹', atk: 15, def: 5, goldReward: 25, xpReward: 15, isBoss: false },
  { name: 'Orc', emoji: '🧌', atk: 20, def: 8, goldReward: 35, xpReward: 20, isBoss: false },
  { name: 'Skeleton', emoji: '☠️', atk: 18, def: 6, goldReward: 30, xpReward: 18, isBoss: false },
  { name: 'Troll', emoji: '🧟', atk: 25, def: 12, goldReward: 45, xpReward: 25, isBoss: false },
  { name: 'Dark Mage', emoji: '🧙‍♂️', atk: 30, def: 10, goldReward: 60, xpReward: 35, isBoss: false },
  { name: 'Bandit', emoji: '🏴‍☠️', atk: 22, def: 7, goldReward: 40, xpReward: 22, isBoss: false },
  { name: 'Wolf', emoji: '🐺', atk: 16, def: 4, goldReward: 28, xpReward: 16, isBoss: false },
  { name: 'Spider', emoji: '🕷️', atk: 14, def: 3, goldReward: 22, xpReward: 14, isBoss: false },
];

export const BOSS_TEMPLATES: Omit<Enemy, 'id' | 'hp' | 'maxHp'>[] = [
  { name: 'Dragon Lord', emoji: '🐲', atk: 50, def: 20, goldReward: 200, xpReward: 150, isBoss: true },
  { name: 'Demon King', emoji: '👹', atk: 60, def: 25, goldReward: 300, xpReward: 200, isBoss: true },
  { name: 'Lich Master', emoji: '💀', atk: 70, def: 30, goldReward: 400, xpReward: 250, isBoss: true },
  { name: 'Shadow Beast', emoji: '🌑', atk: 55, def: 22, goldReward: 250, xpReward: 175, isBoss: true },
  { name: 'Fire Titan', emoji: '🔥', atk: 65, def: 28, goldReward: 350, xpReward: 225, isBoss: true },
];

export const EQUIPMENT_POOL: Omit<Equipment, 'id'>[] = [
  // Weapons - Common
  { name: 'Rusty Sword', type: 'weapon', rarity: 'common', bonuses: { atk: 8 }, emoji: '⚔️' },
  { name: 'Iron Sword', type: 'weapon', rarity: 'common', bonuses: { atk: 12 }, emoji: '🗡️' },
  { name: 'Wooden Club', type: 'weapon', rarity: 'common', bonuses: { atk: 10 }, emoji: '🏏' },
  
  // Weapons - Uncommon
  { name: 'Steel Blade', type: 'weapon', rarity: 'uncommon', bonuses: { atk: 18 }, emoji: '⚔️' },
  { name: 'Silver Sword', type: 'weapon', rarity: 'uncommon', bonuses: { atk: 16, critChance: 3 }, emoji: '🗡️' },
  { name: 'Battle Axe', type: 'weapon', rarity: 'uncommon', bonuses: { atk: 20 }, emoji: '🪓' },
  
  // Weapons - Rare
  { name: 'Magic Sword', type: 'weapon', rarity: 'rare', bonuses: { atk: 25, critChance: 8 }, emoji: '✨' },
  { name: 'Flame Blade', type: 'weapon', rarity: 'rare', bonuses: { atk: 28, critChance: 5 }, emoji: '🔥' },
  { name: 'Ice Spear', type: 'weapon', rarity: 'rare', bonuses: { atk: 24, critChance: 10 }, emoji: '❄️' },
  
  // Weapons - Epic
  { name: 'Dragon Slayer', type: 'weapon', rarity: 'epic', bonuses: { atk: 35, critChance: 15 }, emoji: '🐉' },
  { name: 'Thunder Hammer', type: 'weapon', rarity: 'epic', bonuses: { atk: 38, critChance: 12 }, emoji: '⚡' },
  
  // Weapons - Legendary
  { name: 'Excalibur', type: 'weapon', rarity: 'legendary', bonuses: { atk: 50, critChance: 20 }, emoji: '⭐' },
  { name: 'Godslayer', type: 'weapon', rarity: 'legendary', bonuses: { atk: 55, critChance: 25 }, emoji: '💫' },
  
  // Helmets - Common
  { name: 'Leather Cap', type: 'helmet', rarity: 'common', bonuses: { def: 5 }, emoji: '🎩' },
  { name: 'Cloth Hood', type: 'helmet', rarity: 'common', bonuses: { def: 4, hp: 15 }, emoji: '🧢' },
  
  // Helmets - Uncommon
  { name: 'Iron Helmet', type: 'helmet', rarity: 'uncommon', bonuses: { def: 10, hp: 25 }, emoji: '⛑️' },
  { name: 'Steel Helm', type: 'helmet', rarity: 'uncommon', bonuses: { def: 12, hp: 20 }, emoji: '🪖' },
  
  // Helmets - Rare
  { name: 'Magic Crown', type: 'helmet', rarity: 'rare', bonuses: { def: 18, hp: 40, critChance: 5 }, emoji: '👑' },
  { name: 'Crystal Tiara', type: 'helmet', rarity: 'rare', bonuses: { def: 15, hp: 50 }, emoji: '💎' },
  
  // Helmets - Epic
  { name: 'Dragon Helm', type: 'helmet', rarity: 'epic', bonuses: { def: 25, hp: 70 }, emoji: '🛡️' },
  
  // Helmets - Legendary
  { name: 'Divine Circlet', type: 'helmet', rarity: 'legendary', bonuses: { def: 35, hp: 100, critChance: 10 }, emoji: '✨' },
  
  // Armor - Common
  { name: 'Cloth Robe', type: 'armor', rarity: 'common', bonuses: { def: 8 }, emoji: '🥼' },
  { name: 'Leather Vest', type: 'armor', rarity: 'common', bonuses: { def: 10, hp: 20 }, emoji: '🦺' },
  
  // Armor - Uncommon
  { name: 'Chain Mail', type: 'armor', rarity: 'uncommon', bonuses: { def: 15, hp: 35 }, emoji: '🦺' },
  { name: 'Scale Armor', type: 'armor', rarity: 'uncommon', bonuses: { def: 18, hp: 30 }, emoji: '🛡️' },
  
  // Armor - Rare
  { name: 'Plate Armor', type: 'armor', rarity: 'rare', bonuses: { def: 25, hp: 60 }, emoji: '🛡️' },
  { name: 'Mithril Mail', type: 'armor', rarity: 'rare', bonuses: { def: 22, hp: 70, critChance: 3 }, emoji: '✨' },
  
  // Armor - Epic
  { name: 'Dragon Scale', type: 'armor', rarity: 'epic', bonuses: { def: 35, hp: 90 }, emoji: '🐉' },
  
  // Armor - Legendary
  { name: 'Celestial Armor', type: 'armor', rarity: 'legendary', bonuses: { def: 45, hp: 120, critChance: 8 }, emoji: '🌟' },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Kill your first enemy',
    condition: (state) => state.enemiesKilled >= 1,
    reward: { xp: 25, gold: 50 },
    unlocked: false,
    emoji: '⚔️'
  },
  {
    id: 'slayer',
    name: 'Slayer',
    description: 'Kill 10 enemies',
    condition: (state) => state.enemiesKilled >= 10,
    reward: { xp: 100, gold: 200 },
    unlocked: false,
    emoji: '💀'
  },
  {
    id: 'veteran',
    name: 'Veteran Warrior',
    description: 'Kill 50 enemies',
    condition: (state) => state.enemiesKilled >= 50,
    reward: { xp: 500, gold: 1000 },
    unlocked: false,
    emoji: '🏆'
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Kill 100 enemies',
    condition: (state) => state.enemiesKilled >= 100,
    reward: { xp: 1000, gold: 2000 },
    unlocked: false,
    emoji: '👑'
  },
  {
    id: 'potion_user',
    name: 'Potion User',
    description: 'Use your first potion',
    condition: (state) => state.hero.potions < 3, // Started with 3, so if less than 3, used one
    reward: { xp: 25, gold: 50 },
    unlocked: false,
    emoji: '🧪'
  },
  {
    id: 'potion_master',
    name: 'Potion Master',
    description: 'Collect 10 potions total',
    condition: (state) => state.hero.potions >= 10,
    reward: { xp: 150, gold: 300 },
    unlocked: false,
    emoji: '🧪'
  },
  {
    id: 'boss_killer',
    name: 'Boss Killer',
    description: 'Defeat your first boss',
    condition: (state) => state.enemiesKilled >= 10,
    reward: { xp: 200, gold: 500 },
    unlocked: false,
    emoji: '👑'
  },
  {
    id: 'boss_slayer',
    name: 'Boss Slayer',
    description: 'Defeat 5 bosses',
    condition: (state) => Math.floor(state.enemiesKilled / 10) >= 5,
    reward: { xp: 750, gold: 1500 },
    unlocked: false,
    emoji: '🐲'
  },
  {
    id: 'rich',
    name: 'Golden Hoarder',
    description: 'Accumulate 1000 gold',
    condition: (state) => state.hero.gold >= 1000,
    reward: { xp: 150, gold: 300 },
    unlocked: false,
    emoji: '💰'
  },
  {
    id: 'wealthy',
    name: 'Wealthy Adventurer',
    description: 'Accumulate 5000 gold',
    condition: (state) => state.hero.gold >= 5000,
    reward: { xp: 500, gold: 1000 },
    unlocked: false,
    emoji: '💎'
  },
  {
    id: 'level_up',
    name: 'Growing Stronger',
    description: 'Reach level 5',
    condition: (state) => state.hero.level >= 5,
    reward: { xp: 100, gold: 200 },
    unlocked: false,
    emoji: '📈'
  },
  {
    id: 'experienced',
    name: 'Experienced Hero',
    description: 'Reach level 10',
    condition: (state) => state.hero.level >= 10,
    reward: { xp: 300, gold: 600 },
    unlocked: false,
    emoji: '⭐'
  },
  {
    id: 'collector',
    name: 'Equipment Collector',
    description: 'Find 5 pieces of equipment',
    condition: (state) => (state.inventory.length + Object.keys(state.equippedItems).length) >= 5,
    reward: { xp: 200, gold: 400 },
    unlocked: false,
    emoji: '🎒'
  },
  {
    id: 'rare_finder',
    name: 'Rare Finder',
    description: 'Find a rare or better item',
    condition: (state) => [...state.inventory, ...Object.values(state.equippedItems)].some(item => 
      item && ['rare', 'epic', 'legendary'].includes(item.rarity)
    ),
    reward: { xp: 300, gold: 600 },
    unlocked: false,
    emoji: '💎'
  }
];

export const SHOP_PRICES = {
  hp: 100,
  atk: 150,
  def: 150,
  crit: 300,
  potion: 50
};

export const RARITY_COLORS = {
  common: '#9CA3AF',
  uncommon: '#22C55E',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B'
};
export const SHOP_BUFFS = [
  {
    id: 'buff_atk_20',
    label: 'Potion of Strength',
    icon: '💪',
    type: 'atk',
    value: 20,
    duration: 20,
    price: 100
  },
  {
    id: 'buff_def_20',
    label: 'Potion of Stone Skin',
    icon: '🪨',
    type: 'def',
    value: 20,
    duration: 20,
    price: 100
  }
];