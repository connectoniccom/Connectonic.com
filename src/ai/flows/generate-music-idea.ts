'use server';

/**
 * @fileOverview A music idea generation AI agent.
 *
 * - generateMusicIdea - A function that handles the music idea generation process.
 * - GenerateMusicIdeaInput - The input type for the generateMusicIdea function.
 * - GenerateMusicIdeaOutput - The return type for the generateMusicIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMusicIdeaInputSchema = z.object({
  genre: z.string().describe('The desired music genre.'),
  tempo: z.number().describe('The desired tempo in BPM.'),
});
export type GenerateMusicIdeaInput = z.infer<typeof GenerateMusicIdeaInputSchema>;

const GenerateMusicIdeaOutputSchema = z.object({
  melody: z.string().describe('A melody idea.'),
  chords: z.string().describe('A chord progression.'),
});
export type GenerateMusicIdeaOutput = z.infer<typeof GenerateMusicIdeaOutputSchema>;

export async function generateMusicIdea(input: GenerateMusicIdeaInput): Promise<GenerateMusicIdeaOutput> {
  return generateMusicIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMusicIdeaPrompt',
  input: {schema: GenerateMusicIdeaInputSchema},
  output: {schema: GenerateMusicIdeaOutputSchema},
  prompt: `You are a creative AI music composer. Please provide a melody idea and chord progression based on the following user input:

Genre: {{{genre}}}
Tempo: {{{tempo}}} BPM

Melody Idea:
Chords: `,
});

const generateMusicIdeaFlow = ai.defineFlow(
  {
    name: 'generateMusicIdeaFlow',
    inputSchema: GenerateMusicIdeaInputSchema,
    outputSchema: GenerateMusicIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
