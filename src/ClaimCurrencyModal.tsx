import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { toast } from "sonner";

interface ClaimCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClaimCurrencyModal({ isOpen, onClose }: ClaimCurrencyModalProps) {
  const [amount, setAmount] = useState('');
  const claimCurrencyMutation = useMutation(api.users.claimCurrency);
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseInt(amount, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid positive amount.");
      return;
    }
    setIsLoading(true);
    try {
      await claimCurrencyMutation({ amount: numericAmount });
      toast.success(`Successfully claimed ${numericAmount}!`);
      setAmount('');
      onClose();
    } catch (error) {
      console.error("Failed to claim currency:", error);
      toast.error((error as Error).message || "Failed to claim currency.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Claim Currency</h2>
        <form onSubmit={handleClaim}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter amount"
              min="1"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? "Claiming..." : "Claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
