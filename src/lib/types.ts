import type { RecommendationsOutput as GenAIRecommendationsOutput } from "@/ai/flows/generate-recommendations";

export interface Track {
  id: string;
  title: string;
  artist: string;
  type: "audio" | "video";
  sourceUrl: string; // Placeholder for actual media URL
  coverArt: string;
  artistImage: string;
  artistBio: string;
}

export type RecommendationsOutput = GenAIRecommendationsOutput;
