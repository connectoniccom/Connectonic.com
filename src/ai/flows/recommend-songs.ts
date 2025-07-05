'use server';

import { z } from 'zod';
import { defineFlow, definePrompt } from 'genkit/flow';
import { geminiPro } from '@genkit-ai/googleai';
import { generate } from 'genkit/ai';

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

const recommendSongsPrompt = definePrompt({
  name: 'recommendSongsPrompt',
  inputSchema: z.object({
    instrument: z.string(),
    genre: z.string(),
  }),
  output: {
    format: 'json',
    schema: RecommendSongsOutputSchema,
  },
  prompt: `Recommend 5 songs for a user who likes {{instrument}} and {{genre}} music.`,
});

export const recommendSongsFlow = defineFlow(
  {
    name: 'recommendSongsFlow',
    inputSchema: z.object({
      instrument: z.string(),
      genre: z.string(),
    }),
    outputSchema: RecommendSongsOutputSchema,
  },
  async (input) => {
    const llmResponse = await generate({
      prompt: recommendSongsPrompt,
      input: input,
      model: geminiPro,
    });

    const output = llmResponse.output();
    if (!output) {
      throw new Error('No output from LLM');
    }
    return output;
  }
);

export async function recommendSongs(input: { instrument: string, genre: string }): Promise<RecommendSongsOutput> {
  return await recommendSongsFlow.run(input);
}
