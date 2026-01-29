import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, Card, GamePhase } from '../types/game';
import { SAMPLE_CARDS } from '../lib/cards';

const INITIAL_HEALTH = 30;
const INITIAL_YIELD = 20;
const INITIAL_HAND_SIZE = 5;

const createPlayer = (id: string, name: string): Player => {
  const deck = [...SAMPLE_CARDS, ...SAMPLE_CARDS].sort(() => Math.random() - 0.5);
  const hand = deck.splice(0, INITIAL_HAND_SIZE);
  
  return {
    id,
    name,
    health: INITIAL_HEALTH,
    maxHealth: INITIAL_HEALTH,
    yield: INITIAL_YIELD,
    maxYield: INITIAL_YIELD,
    hand,
    deck,
    discard: [],
    field: [],
    shield: 0,
    votes: 0,
  };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    players: {
      a: createPlayer('a', 'Architect A'),
      b: createPlayer('b', 'Hacker B'),
    },
    turn: 'a',
    phase: 'draw',
    log: ['Game Started!'],
    turnNumber: 1,
    winner: null,
  });

  const addLog = (message: string) => {
    setState(s => ({ ...s, log: [message, ...s.log].slice(0, 50) }));
  };

  const nextPhase = useCallback(() => {
    setState(s => {
      if (s.winner) return s;

      let nextPhase: GamePhase = s.phase;
      let nextTurn = s.turn;
      let nextPlayers = { ...s.players };
      let nextTurnNumber = s.turnNumber;

      switch (s.phase) {
        case 'yield':
          nextPhase = 'draw';
          break;
        case 'draw':
          // Automatic drawing happened at start of turn
          nextPhase = 'play';
          break;
        case 'play':
          nextPhase = 'combat';
          break;
        case 'combat':
          nextPhase = 'end';
          break;
        case 'end':
          nextTurn = s.turn === 'a' ? 'b' : 'a';
          nextPhase = 'yield';
          if (nextTurn === 'a') nextTurnNumber++;
          break;
      }

      // Handle phase transitions
      if (nextPhase === 'yield') {
        const currentPlayer = nextPlayers[nextTurn];
        // Calculate yield from field
        const yieldGain = 1 + currentPlayer.field.reduce((acc, card) => acc + (card.yieldBonus || 0), 0);
        currentPlayer.yield = Math.min(currentPlayer.maxYield, currentPlayer.yield + yieldGain);
        addLog(`${currentPlayer.name} gained ${yieldGain} yield.`);
      }

      if (nextPhase === 'draw') {
        const currentPlayer = nextPlayers[nextTurn];
        if (currentPlayer.deck.length > 0) {
          const [card, ...remainingDeck] = currentPlayer.deck;
          currentPlayer.hand.push(card);
          currentPlayer.deck = remainingDeck;
          addLog(`${currentPlayer.name} drew a card.`);
        }
      }

      return {
        ...s,
        players: nextPlayers,
        turn: nextTurn,
        phase: nextPhase,
        turnNumber: nextTurnNumber,
      };
    });
  }, []);

  const playCard = (cardId: string) => {
    setState(s => {
      if (s.phase !== 'play') return s;
      
      const currentPlayer = s.players[s.turn];
      const opponentPlayer = s.players[s.turn === 'a' ? 'b' : 'a'];
      const card = currentPlayer.hand.find(c => c.id === cardId);
      
      if (!card || currentPlayer.yield < card.cost) return s;

      const nextPlayers = { ...s.players };
      const nextCurrentPlayer = { ...currentPlayer };
      const nextOpponentPlayer = { ...opponentPlayer };

      nextCurrentPlayer.yield -= card.cost;
      nextCurrentPlayer.hand = nextCurrentPlayer.hand.filter(c => c.id !== cardId);
      
      addLog(`${nextCurrentPlayer.name} played ${card.name}.`);

      // Immediate effects
      if (card.type === 'yield' || card.type === 'patch') {
        nextCurrentPlayer.field.push(card);
        if (card.shield) nextCurrentPlayer.shield += card.shield;
      }

      if (card.id === 'oracle-manip') {
        const steal = Math.min(1, nextOpponentPlayer.yield);
        nextOpponentPlayer.yield -= steal;
        nextCurrentPlayer.yield += steal;
        addLog(`Oracle Manip stole ${steal} yield.`);
      }

      if (card.id === 'treasury-mev') {
        const steal = Math.min(1, nextOpponentPlayer.yield);
        nextOpponentPlayer.yield -= steal;
        nextCurrentPlayer.yield += steal;
      }

      if (card.id === 'supply-burn') {
        if (nextOpponentPlayer.field.length > 0) {
          const removed = nextOpponentPlayer.field.pop();
          addLog(`Supply Burn removed ${removed?.name}.`);
        }
      }

      if (card.id === 'genesis-burn') {
        nextOpponentPlayer.field = nextOpponentPlayer.field.filter(c => c.rarity === 'mythic');
        addLog(`Genesis Burn wiped the field!`);
      }

      nextPlayers[s.turn] = nextCurrentPlayer;
      nextPlayers[s.turn === 'a' ? 'b' : 'a'] = nextOpponentPlayer;

      return { ...s, players: nextPlayers };
    });
  };

  const resolveCombat = () => {
    setState(s => {
      if (s.phase !== 'combat') return s;

      const currentPlayer = s.players[s.turn];
      const opponentPlayer = s.players[s.turn === 'a' ? 'b' : 'a'];
      
      const damage = currentPlayer.hand
        .filter(c => c.type === 'exploit')
        .reduce((acc, c) => acc + (c.power || 0), 0);

      if (damage === 0) {
        addLog(`No combat damage dealt.`);
        return s;
      }

      const nextOpponentPlayer = { ...opponentPlayer };
      let remainingDamage = damage;

      if (nextOpponentPlayer.shield > 0) {
        const absorbed = Math.min(nextOpponentPlayer.shield, remainingDamage);
        nextOpponentPlayer.shield -= absorbed;
        remainingDamage -= absorbed;
        addLog(`Shield absorbed ${absorbed} damage.`);
      }

      nextOpponentPlayer.health = Math.max(0, nextOpponentPlayer.health - remainingDamage);
      addLog(`${currentPlayer.name} dealt ${remainingDamage} damage to ${opponentPlayer.name}.`);

      const nextPlayers = { ...s.players };
      nextPlayers[s.turn === 'a' ? 'b' : 'a'] = nextOpponentPlayer;

      let winner = s.winner;
      if (nextOpponentPlayer.health <= 0) {
        winner = currentPlayer.name;
      }

      return { ...s, players: nextPlayers, winner };
    });
  };

  return {
    state,
    playCard,
    nextPhase,
    resolveCombat,
  };
};
