import { useEffect, useRef } from 'react';

interface CombatLogProps {
  logs: string[];
}

export function CombatLog({ logs }: CombatLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogStyle = (log: string, index: number) => {
    if (log.includes('💰') || log.includes('gold')) return 'text-yellow-400';
    if (log.includes('✨') || log.includes('XP')) return 'text-purple-400';
    if (log.includes('🧪') || log.includes('Potion')) return 'text-green-400';
    if (log.includes('⚡') || log.includes('CRITICAL')) return 'text-orange-400';
    if (log.includes('💀') || log.includes('defeated')) return 'text-red-400';
    if (log.includes('🎉') || log.includes('LEVEL UP')) return 'text-blue-400 font-bold';
    if (log.includes('🏆') || log.includes('Achievement')) return 'text-pink-400 font-bold';
    if (log.includes('🧬') || log.includes('Buff')) return 'text-cyan-400';
    if (log.includes('⚔️') || log.includes('deal')) return 'text-white';
    return index === 0 ? 'text-white font-medium' : 'text-gray-300';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 shadow-2xl border border-gray-600/30">
      <h3 className="text-lg font-bold text-white mb-3">📜 Combat Log</h3>
      <div className="bg-black/50 rounded-lg p-3 h-40 overflow-y-auto custom-scrollbar space-y-1">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center">No combat logs yet...</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`text-sm animate-fade-in ${getLogStyle(log, index)}`}
              style={{ opacity: Math.max(0.4, 1 - index * 0.1) }}
            >
              <span className="text-gray-500 text-xs mr-1">•</span>
              {log}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
