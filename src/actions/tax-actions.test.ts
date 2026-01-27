import { calculateTaxAction } from './tax-actions';

const createFormData = (year: string) => {
  const formData = new FormData();
  formData.append('amount', '100');
  formData.append('state', 'CA');
  formData.append('year', year);
  formData.append('productCategory', 'General');
  return formData;
};

describe('Tax Action Integration', () => {
  it('should return a successful tax calculation for valid input', async () => {
    const formData = new FormData();
    formData.append('amount', '100');
    formData.append('state', 'CA');
    formData.append('year', '2024');
    formData.append('productCategory', 'General');

    const response = await calculateTaxAction(null, formData);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data.taxAmount).toBe(10);
      expect(response.data.total).toBe(110);
    }
  });

  it('should return an error for invalid formData', async () => {
    const formData = new FormData();
    formData.append('amount', 'not-a-number');

    const response = await calculateTaxAction(null, formData);

    expect(response.success).toBe(false);
    if (!response.success) {
      expect(response.error).toBe(
        'Invalid form data. Please check the fields.',
      );
    }
  });

  it('should return field-specific errors when validation fails', async () => {
    const formData = new FormData();
    formData.append('amount', '-50');
    formData.append('state', '');

    const response = await calculateTaxAction(null, formData);

    expect(response.success).toBe(false);
    if (!response.success && response.fieldErrors) {
      expect(response.fieldErrors.amount).toContain(
        'Amount must be greater than zero',
      );
      expect(response.fieldErrors.state).toBeDefined();
    }
  });

  it('should reject years that are not exactly 4 digits', async () => {
    const responseShort = await calculateTaxAction(null, createFormData('999'));
    expect(responseShort.success).toBe(false);
    if (!responseShort.success && responseShort.fieldErrors) {
      expect(responseShort.fieldErrors.year).toContain(
        'Must be a 4-digit year',
      );
    }

    const responseLong = await calculateTaxAction(
      null,
      createFormData('10000'),
    );
    expect(responseLong.success).toBe(false);
    if (!responseLong.success && responseLong.fieldErrors) {
      expect(responseLong.fieldErrors.year).toContain('Must be a 4-digit year');
    }
  });
});
