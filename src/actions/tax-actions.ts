'use server';

import z from 'zod';
import { calculateTax, type TaxResult } from '@/lib/tax-calculation';
import { flattenZodErrors } from '@/lib/tax-formatting-error-validation';
import { findTax } from '@/services/tax-service';

const TaxSchema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  state: z.string().min(2, 'State code is required (e.g., NY)'),
  year: z.coerce
    .number()
    .int()
    .min(1000, 'Must be a 4-digit year')
    .max(9999, 'Must be a 4-digit year'),
  productCategory: z.string({ message: 'Category is required' }),
});

export type TaxFormInputs = Partial<Record<keyof TaxInput, string>>;

export type ActionResponse =
  | {
      success: true;
      data: TaxResult & { state: string; year: number };
      inputs: TaxFormInputs;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      inputs?: TaxFormInputs;
    };

export const calculateTaxAction = async (
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  const rawData = Object.fromEntries(formData.entries());
  const validated = TaxSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check the fields.',
      fieldErrors: flattenZodErrors(validated.error),
      inputs: rawData,
    };
  }

  try {
    const { amount, state, year, productCategory } = validated.data;

    const rule = findTax({ amount, state, year, productCategory });

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
      inputs: rawData,
    };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unexpected error occurred';

    return { success: false, error: errorMessage };
  }
};
