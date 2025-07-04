import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Plus, ListMusic, Play } from "lucide-react";

const playlists = [
  {
    name: "Chill Vibes",
    songCount: 42,
    images: ["https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png"],
    imageHint: "abstract gradient"
  },
  {
    name: "Late Night Drive",
    songCount: 28,
    images: ["https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png"],
    imageHint: "night city"
  },
  {
    name: "Focus Zone",
    songCount: 89,
    images: ["https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png"],
    imageHint: "minimalist pattern"
  },
  {
    name: "Workout Fuel",
    songCount: 33,
    images: ["https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png", "https://placehold.co/100x100.png"],
    imageHint: "energy abstract"
  },
];

export function PlaylistManager() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">Your Playlists</h1>
                    <p className="text-muted-foreground mt-2">
                        Your personal collections of favorite tracks.
                    </p>
                </div>
                <Button>
                    <Plus className="-ml-1 mr-2 size-4" />
                    New Playlist
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {playlists.map((playlist, index) => (
                    <Card key={index} className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                        <CardHeader className="relative p-0">
                            <div className="grid grid-cols-2 grid-rows-2 aspect-square">
                                {playlist.images.map((src, i) => (
                                    <Image key={i} src={src} alt={`${playlist.name} cover ${i+1}`} width={100} height={100} className="object-cover w-full h-full" data-ai-hint={playlist.imageHint} />
                                ))}
                            </div>
                            <Button size="icon" className="absolute bottom-4 right-4 h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <Play className="size-6 fill-primary-foreground"/>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="font-headline text-xl truncate">{playlist.name}</CardTitle>
                            <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                                <ListMusic className="size-4" />
                                <span>{playlist.songCount} songs</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
