'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { recommendSongs, type RecommendSongsOutput } from "@/ai/flows/recommend-songs";
import { Separator } from "@/components/ui/separator";
import { Music, LoaderCircle } from 'lucide-react';

const formSchema = z.object({
  instrument: z.string().min(2, {
    message: "Instrument must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
});

export default function Home() {
  const [recommendations, setRecommendations] = useState<RecommendSongsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instrument: "",
      genre: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendSongs(values);
      setRecommendations(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>AI Music Recommender</CardTitle>
          <CardDescription>
            Tell us what you like, and we'll suggest some songs for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="instrument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Instrument</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Electric Guitar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Psychedelic Rock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendations && (
        <Card className="w-full max-w-lg mt-8">
          <CardHeader>
            <CardTitle>Your Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recommendations.songs.map((song, index) => (
                <li key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
                      <Music className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {song.artist} - {song.album} ({song.year})
                      </p>
                      <p className="text-sm text-muted-foreground">Genre: {song.genre}</p>
                    </div>
                  </div>
                  {index < recommendations.songs.length - 1 && <Separator className="mt-4" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
