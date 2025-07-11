'use client';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormState, handleGenerateMusicIdea } from '@/app/actions';
import { MusicForm } from '@/components/connectonic/music-form';
import { IdeaDisplay, type MusicIdea } from '@/components/connectonic/idea-display';

const initialState: FormState = {
  data: null,
  error: null,
  fieldErrors: {},
};

export default function Home() {
  const [state, formAction] = useFormState(handleGenerateMusicIdea, initialState);
  const [musicIdea, setMusicIdea] = useState<MusicIdea | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.data) {
      setMusicIdea(state.data);
    }
    if (state.error && !state.fieldErrors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
          Connectonic.com
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80">
          Your AI-powered partner for musical inspiration. Generate unique melodies and chord progressions in seconds.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-12">
        <MusicForm formAction={formAction} state={state} />
      </div>
      
      {musicIdea && (
        <div className="mt-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
           <IdeaDisplay musicIdea={musicIdea} />
        </div>
      )}
    </main>
  );
}
