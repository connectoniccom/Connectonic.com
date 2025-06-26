"use server";

import {
  recommendSimilarTracks,
  type RecommendationsOutput,
} from "@/ai/flows/generate-recommendations";

export async function getRecommendations(
  trackName: string,
  artist: string
): Promise<RecommendationsOutput> {
  // In a real app, you might want to include listeningHistory
  const input = {
    trackName,
    artist,
    listeningHistory: undefined,
  };

  try {
    const recommendations = await recommendSimilarTracks(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    // Re-throw the error to be caught by the client
    throw new Error("Failed to generate AI recommendations. Please try again later.");
  }
}
