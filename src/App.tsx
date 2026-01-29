import React, { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { Board } from './components/game/Board';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from './lib/utils'; // Assuming cn utility is available

function App() {
  const { state, playCard, nextPhase, resolveCombat } = useGameState();
  const [started, setStarted] = React.useState(false);

  useEffect(() => {
    if (state.phase === 'combat') {
      const timer = setTimeout(() => {
        resolveCombat();
        toast.info('Combat resolution complete. Commit to end turn.');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.phase]);

  if (!started) {
    return (
      <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center p-8 cyber-grid text-center relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="mb-4 inline-block px-4 py-1 border border-primary/30 rounded-full bg-primary/5 text-[10px] font-mono tracking-[0.4em] text-primary animate-pulse">
            PROTOCOL_VERSION_2.0_READY
          </div>
          
          <h1 className="text-9xl font-mono font-black uppercase tracking-tighter mb-2 glow-text italic text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/40 leading-none">
            SUPLOCK
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-primary font-mono font-bold tracking-[0.5em] uppercase text-sm">
              Code & Chains
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <div className="max-w-xl mx-auto space-y-8 mb-16 text-sm opacity-80 leading-relaxed font-mono">
            <p className="text-white/60">
              The centralized financial stack has collapsed. You are a protocol architect 
              vying for control over the remaining liquidity chains. Hack, build, and burn 
              your way to the genesis block.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'EXPLOITS', color: 'text-exploit', border: 'border-exploit/30', bg: 'bg-exploit/5', desc: 'Direct Hacking' },
                { name: 'PATCHES', color: 'text-patch', border: 'border-patch/30', bg: 'bg-patch/5', desc: 'Secure Audits' },
                { name: 'YIELDS', color: 'text-yield', border: 'border-yield/30', bg: 'bg-yield/5', desc: 'Liquidity Ramp' },
                { name: 'BURNS', color: 'text-burn', border: 'border-burn/30', bg: 'bg-burn/5', desc: 'Protocol Wipe' },
              ].map((type) => (
                <motion.div 
                  key={type.name}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  className={cn("p-4 border rounded-sm mechanical-frame backdrop-blur-sm", type.border, type.bg)}
                >
                  <span className={cn("font-bold block mb-1 text-[10px] tracking-widest", type.color)}>{type.name}</span>
                  <span className="text-[9px] opacity-40 uppercase tracking-tighter">{type.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/40 blur-xl rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              className="relative px-20 py-5 bg-primary text-primary-foreground font-mono font-black uppercase tracking-[0.5em] rounded-sm shadow-[0_0_40px_rgba(155,100%,50%,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Initialize System
            </motion.button>
          </div>

          <div className="mt-16 flex justify-center gap-10 text-[8px] font-mono opacity-20 uppercase tracking-[0.5em]">
            <span>Secure_Shell_Active</span>
            <span>Latency_0.02ms</span>
            <span>Uptime_99.99%</span>
          </div>
        </motion.div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Board 
        state={state} 
        onPlayCard={playCard} 
        onNextPhase={nextPhase} 
      />
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}

export default App;
