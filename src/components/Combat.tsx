import { useEffect, useState } from 'react';
import { Hero } from './Hero'; // ✅ Import correct
import { EnemyComponent } from './Enemy';
import { Hero as HeroType, Enemy } from '../types/game';

interface CombatProps {
  hero: HeroType;
  enemy: Enemy | null;
  combatAnimations: {
    heroAttack: boolean;
    enemyAttack: boolean;
    heroCrit: boolean;
    enemyCrit: boolean;
  };
  onHeroAttack: () => void;
  onDefend: () => void;
  onUsePotion: () => void;
  onToggleAuto: () => void;
  isAutoMode: boolean;
  canAct: boolean;
}

export function Combat({
  hero,
  enemy,
  combatAnimations,
  onHeroAttack,
  onDefend,
  onUsePotion,
  onToggleAuto,
  isAutoMode,
  canAct
}: CombatProps) {
  const [heroHitText, setHeroHitText] = useState('');
  const [enemyHitText, setEnemyHitText] = useState('');

  useEffect(() => {
    if (combatAnimations.heroCrit) {
      setEnemyHitText('⚡ CRITICAL!');
      setTimeout(() => setEnemyHitText(''), 1000);
    } else if (combatAnimations.heroAttack) {
      setEnemyHitText('💥 -DMG');
      setTimeout(() => setEnemyHitText(''), 800);
    }
  }, [combatAnimations.heroAttack, combatAnimations.heroCrit]);

  useEffect(() => {
    if (combatAnimations.enemyCrit) {
      setHeroHitText('⚡ CRITICAL!');
      setTimeout(() => setHeroHitText(''), 1000);
    } else if (combatAnimations.enemyAttack) {
      setHeroHitText('💢 -DMG');
      setTimeout(() => setHeroHitText(''), 800);
    }
  }, [combatAnimations.enemyAttack, combatAnimations.enemyCrit]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`relative transition-all ${combatAnimations.enemyAttack ? 'animate-shake-left' : ''}`}>
          <Hero hero={hero} isAttacking={combatAnimations.heroAttack} isCritical={combatAnimations.heroCrit} />
          {heroHitText && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-red-300 text-xl font-bold animate-fade-up">
              {heroHitText}
            </div>
          )}
        </div>
        <div className={`relative transition-all ${combatAnimations.heroAttack ? 'animate-shake-right' : ''}`}>
          <EnemyComponent enemy={enemy} isAttacking={combatAnimations.enemyAttack} isCritical={combatAnimations.enemyCrit} />
          {enemyHitText && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-300 text-xl font-bold animate-fade-up">
              {enemyHitText}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6 shadow-2xl border border-purple-500/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={onHeroAttack}
            disabled={!canAct || isAutoMode}
            className="btn-combat bg-red-600 to-orange-600"
          >
            ⚔️ Attack
          </button>

          <button
            onClick={onDefend}
            disabled={!canAct || isAutoMode}
            className="btn-combat bg-blue-600 to-cyan-600"
          >
            🛡️ Defend
          </button>

          <button
            onClick={onUsePotion}
            disabled={hero.potions <= 0 || hero.hp >= hero.maxHp}
            className="btn-combat bg-green-600 to-emerald-600 relative"
          >
            🧪 Potion
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {hero.potions}
            </span>
          </button>

          <button
            onClick={onToggleAuto}
            className={`btn-combat ${
              isAutoMode
                ? 'bg-yellow-600 to-amber-600 text-white'
                : 'bg-gray-600 to-gray-700 text-white'
            }`}
          >
            🤖 Auto {isAutoMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {hero.isDefending && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-blue-600/30 border border-blue-500 rounded-lg px-4 py-2">
              <span className="text-blue-300 font-medium">🛡️ Defending - 75% damage reduction next turn</span>
            </div>
          </div>
        )}

        {isAutoMode && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-yellow-600/30 border border-yellow-500 rounded-lg px-4 py-2">
              <span className="text-yellow-300 font-medium">🤖 Auto Combat Active - Smart AI decisions</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
