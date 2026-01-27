export type TaxInput = {
  rate: number;
  amount: number;
};

export type TaxResult = {
  taxRate: number;
  taxAmount: number;
  total: number;
};

export const calculateTax = (input: TaxInput): TaxResult => {
  const taxAmount = input.amount * input.rate;
  const total = input.amount + taxAmount;

  return {
    taxRate: input.rate,
    taxAmount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
