import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { BalanceDisplay } from "./BalanceDisplay";
import { GameList } from "./GameList";
import { useConvexAuth } from "@convex-dev/auth/react"; // Corrected import

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md h-16 flex justify-between items-center border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-primary">Fantasy Casino</h2>
        <div className="flex items-center gap-4">
          <Authenticated>
            <BalanceDisplay />
          </Authenticated>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}

function Content() {
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth(); // Use useConvexAuth hook
  // Skip querying loggedInUser if auth is loading or user is not authenticated.
  // If authenticated, query for the user.
  const loggedInUser = useQuery(
    api.auth.loggedInUser,
    authLoading || !isAuthenticated ? "skip" : {}
  );


  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If authenticated but loggedInUser is still undefined, it means it's loading from Convex.
  if (isAuthenticated && loggedInUser === undefined) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-8 items-center">
      <Authenticated>
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {loggedInUser?.name ?? loggedInUser?.email ?? "Player"}!
          </h1>
          <p className="text-lg text-gray-600">Ready to try your luck?</p>
        </div>
        <GameList />
      </Authenticated>

      <Unauthenticated>
        <div className="text-center bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Fantasy Casino</h1>
          <p className="text-xl text-gray-600 mb-8">Sign in to start playing our selection of fictional games!</p>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
