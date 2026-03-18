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
