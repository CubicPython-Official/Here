import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const INITIAL_BALANCE = 1000;

// Query to get the current user's profile
export const getMyUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const userProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId as Id<"users">))
      .unique();
    return userProfile;
  },
});

// Mutation to create a user profile if it doesn't exist
export const createMyUserProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId as Id<"users">))
      .unique();

    if (existingProfile) {
      return existingProfile; // Or throw new Error("Profile already exists");
    }

    const profileId = await ctx.db.insert("userProfiles", {
      userId: userId as Id<"users">,
      balance: INITIAL_BALANCE,
    });
    return await ctx.db.get(profileId);
  },
});

// Mutation to claim currency and add to balance
export const claimCurrency = mutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (args.amount <= 0) {
      throw new Error("Claim amount must be positive.");
    }

    const userProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId as Id<"users">))
      .unique();

    if (!userProfile) {
      // This case should ideally be handled by ensuring profile creation on login/load
      // For robustness, we can create it here or throw a more specific error.
      // Let's assume profile should exist.
      throw new Error("User profile not found. Please ensure profile is created.");
    }

    const newBalance = userProfile.balance + args.amount;
    await ctx.db.patch(userProfile._id, { balance: newBalance });

    return { newBalance };
  },
});
