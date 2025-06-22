
import { Achievement } from '../types/game';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <div className="bg-gradient-to-br from-yellow-900 to-orange-900 rounded-xl p-6 shadow-2xl border border-yellow-500/30">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
        🏆 Achievements ({unlockedCount}/{achievements.length})
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`rounded-lg p-4 border-2 transition-all duration-300 ${
              achievement.unlocked
                ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border-yellow-500 shadow-yellow-500/20 shadow-lg'
                : 'bg-black/30 border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`text-3xl ${achievement.unlocked ? 'animate-pulse' : 'grayscale opacity-50'}`}>
                {achievement.emoji}
              </span>
              <div className="flex-1">
                <div className={`font-bold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {achievement.name}
                </div>
                <div className={`text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                  {achievement.description}
                </div>
                <div className="text-xs text-yellow-300 mt-1">
                  Reward: +{achievement.reward.xp} XP, +{achievement.reward.gold} Gold
                </div>
              </div>
              {achievement.unlocked && (
                <div className="text-green-400 font-bold">✅</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}