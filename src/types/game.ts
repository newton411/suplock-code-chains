export type CardType = 'exploit' | 'patch' | 'yield' | 'burn';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  effect: string;
  description: string;
  power?: number;
  shield?: number;
  yieldBonus?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythic';
  image?: string;
}

export interface Player {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  yield: number;
  maxYield: number;
  hand: Card[];
  deck: Card[];
  discard: Card[];
  field: Card[];
  shield: number;
  votes: number;
}

export type GamePhase = 'yield' | 'draw' | 'play' | 'combat' | 'end';

export interface GameState {
  players: {
    a: Player;
    b: Player;
  };
  turn: 'a' | 'b';
  phase: GamePhase;
  log: string[];
  turnNumber: number;
  winner: string | null;
}
