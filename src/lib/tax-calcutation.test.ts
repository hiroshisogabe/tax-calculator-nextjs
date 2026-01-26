import { findTax } from '@/services/tax-service';
import { calculateTax } from './tax-calculation';

jest.mock('./tax-calculation', () => ({
  ...jest.requireActual('./tax-calculation'),
  findTax: jest.fn(),
}));

const staticParams = {
  state: 'CA',
  year: 2024,
  productCategory: 'General',
};

describe('tax-service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateTax', () => {
    it('calculates correct tax when rule is found', () => {
      (findTax as jest.Mock).mockReturnValue({ rate: 0.1 });

      const result = calculateTax({
        amount: 100,
        ...staticParams,
      });

      expect(result.taxRate).toBe(0.1);
      expect(result.taxAmount).toBe(10);
      expect(result.total).toBe(110);
    });

    it('calculates correct tax with different rate', () => {
      (findTax as jest.Mock).mockReturnValue({ rate: 0.06 });

      const result = calculateTax({
        amount: 1000,
        ...staticParams,
      });

      expect(result.taxRate).toBe(0.06);
      expect(result.taxAmount).toBe(60);
      expect(result.total).toBe(1060);
    });

    it('returns 0 tax when rule is not found', () => {
      (findTax as jest.Mock).mockReturnValue(null);

      const result = calculateTax({
        amount: 100,
        ...staticParams,
      });

      expect(result.taxAmount).toBe(0);
      expect(result.total).toBe(100);
    });
  });
});
