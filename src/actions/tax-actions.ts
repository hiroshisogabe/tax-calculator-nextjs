'use server';

import { calculateTax, type TaxResult } from '@/lib/tax-calculation';
import { findTax, type TaxInput } from '@/services/tax-service';

export type ActionResponse =
  | { success: true; data: TaxResult & { state: string; year: number } }
  | { success: false; error: string };

export const calculateTaxAction = async (
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    const amountStr = formData.get('amount') as string;
    const state = formData.get('state') as string;
    const yearStr = formData.get('year') as string;
    const productCategory = formData.get('productCategory') as string;

    const amount = Number.parseFloat(amountStr);
    const year = Number.parseInt(yearStr, 10);

    if (Number.isNaN(amount) || amount <= 0) {
      return { success: false, error: 'Invalid amount provided.' };
    }

    const input: TaxInput = { amount, state, year, productCategory };
    const rule = findTax(input);

    // TODO: should we throw an error if no rule found? In addition, specify which props from input wasn't found if possible?
    const rate = rule ? rule.rate : 0;

    const result = calculateTax({ amount, rate });

    return {
      success: true,
      data: {
        ...result,
        state,
        year,
      },
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unexpected error occurred';

    return { success: false, error: errorMessage };
  }
};
