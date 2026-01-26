import { findTax } from './tax-service';

describe('tax-service', () => {
  describe('findTax', () => {
    it('returns the matching tax rule', () => {
      const result = findTax({
        amount: 100,
        state: 'CA',
        year: 2024,
        productCategory: 'General',
      });

      expect(result).not.toBeNull();
      expect(result?.rate).toBe(0.1);
    });

    it('returns null when no matching rule is found', () => {
      const result = findTax({
        amount: 100,
        state: 'Mars',
        year: 3000,
        productCategory: 'Rocks',
      });

      expect(result).toBeNull();
    });
  });
});
