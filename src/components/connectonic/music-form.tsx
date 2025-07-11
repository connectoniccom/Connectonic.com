'use client';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { MUSIC_GENRES } from '@/lib/constants';
import type { FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Gauge, Wand2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Music
        </>
      )}
    </Button>
  );
}

interface MusicFormProps {
    formAction: (payload: FormData) => void;
    state: FormState;
}

export function MusicForm({ formAction, state }: MusicFormProps) {
    const [tempo, setTempo] = useState(120);

    return (
        <Card className="shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle>Create a New Idea</CardTitle>
            <CardDescription>Tell the AI what you're looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                 <Select name="genre" required>
                    <SelectTrigger id="genre" className="w-full">
                      <SelectValue placeholder="Select a genre..." />
                    </SelectTrigger>
                    <SelectContent>
                      {MUSIC_GENRES.map((genre) => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                 {state.fieldErrors?.genre && <p className="text-sm font-medium text-destructive mt-2">{state.fieldErrors.genre.join(', ')}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="tempo" className="flex items-center gap-2">
                        <Gauge className="w-4 h-4"/> Tempo
                    </Label>
                    <span className="text-sm font-medium w-20 text-center bg-background border rounded-full px-2 py-1">{tempo} BPM</span>
                </div>
                <Slider
                  id="tempo"
                  name="tempo"
                  min={40}
                  max={220}
                  step={1}
                  defaultValue={[tempo]}
                  onValueChange={(value) => setTempo(value[0])}
                />
              </div>
              <SubmitButton />
              {state.error && !state.fieldErrors && <p className="text-sm font-medium text-destructive mt-2">{state.error}</p>}
            </form>
          </CardContent>
        </Card>
    )
}
