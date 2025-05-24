import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ClaimCurrencyModal } from "./ClaimCurrencyModal";
import { useAuth } from "@convex-dev/react";

export function BalanceDisplay() {
  const { isAuthenticated, isLoading } = useAuth();
  const balance = useQuery(api.currency.getUserCurrency, {}) ?? 0;

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center">Log in to view balance.</div>;
  }

  return (
    <div className="text-center mt-4">
      <p className="text-xl font-bold">Balance: {balance}</p>
      <ClaimCurrencyModal />
    </div>
  );
}
