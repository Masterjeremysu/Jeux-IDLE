
import { Equipment } from '../types/game';
import { RARITY_COLORS } from '../data/gameData';
import { useGame } from '../hooks/useGame';

export function Inventory() {
  const { gameState, actions } = useGame();
  const { inventory, equippedItems } = gameState;

  const renderItem = (item: Equipment, isEquipped: boolean = false) => (
    <div
      key={item.id}
      className={`bg-black/40 rounded-lg p-3 border-2 transition-all duration-200 hover:bg-black/60 ${
        isEquipped ? 'border-yellow-500 shadow-yellow-500/20 shadow-lg' : 'border-gray-600'
      }`}
      style={{ borderColor: isEquipped ? '#EAB308' : RARITY_COLORS[item.rarity] }}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{item.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold truncate" style={{ color: RARITY_COLORS[item.rarity] }}>
            {item.name}
            {isEquipped && <span className="ml-2 text-yellow-400">⭐</span>}
          </div>
          <div className="text-xs text-gray-400 capitalize">{item.rarity} {item.type}</div>
          <div className="text-xs text-gray-300 space-x-2">
            {item.bonuses.atk && <span className="text-orange-400">+{item.bonuses.atk} ATK</span>}
            {item.bonuses.def && <span className="text-blue-400">+{item.bonuses.def} DEF</span>}
            {item.bonuses.hp && <span className="text-red-400">+{item.bonuses.hp} HP</span>}
            {item.bonuses.critChance && <span className="text-yellow-400">+{item.bonuses.critChance}% CRIT</span>}
          </div>
        </div>
      </div>

      {!isEquipped && (
        <div className="mt-3 flex gap-2 justify-end">
          <button
            onClick={() => actions.equipItem(item)}
            className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white font-bold"
          >
            Equip
          </button>
          <button
            onClick={() => actions.sellEquipment(item)}
            className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white font-bold"
          >
            Sell +50g
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl p-6 shadow-2xl border border-gray-500/30">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">🎒 Inventory</h2>
      
      <div className="space-y-6">
        {/* Equipped Items */}
        <div>
          <h3 className="text-lg font-bold text-yellow-400 mb-3">⚡ Equipped</h3>
          <div className="space-y-2">
            {Object.entries(equippedItems).map(([slot, item]) => (
              <div key={slot}>
                {item ? (
                  renderItem(item, true)
                ) : (
                  <div className="bg-black/20 rounded-lg p-3 border-2 border-dashed border-gray-600 text-center text-gray-500">
                    No {slot} equipped
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Items */}
        <div>
          <h3 className="text-lg font-bold text-blue-400 mb-3">📦 Items ({inventory.length})</h3>
          {inventory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📦</div>
              <p>No items in inventory</p>
              <p className="text-sm">Defeat enemies to find equipment!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
              {inventory.map(item => renderItem(item))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
