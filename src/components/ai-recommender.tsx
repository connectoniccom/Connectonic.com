"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { recommendSongs, type RecommendSongsOutput } from "@/ai/flows/recommend-songs";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  listeningHistory: z.string().min(20, {
    message: "Please tell us a bit more about your taste in music.",
  }).max(5000),
});

export function AiRecommender() {
  const [recommendation, setRecommendation] = useState<RecommendSongsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listeningHistory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendSongs(values);
      setRecommendation(result);
    } catch (error) {
      console.error("AI recommendation error:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with our AI recommender. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI Recommendations</h1>
        <p className="text-muted-foreground mt-2">
          Let our AI find your next favorite song. Describe your listening habits below.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="listeningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Music Taste</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I love listening to indie rock from the 2000s, especially bands like The Strokes and Arcade Fire. I also enjoy some modern electronic music like ODESZA. Recently, I've been getting into lo-fi hip hop for studying."
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your favorite genres, artists, songs, or moods. The more detail, the better!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="space-y-4 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI is curating your personalized playlist...</p>
          </div>
        </div>
      )}

      {recommendation && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Personal Mixtape</CardTitle>
              <CardDescription>Based on your listening habits, here are some tracks you might enjoy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {recommendation.recommendations.map((song, index) => (
                  <li key={index} className="rounded-md border p-3 text-lg">
                    {song}
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div>
                <h3 className="font-bold text-lg mb-2">Why you'll like these:</h3>
                <p className="text-muted-foreground">{recommendation.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
