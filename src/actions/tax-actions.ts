'use server';

import { calculateTax } from '@/lib/tax-calculation';
import { findTax, type TaxInput } from '@/services/tax-service';

export async function calculateTaxAction(formData: TaxInput) {
  const rule = findTax(formData);

  // TODO: should we throw an error if no rule found? In addition, specify which props from input wasn't found if possible?
  const rate = rule ? rule.rate : 0;

  const result = calculateTax({
    amount: formData.amount,
    rate: rate,
  });

  return {
    ...result,
    state: formData.state,
    year: formData.year,
    category: formData.productCategory,
    ruleFound: !!rule,
  };
}
