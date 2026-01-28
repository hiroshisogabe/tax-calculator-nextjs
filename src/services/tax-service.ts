export type TaxInput = {
  amount: number;
  state: string;
  year: number;
  productCategory: string;
};

export type TaxResult = {
  state: string;
  year: number;
  category: string;
  rate: number;
};

export type FindTaxType = (input: TaxInput) => TaxResult | null;

// TODO: retrieve TAX_RULES from a database or external service
const TAX_RULES = [
  { state: 'CA', year: 2024, category: 'General', rate: 0.1 },
  { state: 'TX', year: 2024, category: 'General', rate: 0.06 },
  { state: 'NY', year: 2025, category: 'Food', rate: 0.0 },
];

export const getSupportedRates = () => TAX_RULES;

export const findTax: FindTaxType = (input) => {
  const rules = getSupportedRates();

  return (
    rules.find(
      (r) =>
        r.state === input.state &&
        r.year === input.year &&
        r.category === input.productCategory,
    ) || null
  );
};
