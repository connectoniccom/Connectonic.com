"use client";

import Image from "next/image";
import { useState } from "react";
import type { Track, RecommendationsOutput } from "@/lib/types";
import { getRecommendations } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Play,
  ShoppingCart,
  Wand2,
  Music,
  Video,
  LoaderCircle,
  Headphones,
  User,
} from "lucide-react";

interface MediaPlayerProps {
  tracks: Track[];
}

export function MediaPlayer({ tracks }: MediaPlayerProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(tracks[0] ?? null);
  const [recommendations, setRecommendations] = useState<RecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectTrack = (track: Track) => {
    setSelectedTrack(track);
    setRecommendations(null);
    setError(null);
  };

  const handleGetRecommendations = async () => {
    if (!selectedTrack) return;
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getRecommendations(selectedTrack.title, selectedTrack.artist);
      if (result) {
        setRecommendations(result);
      } else {
        throw new Error("AI could not generate recommendations for this track.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Recommendation Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <Card className="shadow-lg">
          {selectedTrack ? (
            <>
              <CardHeader>
                <div className="relative aspect-video w-full mb-4">
                  <Image
                    src={selectedTrack.coverArt}
                    alt={`${selectedTrack.title} cover art`}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint="album cover music"
                  />
                </div>
                <CardTitle className="font-headline text-3xl">{selectedTrack.title}</CardTitle>
                <p className="text-muted-foreground text-xl">{selectedTrack.artist}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">
                    <Play className="mr-2" /> Play Track
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-2" /> Buy Track
                    </a>
                  </Button>
                  <Button size="lg" variant="secondary" onClick={handleGetRecommendations} disabled={isLoading}>
                    {isLoading ? (
                      <LoaderCircle className="mr-2 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2" />
                    )}
                    Get Recommendations
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold font-headline mb-2 flex items-center gap-2"><User /> Artist Bio</h3>
                  <p className="text-muted-foreground">{selectedTrack.artistBio}</p>
                </div>

                <div className="min-h-[12rem]">
                  {isLoading && <RecommendationsSkeleton />}
                  {error && <p className="text-destructive">Error: {error}</p>}
                  {recommendations && (
                    <div>
                      <h3 className="text-lg font-semibold font-headline mb-4 flex items-center gap-2"><Headphones /> Recommendations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Similar Artists</h4>
                          <div className="flex flex-wrap gap-2">
                            {recommendations.similarArtists.map((artist) => (
                              <Badge key={artist} variant="secondary">{artist}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Similar Tracks</h4>
                           <div className="flex flex-wrap gap-2">
                            {recommendations.similarTracks.map((track) => (
                              <Badge key={track} variant="secondary">{track}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-[60vh]">
              <p className="text-muted-foreground">Select a track to begin</p>
            </div>
          )}
        </Card>
      </div>

      <aside className="lg:col-span-4">
        <h2 className="text-2xl font-headline font-semibold mb-4">Media Library</h2>
        <ScrollArea className="w-full lg:h-[80vh]">
           <div className="flex lg:flex-col gap-4 pr-4">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(track)}
                className={cn(
                  "flex-shrink-0 w-[200px] lg:w-full text-left rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selectedTrack?.id === track.id && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <Card className="hover:bg-muted/50 transition-colors duration-200 shadow-md overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-stretch">
                     <div className="relative w-full lg:w-24 h-24 lg:h-auto flex-shrink-0">
                      <Image
                        src={track.coverArt}
                        alt={`Cover for ${track.title}`}
                        fill
                        className="object-cover"
                        data-ai-hint="song artwork"
                      />
                    </div>
                    <div className="p-3 flex flex-col justify-center">
                      <h4 className="font-semibold truncate">{track.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                       <Badge variant="outline" className="mt-2 w-fit">
                        {track.type === "audio" ? <Music className="mr-1 h-3 w-3" /> : <Video className="mr-1 h-3 w-3" />}
                        {track.type}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </aside>
    </div>
  );
}


function RecommendationsSkeleton() {
  return (
    <div>
      <h3 className="text-lg font-semibold font-headline mb-4 flex items-center gap-2"><Skeleton className="h-6 w-6 rounded-full" /><Skeleton className="h-6 w-40" /></h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}
