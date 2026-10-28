export interface DistanceCharges {
  baseCharge: number;
  perKmRate: number;
  minCharge: number;
}

/** Items total + base charge + per-km charge, never below the minimum. */
export function calculatePrice(
  itemsTotal: number,
  km: number,
  { baseCharge, perKmRate, minCharge }: DistanceCharges
) {
  const total = itemsTotal + baseCharge + Math.round(perKmRate * km);
  return Math.max(total, minCharge);
}

export const formatInr = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;
