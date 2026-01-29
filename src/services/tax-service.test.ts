import { findTax, getSupportedRates } from './tax-service';

jest.mock('./tax-service', () => ({
  ...jest.requireActual('./tax-service'),
  getSupportedRates: jest.fn(),
}));

describe('tax-service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findTax', () => {
    it('returns the matching tax rule', async () => {
      (getSupportedRates as jest.Mock).mockReturnValue([
        { state: 'CA', year: 2024, category: 'General', rate: 0.1 },
      ]);

      const result = await findTax({
        amount: 100,
        state: 'CA',
        year: 2024,
        productCategory: 'General',
      });

      expect(result).not.toBeNull();
      expect(result?.rate).toBe(0.1);
    });

    it('returns null when no matching rule is found', async () => {
      (getSupportedRates as jest.Mock).mockReturnValue([
        { state: 'CA', year: 2024, category: 'General', rate: 0.1 },
      ]);

      const result = await findTax({
        amount: 100,
        state: 'Mars',
        year: 3000,
        productCategory: 'Rocks',
      });

      expect(result).toBeNull();
    });
  });
});
