import { GameState } from '../types/game';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const { hero, enemiesKilled, isAutoMode } = gameState;

  const nextBoss = 10 - (enemiesKilled % 10);
  const currentWave = Math.floor(enemiesKilled / 10) + 1;
  const progressPercent = ((10 - nextBoss) / 10) * 100;

  const activeBuffs = hero.activeBuffs?.filter(buff => buff.expiresAt > Date.now()) || [];
  const dpsEstimate = Math.round(
    (hero.atk * (1 + (hero.critChance / 100) * ((hero.critMultiplier / 100) - 1))) * 0.8
  );

  const achievementsUnlocked = gameState.achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-4 shadow-2xl border border-indigo-500/30">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-white">{enemiesKilled}</div>
          <div className="text-indigo-300 text-sm">Enemies Killed</div>
        </div>

        <div>
          <div className="text-2xl font-bold text-yellow-400">{hero.level}</div>
          <div className="text-indigo-300 text-sm">Hero Level</div>
        </div>

        <div>
          <div className="text-2xl font-bold text-green-400">{hero.gold}</div>
          <div className="text-indigo-300 text-sm">Gold</div>
        </div>

        <div>
          <div className="text-2xl font-bold text-purple-400">{currentWave}</div>
          <div className="text-indigo-300 text-sm">Current Wave</div>
        </div>

        <div>
          <div className={`text-2xl font-bold ${nextBoss === 10 ? 'text-red-400 animate-pulse' : 'text-red-300'}`}>
            {nextBoss === 10 ? 'BOSS!' : nextBoss}
          </div>
          <div className="text-indigo-300 text-sm">
            {nextBoss === 10 ? 'Boss Fight!' : 'Next Boss in'}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-blue-300">{dpsEstimate}</div>
          <div className="text-indigo-300 text-sm">Est. DPS</div>
        </div>
      </div>

      {/* Wave Progress Bar */}
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-green-400 to-red-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-center text-indigo-300 mt-1">
          Wave Progression: {progressPercent.toFixed(0)}%
        </div>
      </div>

      {/* Status Chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
        {isAutoMode && (
          <div className="px-3 py-1 bg-yellow-600/30 border border-yellow-400 rounded-full text-yellow-300 font-semibold">
            🤖 Auto Mode
          </div>
        )}

        {hero.isDefending && (
          <div className="px-3 py-1 bg-blue-600/30 border border-blue-400 rounded-full text-blue-300 font-semibold">
            🛡️ Defending
          </div>
        )}

        {activeBuffs.length > 0 && (
          <div className="px-3 py-1 bg-purple-700/30 border border-purple-500 rounded-full text-purple-300 font-semibold">
            🧬 {activeBuffs.length} Buff{activeBuffs.length > 1 ? 's' : ''}
          </div>
        )}

        {hero.potions > 0 && (
          <div className="px-3 py-1 bg-green-700/30 border border-green-500 rounded-full text-green-300 font-semibold">
            🧪 {hero.potions} Potion{hero.potions > 1 ? 's' : ''}
          </div>
        )}

        <div className="px-3 py-1 bg-indigo-700/30 border border-indigo-400 rounded-full text-indigo-200 font-semibold">
          🏆 {achievementsUnlocked}/{gameState.achievements.length} Achievements
        </div>
      </div>
    </div>
  );
}
