'use server';
/**
 * @fileOverview A song recommendation AI agent.
 *
 * - recommendSongs - A function that handles song recommendations.
 * - RecommendSongsOutput - The return type for the recommendSongs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSongsInputSchema = z.object({
  listeningHistory: z.string().describe("The user's music listening history and preferences."),
});
type RecommendSongsInput = z.infer<typeof RecommendSongsInputSchema>;

const RecommendSongsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe("A list of 5-7 recommended songs from emerging or lesser-known artists, formatted as 'Artist - Song Title'."),
  reasoning: z.string().describe("A short explanation (2-3 sentences) of why these songs were recommended based on the user's taste."),
});
export type RecommendSongsOutput = z.infer<typeof RecommendSongsOutputSchema>;

export async function recommendSongs(input: RecommendSongsInput): Promise<RecommendSongsOutput> {
  return recommendSongsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSongsPrompt',
  input: {schema: RecommendSongsInputSchema},
  output: {schema: RecommendSongsOutputSchema},
  prompt: `You are a music expert specializing in discovering emerging artists. Your goal is to recommend songs to users based on their listening history.

The user's music taste is: {{{listeningHistory}}}

Please provide a list of 5-7 song recommendations from emerging or independent artists that match the user's taste. For each song, provide the artist and the title.

Also, provide a brief reasoning for your selections, explaining how they connect to the user's stated preferences.
`,
});

const recommendSongsFlow = ai.defineFlow(
  {
    name: 'recommendSongsFlow',
    inputSchema: RecommendSongsInputSchema,
    outputSchema: RecommendSongsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
