import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { ClaimCurrencyModal } from './ClaimCurrencyModal';
import { useConvexAuth } from '@convex-dev/auth/react'; // Corrected import

export function BalanceDisplay() {
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth(); // Use useConvexAuth hook
  const userProfile = useQuery(api.users.getMyUserProfile, isAuthenticated ? {} : "skip");
  const createProfile = useMutation(api.users.createMyUserProfile);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated && userProfile === null) {
      createProfile().catch(console.error);
    }
  }, [authLoading, isAuthenticated, userProfile, createProfile]);

  if (authLoading) {
    return <div className="px-4 py-2 text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Don't show balance if not logged in
  }
  
  const balance = userProfile === undefined ? "Loading..." : userProfile === null ? "Creating..." : userProfile.balance;

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        Balance: {typeof balance === 'number' ? balance.toLocaleString() : balance}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
          <div className="px-4 py-2 text-sm text-gray-700">
            Balance: {typeof balance === 'number' ? balance.toLocaleString() : balance}
          </div>
          <button
            onClick={() => {
              setIsCurrencyModalOpen(true);
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Currency
          </button>
        </div>
      )}
      <ClaimCurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />
    </div>
  );
}
