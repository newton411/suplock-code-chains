import React from 'react';
import { Card as CardType } from '../../types/game';
import { cn } from '../../lib/utils';
import { Shield, Zap, TrendingUp, Flame, Binary, Cpu, Network } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardItemProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
  isCompact?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({ card, onClick, disabled, isCompact }) => {
  const typeColors = {
    exploit: 'text-exploit drop-shadow-[0_0_8px_rgba(320,100%,60%,0.8)]',
    patch: 'text-patch drop-shadow-[0_0_8px_rgba(190,100%,50%,0.8)]',
    yield: 'text-yield drop-shadow-[0_0_8px_rgba(155,100%,50%,0.8)]',
    burn: 'text-burn drop-shadow-[0_0_8px_rgba(25,100%,55%,0.8)]',
  };

  const typeBorderColors = {
    exploit: 'border-exploit/50',
    patch: 'border-patch/50',
    yield: 'border-yield/50',
    burn: 'border-burn/50',
  };

  const TypeIcon = {
    exploit: Zap,
    patch: Shield,
    yield: TrendingUp,
    burn: Flame,
  }[card.type];

  // Map rarities to visual styles
  const isMythic = card.rarity === 'mythic';
  const isRare = card.rarity === 'rare';

  if (isCompact) {
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={!disabled ? onClick : undefined}
        className={cn(
          "relative flex flex-col items-center justify-center p-2 border-2 transition-all cursor-pointer",
          typeBorderColors[card.type],
          disabled && "opacity-50 cursor-not-allowed grayscale",
          "w-24 h-32 text-center bg-black/80 mechanical-frame",
          isMythic && "rainbow-border"
        )}
      >
        <div className="absolute top-1 right-2 text-[10px] font-mono font-bold text-primary">{card.cost}</div>
        <TypeIcon className={cn("w-6 h-6 mb-1", typeColors[card.type])} />
        <div className="text-[10px] font-mono font-bold uppercase leading-tight truncate w-full px-1">{card.name}</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative group flex flex-col p-1 transition-all cursor-pointer overflow-hidden",
        "w-64 h-96",
        disabled && "opacity-50 cursor-not-allowed grayscale",
        isMythic ? "rainbow-border" : "border border-white/10 bg-black/40"
      )}
      style={{ perspective: '1000px' }}
    >
      {/* Mechanical Background Details */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <Cpu className="absolute -top-10 -left-10 w-40 h-40 rotate-12" />
        <Network className="absolute -bottom-10 -right-10 w-40 h-40 -rotate-12" />
        <div className="absolute inset-0 cyber-grid" />
      </div>

      <div className="relative flex-1 flex flex-col bg-black/80 mechanical-frame overflow-hidden rounded-sm border border-white/5">
        {/* Top Header */}
        <div className="flex justify-between items-center p-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <div className={cn("p-1 rounded-full border bg-black", typeBorderColors[card.type])}>
              <TypeIcon className={cn("w-4 h-4", typeColors[card.type])} />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">{card.type}</span>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] font-mono opacity-50 uppercase">Yield Cost</span>
            <span className="text-xl font-mono font-bold text-primary tracking-tighter">{card.cost}</span>
          </div>
        </div>

        {/* Card Artwork Area */}
        <div className="relative h-44 border-b border-white/10 overflow-hidden bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
          {/* Matrix Scanline Effect */}
          <div className="absolute inset-0 scanline-overlay opacity-30 z-10" />
          
          {/* Rarity Glow */}
          <div className={cn(
            "absolute inset-0 opacity-20 blur-2xl",
            isMythic ? "bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500" :
            isRare ? "bg-amber-500" : "bg-primary/20"
          )} />

          <div className="absolute inset-0 flex items-center justify-center">
            {card.image ? (
              <img src={card.image} alt={card.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            ) : (
              <Binary className={cn("w-24 h-24 opacity-10", typeColors[card.type])} />
            )}
          </div>

          {/* Rarity Badge */}
          <div className="absolute bottom-2 right-2 z-20">
            <div className={cn(
              "px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase border",
              isMythic ? "bg-black text-white border-white animate-pulse" : 
              isRare ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : 
              "bg-white/10 text-white/60 border-white/20"
            )}>
              {card.rarity}
            </div>
          </div>
        </div>

        {/* Card Title and Description */}
        <div className="p-4 flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
          <h3 className={cn(
            "text-lg font-mono font-bold uppercase tracking-tighter leading-tight mb-2",
            isMythic ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" : typeColors[card.type]
          )}>
            {card.name}
          </h3>
          
          <div className="bg-white/5 rounded p-2 mb-2 border border-white/5">
            <p className="text-[11px] font-mono text-white/90 leading-snug">
              {card.effect}
            </p>
          </div>

          <p className="text-[9px] font-mono text-white/40 italic leading-tight mt-auto">
            {card.description}
          </p>
        </div>

        {/* Card Footer Info */}
        <div className="px-4 py-2 bg-black flex justify-between items-center border-t border-white/10">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-primary/40 rounded-full" />
            <div className="w-1 h-1 bg-primary/20 rounded-full" />
          </div>
          <span className="text-[8px] font-mono opacity-30">PROT-v2.0 // S001</span>
        </div>
      </div>
      
      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none group-hover:opacity-100 transition-opacity opacity-0" />
    </motion.div>
  );
};