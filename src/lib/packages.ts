export const PACKAGES = {
  single: {
    id: 'single',
    name: 'Single Player',
    priceInCents: 12500,
    displayPrice: '$125',
  },
  team: {
    id: 'team',
    name: 'Team of 4',
    priceInCents: 50000,
    displayPrice: '$500',
  },
  premium: {
    id: 'premium',
    name: 'Team Sponsor Package',
    priceInCents: 125000,
    displayPrice: '$1,250',
  },
} as const;

export type PackageId = keyof typeof PACKAGES;

export const SPONSORSHIP_TIERS = {
  hole: {
    id: 'hole',
    name: 'Hole Sponsor',
    priceInCents: 30000,
    displayPrice: '$300',
  },
  cart: {
    id: 'cart',
    name: 'Cart Sponsor',
    priceInCents: 60000,
    displayPrice: '$600',
  },
  'team-sponsor': {
    id: 'team-sponsor',
    name: 'Team Sponsor',
    priceInCents: 125000,
    displayPrice: '$1,250',
  },
  title: {
    id: 'title',
    name: 'Title Sponsor',
    priceInCents: 300000,
    displayPrice: '$3,000',
  },
} as const;

export type SponsorshipTierId = keyof typeof SPONSORSHIP_TIERS;
