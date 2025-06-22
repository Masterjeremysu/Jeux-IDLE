import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { Combat } from './components/Combat';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { Achievements } from './components/Achievements';
import { GameStats } from './components/GameStats';
import { CombatLog } from './components/CombatLog';
import { Hero } from './components/Hero';

const TABS = [
  { id: 'combat', label: '⚔️ Combat' },
  { id: 'shop', label: '🏪 Shop' },
  { id: 'inventory', label: '🎒 Inventory' },
  { id: 'achievements', label: '🏆 Achievements' }
] as const;

type TabId = typeof TABS[number]['id'];

function App() {
  const { gameState, effectiveHero, combatAnimations, actions } = useGame();
  const [activeTab, setActiveTab] = useState<TabId>('combat');

  const canAct = gameState.currentEnemy && effectiveHero.hp > 0 && gameState.currentEnemy.hp > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            ⚔️ Fantasy Idle RPG ⚔️
          </h1>
          <p className="text-gray-300 text-lg">Embark on an endless adventure!</p>
        </div>

        <div className="mb-6">
          <Hero
            hero={effectiveHero}
            isAttacking={combatAnimations.heroAttack}
            isCritical={combatAnimations.heroCrit}
          />
        </div>

        <div className="mb-6">
          <GameStats gameState={gameState} />
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {activeTab === 'combat' && (
              <Combat
                hero={effectiveHero}
                enemy={gameState.currentEnemy}
                combatAnimations={combatAnimations}
                onHeroAttack={actions.heroAttack}
                onDefend={actions.defend}
                onUsePotion={actions.usePotion}
                onToggleAuto={actions.toggleAutoMode}
                isAutoMode={gameState.isAutoMode}
                canAct={!!canAct}
              />
            )}

            {activeTab === 'shop' && <Shop />}
            {activeTab === 'inventory' && <Inventory />}
            {activeTab === 'achievements' && (
              <Achievements achievements={gameState.achievements} />
            )}
          </div>

          <div className="space-y-6">
            <CombatLog logs={gameState.combatLog} />

            {effectiveHero.hp <= 0 && (
              <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-6 shadow-2xl border border-red-500 text-center">
                <div className="text-4xl mb-2">💀</div>
                <h3 className="text-xl font-bold text-red-400 mb-2">You have fallen!</h3>
                <p className="text-red-200 mb-4">Use a potion to heal and continue your adventure!</p>
                <button
                  onClick={actions.usePotion}
                  disabled={gameState.hero.potions <= 0}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
                >
                  {gameState.hero.potions > 0 ? `Use Potion (${gameState.hero.potions})` : 'No Potions!'}
                </button>
              </div>
            )}

            <div className="bg-black/30 rounded-xl p-4 border border-gray-700 text-blue-200 text-xs">
              <h4 className="text-sm font-bold text-blue-400 mb-2">🚀 Active Features:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>🧰 Mystery Equipment (random loot for 150g)</li>
                <li>🧪 Temporary Buffs (with timer + stacking)</li>
                <li>🎲 Random Buff (20g for surprise effect)</li>
                <li>🔄 Reroll Buff Shop (30g to refresh buffs)</li>
                <li>💸 Sell Equipment (+50g & free space)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
