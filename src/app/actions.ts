'use server';

import { generateMusicIdea, GenerateMusicIdeaOutput } from '@/ai/flows/generate-music-idea';
import { z } from 'zod';

const ActionInputSchema = z.object({
  genre: z.string({ required_error: 'Please select a genre.' }).min(1, 'Please select a genre.'),
  tempo: z.number().min(40).max(220),
});

export type FormState = {
  data: (GenerateMusicIdeaOutput & { genre: string; tempo: number }) | null;
  error: string | null;
  fieldErrors?: {
    genre?: string[];
    tempo?: string[];
  };
};

export async function handleGenerateMusicIdea(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    genre: formData.get('genre'),
    tempo: Number(formData.get('tempo')),
  };

  const validatedFields = ActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      data: null,
      error: 'Invalid input. Please correct the errors below.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await generateMusicIdea(validatedFields.data);
    return { 
      data: { ...result, genre: validatedFields.data.genre, tempo: validatedFields.data.tempo }, 
      error: null 
    };
  } catch (error) {
    console.error('Error generating music idea:', error);
    return { 
      data: null, 
      error: 'An unexpected error occurred. Please try again later.' 
    };
  }
}
