'use server';
/**
 * @fileOverview A music recommendation AI agent.
 *
 * - recommendSongs - A function that handles the song recommendation process.
 * - RecommendSongsInput - The input type for the recommendSongs function.
 * - RecommendSongsOutput - The return type for the recommendSongs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RecommendSongsInputSchema = z.object({
  instrument: z.string().describe("The user's favorite instrument"),
  genre: z.string().describe("The user's favorite music genre"),
});
export type RecommendSongsInput = z.infer<typeof RecommendSongsInputSchema>;

export const RecommendSongsOutputSchema = z.object({
  songs: z.array(z.object({
    title: z.string().describe('The title of the song.'),
    artist: z.string().describe('The artist of the song.'),
    album: z.string().describe('The album the song is on.'),
    year: z.number().describe('The year the song was released.'),
    genre: z.string().describe('The genre of the song.'),
  })),
});
export type RecommendSongsOutput = z.infer<typeof RecommendSongsOutputSchema>;

const recommendSongsPrompt = ai.definePrompt({
  name: 'recommendSongsPrompt',
  input: { schema: RecommendSongsInputSchema },
  output: { schema: RecommendSongsOutputSchema },
  prompt: `Recommend 5 songs for a user who likes {{instrument}} and {{genre}} music.`,
});

const recommendSongsFlow = ai.defineFlow(
  {
    name: 'recommendSongsFlow',
    inputSchema: RecommendSongsInputSchema,
    outputSchema: RecommendSongsOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: recommendSongsPrompt,
      input: input,
      model: 'googleai/gemini-pro',
    });

    const output = llmResponse.output;
    if (!output) {
      throw new Error('No output from LLM');
    }
    return output;
  }
);

export async function recommendSongs(input: RecommendSongsInput): Promise<RecommendSongsOutput> {
  return recommendSongsFlow(input);
}
