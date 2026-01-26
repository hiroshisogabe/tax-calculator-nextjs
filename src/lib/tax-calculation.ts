import { findTax, type TaxInput } from '@/services/tax-service';

export type TaxResult = {
  taxRate: number;
  taxAmount: number;
  total: number;
};

export const calculateTax = (input: TaxInput): TaxResult => {
  const rule = findTax(input);

  // TODO: throw an error if no rule found, should we specify which props from input wasn't found if possible?
  const rate = rule ? rule.rate : 0;

  const taxAmount = input.amount * rate;
  const total = input.amount + taxAmount;

  return {
    taxRate: rate,
    taxAmount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
