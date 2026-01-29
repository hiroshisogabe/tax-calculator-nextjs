import { getSupportedRates } from '@/services/tax-service';

export default async function SupportSummary() {
  const rates = getSupportedRates();

  return (
    <section className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        System Coverage
      </h3>
      <div className="space-y-3">
        {rates.map((rule, index) => (
          <div
            key={`${rule.state}-${rule.year}-${index}`}
            className="flex justify-between items-center text-sm border-b border-gray-50 dark:border-gray-800 pb-2 last:border-0"
          >
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {rule.state}
              </span>
              <span className="ml-2 text-gray-500">{rule.year}</span>
            </div>
            <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">
              {(rule.rate * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400 italic">
        * Data fetched directly from server-side registry.
      </p>
    </section>
  );
}
