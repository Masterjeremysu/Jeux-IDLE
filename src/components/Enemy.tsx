import { Enemy } from '../types/game';
import { Skull } from 'lucide-react';
import { useMemo } from 'react';

interface EnemyProps {
  enemy: Enemy | null;
  isAttacking: boolean;
  isCritical: boolean;
}

export function EnemyComponent({ enemy, isAttacking, isCritical }: EnemyProps) {
  const randomQuote = useMemo(() => {
    const quotes = [
      "👿 *You shall not pass...*",
      "🔥 *Feel my wrath!*",
      "💢 *This world belongs to ME!*",
      "⚡ *You dare challenge a god?*"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []); // ✅ Pas de dépendance inutile

  if (!enemy) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-600 flex items-center justify-center h-64">
        <div className="text-gray-500 text-center animate-fade-in">
          <Skull className="w-12 h-12 mx-auto mb-2" />
          <p>No enemy...</p>
        </div>
      </div>
    );
  }

  const hpPercent = (enemy.hp / enemy.maxHp) * 100;
  const isRage = hpPercent < 20;

  return (
    <div className={`relative bg-gradient-to-br from-red-900 to-orange-900 rounded-xl p-6 shadow-2xl border transition-all duration-300 animate-fade-in
      ${enemy.isBoss ? 'border-yellow-500/60 shadow-yellow-400/20' : 'border-red-500/30'}
      ${isRage ? 'animate-pulse-glow border-red-500' : ''}
    `}>
      {enemy.isBoss && (
        <div className="absolute inset-0 rounded-xl border-4 border-yellow-400/40 animate-pulse-glow pointer-events-none z-0" />
      )}

      <div className="text-center mb-4 relative z-10">
        <div
          className={`text-8xl mb-2 transition-all duration-300 ${
            isAttacking ? 'transform scale-110 animate-pulse' : ''
          } ${isCritical ? 'text-red-400 animate-bounce' : ''}`}
        >
          {enemy.emoji}
        </div>

        <h2 className={`text-2xl font-bold mb-1 ${enemy.isBoss ? 'text-yellow-400' : 'text-white'}`}>
          {enemy.name}
          {enemy.isBoss && <span className="ml-2">👑</span>}
        </h2>

        {enemy.isBoss && (
          <p className="text-sm text-orange-300 italic animate-fade-in-slow">{randomQuote}</p>
        )}

        {isCritical && (
          <div className="mt-1 text-red-500 text-xs font-bold animate-pulse">⚠️ CRITICAL STRIKE RECEIVED!</div>
        )}
        {isRage && (
          <div className="mt-1 text-red-600 text-xs font-bold animate-pulse">🩸 RAGE MODE ACTIVATED!</div>
        )}
      </div>

      <div className="space-y-3 relative z-10">
        {/* HP */}
        <div className="text-center">
          <div className="text-white font-bold text-lg">{enemy.hp}/{enemy.maxHp} HP</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                enemy.isBoss
                  ? 'bg-gradient-to-r from-yellow-500 to-red-500'
                  : 'bg-gradient-to-r from-green-500 to-red-500'
              }`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-orange-400 font-bold">{enemy.atk}</div>
            <div className="text-gray-300">ATK</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">{enemy.def}</div>
            <div className="text-gray-300">DEF</div>
          </div>
        </div>

        {/* Rewards */}
        <div className="text-center pt-2 border-t border-red-500/30">
          <div className="text-yellow-300 font-bold">💰 {enemy.goldReward}</div>
          <div className="text-purple-300 text-sm">✨ {enemy.xpReward} XP</div>
        </div>
      </div>
    </div>
  );
}
