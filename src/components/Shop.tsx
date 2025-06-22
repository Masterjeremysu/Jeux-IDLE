// 📁 src/components/Shop.tsx
import { SHOP_PRICES } from '../data/gameData';
import { useGame } from '../hooks/useGame';

export function Shop() {
  const { gameState, actions, availableBuffs } = useGame();
  const { gold, potions } = gameState.hero;
  const { shopUpgrades } = gameState;

  const upgradeTypes: (keyof typeof SHOP_PRICES)[] = ['hp', 'atk', 'def', 'crit'];
  const emojiMap: Record<string, string> = {
    hp: '❤️',
    atk: '🗡️',
    def: '🛡️',
    crit: '⚡',
    potion: '🧪',
  };

  const bonusMap: Record<keyof typeof SHOP_PRICES, string> = {
    hp: '+10 Max HP',
    atk: '+5 ATK',
    def: '+5 DEF',
    crit: '+5% CRIT',
    potion: '+1 Potion',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">🏪 In-Game Shop</h2>

      {/* 💊 Potion simple */}
      <div className="bg-purple-900 p-4 rounded-xl border border-purple-600 shadow-md flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-white">{emojiMap.potion} Potion</div>
          <div className={`text-sm ${potions > 0 ? 'text-purple-200 animate-pulse' : 'text-purple-200'}`}>
            {bonusMap.potion} (You own {potions})
          </div>
        </div>
        <button
          onClick={() => actions.buyUpgrade('potion')}
          disabled={gold < SHOP_PRICES.potion}
          className={`px-4 py-2 rounded-lg text-white font-bold transition ${
            gold < SHOP_PRICES.potion ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {SHOP_PRICES.potion}g
        </button>
      </div>

      {/* 🎁 Offre spéciale 3 potions pour 2 */}
      <div className="bg-gradient-to-r from-fuchsia-700 to-pink-700 p-4 rounded-xl border border-pink-400 shadow-md flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-white">🎁 3 Potions Deal</div>
          <div className="text-sm text-pink-200">Buy 3 potions for the price of 2!</div>
        </div>
        <button
          onClick={actions.buyThreePotions}
          disabled={gold < SHOP_PRICES.potion * 2}
          className={`px-4 py-2 rounded-lg text-white font-bold transition ${
            gold < SHOP_PRICES.potion * 2 ? 'bg-gray-600 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {SHOP_PRICES.potion * 2}g
        </button>
      </div>

      {/* 🛡️ Permanent Upgrades */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {upgradeTypes.map((type) => {
          const level = shopUpgrades[type];
          const price = SHOP_PRICES[type] * (level + 1);
          const isAffordable = gold >= price;
          const bonusDisplay = bonusMap[type];

          return (
            <div
              key={type}
              className="bg-gray-900 p-4 rounded-xl border border-gray-700 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="text-xl font-bold text-white mb-1">
                  {emojiMap[type]} {type.toUpperCase()}
                </div>
                <div className="text-sm text-gray-300 mb-1">Level {level}</div>
                <div className="text-sm text-green-400">{bonusDisplay} (Total: x{level})</div>
              </div>
              <button
                onClick={() => actions.buyUpgrade(type)}
                disabled={!isAffordable}
                className={`mt-4 px-3 py-1 rounded-lg text-white font-bold transition ${
                  !isAffordable ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {price}g
              </button>
            </div>
          );
        })}
      </div>

      {/* 🧬 Buffs temporaires */}
      <div>
        <h3 className="text-lg font-bold text-green-400 mt-6 mb-2">🧬 Temporary Buffs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableBuffs.map((buff) => {
            const isAffordable = gold >= (buff.price ?? 0);
            return (
              <div
                key={buff.id}
                className="bg-green-950 p-4 rounded-xl border border-green-600 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-white text-lg font-bold mb-1">
                    {buff.icon} {buff.label}
                  </div>
                  <div className="text-sm text-green-200 mb-1">
                    +{buff.value} {buff.type.toUpperCase()} for {buff.duration}s
                  </div>
                  <div className="text-xs text-green-300">🪙 {buff.price} gold</div>
                </div>
                <button
                  onClick={() => actions.buyBuff(buff.id)}
                  disabled={!isAffordable}
                  className={`mt-3 px-3 py-1 rounded-lg text-white font-bold transition ${
                    !isAffordable ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Buy
                </button>
              </div>
            );
          })}
        </div>

        {/* 🔄 Reroll button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={actions.rerollShop}
            disabled={gold < 30}
            className={`px-4 py-2 mt-3 rounded-lg text-white font-bold transition ${
              gold < 30 ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            🔄 Reroll Buffs (30g)
          </button>
        </div>
      </div>

      {/* 🧰 Mystery Equipment */}
      <div className="bg-yellow-900 p-4 rounded-xl border border-yellow-500 shadow-md flex justify-between items-center mt-6">
        <div>
          <div className="text-lg font-semibold text-white">🧰 Mystery Equipment</div>
          <div className="text-sm text-yellow-200">Get a random equipment for 150g</div>
        </div>
        <button
          onClick={actions.buyMysteryEquipment}
          disabled={gold < 150}
          className={`px-4 py-2 rounded-lg text-white font-bold transition ${
            gold < 150 ? 'bg-gray-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
          }`}
        >
          150g
        </button>
      </div>

      {/* ✅ Feature list */}
      <div className="mt-10 space-y-2 text-sm text-blue-300">
        <div>🎁 Features active:</div>
        <ul className="list-disc list-inside space-y-1 text-blue-400">
          <li>🧪 Potion shop working + inventory sync</li>
          <li>🎁 Deal: Buy 3 potions for 2x price</li>
          <li>🧬 Buff purchase system with timers</li>
          <li>🔄 Reroll Buffs for 30g</li>
          <li>🎲 Mystery Buff: random effects!</li>
          <li>🧰 Mystery Equipment: loot aléatoire pour 150g</li>
          <li>🛡️ Permanent upgrades for HP/ATK/DEF/CRIT</li>
          <li>💸 Gold always auto-updated & reflected live</li>
          <li>📈 Upgrades have real RPG impact (+stats)</li>
        </ul>
      </div>
    </div>
  );
}
