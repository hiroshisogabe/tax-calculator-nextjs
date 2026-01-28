'use client';

import { useActionState } from 'react';
import { calculateTaxAction } from '@/actions/tax-actions';

// TODO: the product categories should be fetched from the server and validate the formData on server side as well
export const PRODUCT_CATEGORIES = ['General', 'Food'];

export default function TaxForm() {
  const [state, formAction, isPending] = useActionState(
    calculateTaxAction,
    null,
  );

  // TODO: split into smaller components, e.g. InputField, ErrorMessage, SuccessView, etc.
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Tax Calculator
      </h2>

      <form action={formAction} className="space-y-5">
        {state?.success === false && state.error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
            {state.error}
          </div>
        )}

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Amount ($)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          {state?.success === false && state.fieldErrors?.amount && (
            <p className="text-red-500 text-xs mt-1 italic">
              {state.fieldErrors.amount[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              State Code
            </label>
            <input
              name="state"
              id="state"
              placeholder="e.g. CA"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 uppercase outline-none"
            />
            {state?.success === false && state.fieldErrors?.state && (
              <p className="text-red-500 text-xs mt-1 italic">
                {state.fieldErrors.state[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              placeholder="2024"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {state?.success === false && state.fieldErrors?.year && (
              <p className="text-red-500 text-xs mt-1 italic">
                {state.fieldErrors.year[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="productCategory"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
          >
            Product Category
          </label>
          <select
            name="productCategory"
            id="productCategory"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a category...
            </option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
                className="dark:bg-gray-800"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
        >
          {isPending ? 'Calculating...' : 'Calculate Tax'}
        </button>
      </form>

      {state?.success && state.data && (
        <div className="mt-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-blue-900 dark:text-blue-100">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
              Calculation Result
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Tax Rate:</span>{' '}
                <span className="font-medium">
                  {(state.data.taxRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax Amount:</span>{' '}
                <span className="font-medium">
                  ${state.data.taxAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold border-t border-blue-200 pt-2 mt-2">
                <span>Total Due:</span>{' '}
                <span>${state.data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
