import { calculateTaxAction } from './tax-actions';

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

  it('should return an error for invalid amounts', async () => {
    const formData = new FormData();
    formData.append('amount', 'not-a-number');

    const response = await calculateTaxAction(null, formData);

    expect(response.success).toBe(false);
    if (!response.success) {
      expect(response.error).toBe('Invalid amount provided.');
    }
  });
});
