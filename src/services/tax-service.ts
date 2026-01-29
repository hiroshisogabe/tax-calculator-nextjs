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

export type FindTaxType = (input: TaxInput) => Promise<TaxResult | null>;

// TODO: retrieve TAX_RULES from a database or external service
const TAX_RULES = [
  { state: 'CA', year: 2024, category: 'General', rate: 0.1 },
  { state: 'TX', year: 2024, category: 'General', rate: 0.06 },
  { state: 'NY', year: 2025, category: 'Food', rate: 0.0 },
];

export const getSupportedRates = async () => {
  // Artificial delay for 2 seconds to see the skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return TAX_RULES;
};

export const findTax: FindTaxType = async (input) => {
  const rules = await getSupportedRates();

  return (
    rules.find(
      (r) =>
        r.state === input.state &&
        r.year === input.year &&
        r.category === input.productCategory,
    ) || null
  );
};
