import z, { type ZodError } from 'zod';

export function flattenZodErrors(error: ZodError): Record<string, string[]> {
  const flattened = z.flattenError(error);

  return flattened.fieldErrors;
}
