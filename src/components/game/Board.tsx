import React from 'react';
import { GameState, Card as CardType } from '../../types/game';
import { CardItem } from './CardItem';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Shield, TrendingUp, Users, Activity, Terminal, Database, ShieldCheck, Zap, Binary } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BoardProps {
  state: GameState;
  onPlayCard: (cardId: string) => void;
  onNextPhase: () => void;
}

export const Board: React.FC<BoardProps> = ({ state, onPlayCard, onNextPhase }) => {
  const { players, turn, phase, winner } = state;
  const currentPlayer = players[turn];
  const opponent = players[turn === 'a' ? 'b' : 'a'];

  const PlayerStats = ({ player, isOpponent }: { player: any, isOpponent?: boolean }) => (
    <div className={cn(
      "flex flex-col gap-3 p-4 border rounded-sm transition-all duration-500",
      isOpponent ? "border-exploit/30 bg-exploit/5" : "border-primary/30 bg-primary/5",
      "mechanical-frame backdrop-blur-sm"
    )}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full border shadow-lg",
            isOpponent ? "border-exploit/50 bg-exploit/10" : "border-primary/50 bg-primary/10"
          )}>
            {isOpponent ? <Users className="w-4 h-4 text-exploit" /> : <ShieldCheck className="w-4 h-4 text-primary" />}
          </div>
          <div>
            <h2 className={cn(
              "text-xs font-mono font-bold uppercase tracking-widest",
              isOpponent ? "text-exploit" : "text-primary"
            )}>
              {player.name}
            </h2>
            <div className="text-[8px] font-mono opacity-40 uppercase">Network Identity // {isOpponent ? 'Hacker_B' : 'Architect_A'}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="font-mono text-[10px] border-white/20 bg-white/5">
            {player.shield} SHD
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px] border-white/20 bg-white/5">
            {player.votes} VOT
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-mono font-bold uppercase opacity-60">
            <span>Protocol Integrity (Supply)</span>
            <span>{player.health} / {player.maxHealth}</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(player.health / player.maxHealth) * 100}%` }}
              className={cn("h-full", isOpponent ? "bg-exploit shadow-[0_0_8px_rgba(320,100%,60%,1)]" : "bg-primary shadow-[0_0_8px_rgba(155,100%,50%,1)]")}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-mono font-bold uppercase opacity-60">
            <span>Yield Reserve (Liquidity)</span>
            <span>{player.yield} / {player.maxYield}</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(player.yield / player.maxYield) * 100}%` }}
              className="bg-yield shadow-[0_0_8px_rgba(155,100%,50%,1)] h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-[8px] font-mono opacity-40 uppercase tracking-tighter">
        <span>Hand: {player.hand.length} / 7</span>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
          ))}
        </div>
        <span>Nodes: {player.field.length} active</span>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col gap-6 p-6 cyber-grid min-h-screen bg-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 scanline-overlay opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Bar: Opponent & Terminal */}
      <div className="grid grid-cols-12 gap-6 z-10">
        <div className="col-span-8">
          <PlayerStats player={opponent} isOpponent />
        </div>
        <div className="col-span-4 flex flex-col gap-3 p-4 border border-white/10 bg-black/60 mechanical-frame backdrop-blur-md rounded-sm">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-3 h-3 text-primary" />
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">Network_Logs.exe</h3>
          </div>
          <div className="flex-1 overflow-y-auto text-[9px] font-mono space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
            <AnimatePresence mode="popLayout">
              {state.log.slice(-10).map((entry, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={cn(
                    "border-l-2 pl-2 py-1 leading-tight",
                    entry.includes('damage') ? 'border-exploit text-exploit/80' : 'border-primary text-primary/80'
                  )}
                >
                  <span className="opacity-30 mr-1">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
                  {`> ${entry}`}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Battle Grid (The Chain) */}
      <div className="flex-1 flex flex-col gap-6 justify-center items-center py-8 relative">
        {/* Animated Center Line */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

        <div className="text-[8px] font-mono font-bold uppercase tracking-[1em] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/10 z-0">
          Mainnet Protocol Layer v2.0
        </div>
        
        {/* Opponent Field */}
        <div className="flex gap-6 justify-center items-center min-h-[160px] w-full z-10">
          <AnimatePresence>
            {opponent.field.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-mono opacity-20 uppercase tracking-widest italic border border-dashed border-white/10 px-8 py-4 rounded-lg">
                No Active Exploits Detected
              </motion.div>
            ) : (
              opponent.field.map((card, i) => (
                <motion.div key={i} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <CardItem card={card} isCompact disabled />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Current Player Field */}
        <div className="flex gap-6 justify-center items-center min-h-[160px] w-full z-10">
          <AnimatePresence>
            {currentPlayer.field.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-mono opacity-20 uppercase tracking-widest italic border border-dashed border-white/10 px-8 py-4 rounded-lg">
                Awaiting Protocol Deployment
              </motion.div>
            ) : (
              currentPlayer.field.map((card, i) => (
                <motion.div key={i} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <CardItem card={card} isCompact />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Interface: Controls & Hand */}
      <div className="flex flex-col gap-6 z-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-8">
            <PlayerStats player={currentPlayer} />
          </div>
          
          <div className="col-span-4 flex flex-col gap-4">
            <div className="flex flex-col items-center bg-black/60 p-4 mechanical-frame border border-white/10 backdrop-blur-md rounded-sm">
              <div className="flex justify-between w-full mb-3">
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Turn Sequence</span>
                <span className="text-[9px] font-mono text-primary uppercase font-bold">Block #{state.turnNumber * 128}</span>
              </div>
              
              <div className="relative w-full mb-4">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-sm" />
                <Badge variant="outline" className="relative w-full text-sm font-mono font-bold py-2 border-primary/50 text-primary flex justify-center items-center gap-2 overflow-hidden">
                  <Activity className="w-3 h-3 animate-pulse" />
                  {state.phase.toUpperCase()} PHASE ACTIVE
                </Badge>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(155, 100%, 50%, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onNextPhase}
                className="w-full py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Commit Protocol
              </motion.button>
            </div>
          </div>
        </div>

        {/* Player Hand - The Hacker's Deck */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-primary" />
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">Local_Vault // Decrypted_Exploits</div>
            </div>
            <div className="text-[8px] font-mono opacity-40 uppercase">Drag to deploy // Pay liquidity to execute</div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 px-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {currentPlayer.hand.map((card, i) => (
              <CardItem 
                key={i} 
                card={card} 
                onClick={() => onPlayCard(card.id)} 
                disabled={phase !== 'play' || currentPlayer.yield < card.cost}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Victory / Defeat HUD */}
      <AnimatePresence>
        {winner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center gap-8 p-4 text-center overflow-hidden"
          >
            {/* Background Glitch Effects */}
            <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="relative"
            >
              <h1 className="text-8xl font-mono font-black uppercase tracking-[0.2em] text-primary animate-pulse drop-shadow-[0_0_30px_rgba(155,100%,50%,0.8)] italic">
                {winner === players.a.name ? 'VICTORY' : 'DEFEAT'}
              </h1>
              <div className="absolute -top-10 -right-10 text-xs font-mono opacity-50 uppercase tracking-widest bg-black p-2 border border-white/10">
                Mainnet_Control_Aquired // 100%
              </div>
            </motion.div>

            <div className="max-w-md space-y-4">
              <div className="text-xl font-mono font-bold uppercase tracking-widest text-white/80 border-y border-white/10 py-4">
                {winner} has seized full protocol control
              </div>
              <p className="text-xs font-mono opacity-40 leading-relaxed uppercase">
                The decentralized economy has been reshaped. The chains have been broken. 
                All assets have been re-allocated to the victor's vault.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(155, 100%, 50%, 1)', color: '#000' }}
              onClick={() => window.location.reload()}
              className="px-16 py-5 border-2 border-primary text-primary font-mono font-bold uppercase tracking-widest transition-all rounded-sm flex items-center gap-3"
            >
              <Binary className="w-5 h-5" />
              Re-Initialize System
            </motion.button>

            <div className="absolute bottom-10 flex gap-10 text-[8px] font-mono opacity-20 uppercase tracking-[0.5em]">
              <span>Protocol_Suplock_v2.0</span>
              <span>Genesis_Block_0x0001</span>
              <span>Encrypted_Session_End</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
