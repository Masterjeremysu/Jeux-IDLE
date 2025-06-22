import { Heart, Shield, Sword, Zap, Skull, BarChart } from 'lucide-react';
import type { Hero } from '../types/game';

interface HeroProps {
  hero: Hero;
  isAttacking: boolean;
  isCritical: boolean;
}

export function Hero({ hero, isAttacking, isCritical }: HeroProps) {
  const now = Date.now();
  const activeBuffs = hero.activeBuffs?.filter(buff => buff.expiresAt > now) || [];

  const baseStats = {
    hp: 100,
    atk: 20,
    def: 10,
    critChance: 5,
  };

  const dpsEstimate = Math.round(
    (hero.atk * (1 + (hero.critChance / 100) * ((hero.critMultiplier / 100) - 1))) * 0.8
  );

  return (
    <div className={`relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 shadow-2xl border border-blue-500/30 transition-all duration-300 animate-fade-in`}>
      {isCritical && (
        <div className="absolute inset-0 rounded-xl border-4 border-yellow-400/60 animate-pulse-glow pointer-events-none" />
      )}

      <div className="text-center mb-4">
        <div 
          className={`text-8xl mb-2 transition-all duration-300 ${isAttacking ? 'transform scale-110 animate-pulse' : ''}`}
        >
          🦸‍♂️
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Hero</h2>
        <div className="text-sm text-blue-300">Level {hero.level}</div>
      </div>

      <div className="space-y-3">
        {/* HP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-white font-medium">HP</span>
          </div>
          <div className="text-right w-32">
            <div className="text-white font-bold">
              {hero.hp}/{hero.maxHp}
              {hero.maxHp > baseStats.hp && (
                <span className="text-green-400 text-xs ml-1">(+{hero.maxHp - baseStats.hp})</span>
              )}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(hero.hp / hero.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ATK */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sword className="w-5 h-5 text-orange-500" />
            <span className="text-white font-medium">ATK</span>
          </div>
          <div className="text-orange-400 font-bold">
            {hero.atk}
            {hero.atk > baseStats.atk && (
              <span className="text-green-400 text-sm ml-1">(+{hero.atk - baseStats.atk})</span>
            )}
          </div>
        </div>

        {/* DEF */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-white font-medium">DEF</span>
          </div>
          <div className="text-blue-400 font-bold">
            {hero.def}
            {hero.def > baseStats.def && (
              <span className="text-green-400 text-sm ml-1">(+{hero.def - baseStats.def})</span>
            )}
          </div>
        </div>

        {/* CRIT */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-white font-medium">CRIT</span>
          </div>
          <div className="text-yellow-400 font-bold">
            {hero.critChance}%
            {hero.critChance > baseStats.critChance && (
              <span className="text-green-400 text-sm ml-1">(+{hero.critChance - baseStats.critChance}%)</span>
            )}
          </div>
        </div>
      </div>

      {/* BUFFS */}
      {activeBuffs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-blue-500/30 space-y-2">
          <h3 className="text-sm text-white font-semibold">🧪 Active Buffs:</h3>
          <div className="space-y-1">
            {activeBuffs.map(buff => {
              const total = buff.duration * 1000;
              const remaining = Math.max(0, buff.expiresAt - now);
              const percent = (remaining / total) * 100;
              const secondsLeft = Math.floor(remaining / 1000);

              return (
                <div key={buff.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs text-white">
                    <span className="flex items-center space-x-1">
                      <span>{buff.icon}</span>
                      <span>{buff.label}</span>
                    </span>
                    <span className="text-blue-200">{secondsLeft}s</span>
                  </div>
                  <div className="w-full bg-blue-900/40 h-2 rounded-full">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* XP / GOLD / DPS */}
      <div className="mt-6 pt-5 border-t border-blue-500/30 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-yellow-300 font-bold text-lg">💰 {hero.gold}</div>
          <div className="text-purple-300 text-sm text-right">
            XP: {hero.xp}/{hero.level * 100}
            <div className="w-32 bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(hero.xp / (hero.level * 100)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-white pt-2 border-t border-blue-500/20">
          <div className="flex items-center space-x-1">
            <Skull className="w-4 h-4 text-red-400" />
            <span>Enemies Killed:</span>
            <span className="font-bold text-red-300">{hero.level * 3}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart className="w-4 h-4 text-green-400" />
            <span>DPS:</span>
            <span className="font-bold text-green-300">{dpsEstimate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
