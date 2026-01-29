import { Card } from '../types/game';

export const SAMPLE_CARDS: Card[] = [
  // Exploits
  {
    id: 'reentrancy-flash',
    name: 'Reentrancy Flash',
    type: 'exploit',
    cost: 3,
    power: 3,
    effect: 'Deal 3 damage to protocol health',
    description: 'A classic opener that pressures the opponent early.',
    rarity: 'common',
    image: 'https://v3b.fal.media/files/b/0a8c5018/t6TjzRgJKEpschjeuYXUR.png'
  },
  {
    id: 'oracle-manip',
    name: 'Oracle Manip',
    type: 'exploit',
    cost: 2,
    effect: 'Steal 1 yield token',
    description: 'Manipulate price feeds to drain resources.',
    rarity: 'common',
    image: 'https://v3b.fal.media/files/b/0a8c5018/t6TjzRgJKEpschjeuYXUR.png'
  },
  {
    id: 'sandwich-bot',
    name: 'Sandwich Bot',
    type: 'exploit',
    cost: 4,
    effect: 'Opponent skips next yield phase',
    description: 'Front-run their rewards with a sandwich attack.',
    rarity: 'uncommon',
    image: 'https://v3b.fal.media/files/b/0a8c5018/t6TjzRgJKEpschjeuYXUR.png'
  },
  // Patches
  {
    id: 'peckshield-audit',
    name: 'PeckShield Audit',
    type: 'patch',
    cost: 3,
    shield: 2,
    effect: 'Block next exploit + gain 1 shield',
    description: 'A thorough audit secures the foundation.',
    rarity: 'common',
    image: 'https://v3b.fal.media/files/b/0a8c5018/ALQZwti8VLnA0Thfsd8rv.png'
  },
  {
    id: 'liquidity-trap',
    name: 'Liquidity Trap',
    type: 'patch',
    cost: 4,
    yieldBonus: 2,
    effect: 'Counter bots/exploits + gain 2 yield',
    description: 'Turn their aggression into your liquidity.',
    rarity: 'uncommon',
    image: 'https://v3b.fal.media/files/b/0a8c5018/ALQZwti8VLnA0Thfsd8rv.png'
  },
  {
    id: 'autofi-patch',
    name: 'AutoFi Patch',
    type: 'patch',
    cost: 5,
    effect: 'Redirect 50% of incoming damage back',
    description: 'Automated defense protocols are always active.',
    rarity: 'rare',
    image: 'https://v3b.fal.media/files/b/0a8c5018/ALQZwti8VLnA0Thfsd8rv.png'
  },
  // Yields
  {
    id: 'iasset-stake',
    name: 'iAsset Stake',
    type: 'yield',
    cost: 2,
    yieldBonus: 1,
    effect: '+1 yield/turn (permanent)',
    description: 'Stake your assets for long-term growth.',
    rarity: 'common',
    image: 'https://v3b.fal.media/files/b/0a8c5018/1TYg4VQwuUHXXfMH2PChb.png'
  },
  {
    id: 'vesupra-lock',
    name: 'veSUPRA Lock',
    type: 'yield',
    cost: 3,
    effect: '+1 governance vote',
    description: 'Locked tokens grant voting power.',
    rarity: 'uncommon',
    image: 'https://v3b.fal.media/files/b/0a8c5018/1TYg4VQwuUHXXfMH2PChb.png'
  },
  {
    id: 'treasury-mev',
    name: 'Treasury MEV',
    type: 'yield',
    cost: 1,
    effect: 'Steal 1 yield (one-time)',
    description: 'Extract value directly from the mempool.',
    rarity: 'common',
    image: 'https://v3b.fal.media/files/b/0a8c5018/1TYg4VQwuUHXXfMH2PChb.png'
  },
  // Burns
  {
    id: 'supply-burn',
    name: 'Supply Burn',
    type: 'burn',
    cost: 6,
    effect: 'Permanently remove 1 card from opponent field',
    description: 'Reduce the supply to increase value.',
    rarity: 'rare',
    image: 'https://v3b.fal.media/files/b/0a8c5018/oq7j2a1ELahlAcDz59bZS.png'
  },
  {
    id: 'floor-enforce',
    name: 'Floor Enforce',
    type: 'burn',
    cost: 7,
    effect: 'If opponent <3 yield, deal 5 damage',
    description: 'Punish the under-collateralized.',
    rarity: 'rare',
    image: 'https://v3b.fal.media/files/b/0a8c5018/oq7j2a1ELahlAcDz59bZS.png'
  },
  {
    id: 'genesis-burn',
    name: 'Genesis Burn',
    type: 'burn',
    cost: 10,
    effect: 'Destroy all non-mythic cards on opponent field',
    description: 'The ultimate protocol wipe.',
    rarity: 'mythic',
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FD5u39HiMXMUzKr0qJ1g8Ky7ItQ03%2FPicsart_26-01-28_21-16-32-890__33e6e809.png?alt=media&token=c42feb6a-9c45-489a-917f-c896314b2ca6'
  }
];