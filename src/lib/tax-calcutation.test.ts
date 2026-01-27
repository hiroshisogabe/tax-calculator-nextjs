import { calculateTax } from './tax-calculation';

describe('tax-service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateTax', () => {
    it('calculates correct tax when rule is found', () => {
      const result = calculateTax({
        amount: 100,
        rate: 0.1,
      });

      expect(result.taxRate).toBe(0.1);
      expect(result.taxAmount).toBe(10);
      expect(result.total).toBe(110);
    });

    it('calculates correct tax with different rate', () => {
      const result = calculateTax({
        amount: 1000,
        rate: 0.06,
      });

      expect(result.taxRate).toBe(0.06);
      expect(result.taxAmount).toBe(60);
      expect(result.total).toBe(1060);
    });

    it('returns 0 tax when rule is not found', () => {
      const result = calculateTax({
        amount: 100,
        rate: 0,
      });

      expect(result.taxAmount).toBe(0);
      expect(result.total).toBe(100);
    });
  });
});
