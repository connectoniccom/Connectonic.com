import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Play, Heart, Plus } from "lucide-react";
import Image from "next/image";

const songs = [
  {
    title: "Neon City Dream",
    artist: "Synthwave Odyssey",
    album: "Digital Sunsets",
    duration: "3:45",
    image: "https://placehold.co/400x400.png",
    imageHint: "synthwave sunset",
  },
  {
    title: "Forest Lullaby",
    artist: "Willow Creek",
    album: "Whispering Leaves",
    duration: "4:12",
    image: "https://placehold.co/400x400.png",
    imageHint: "misty forest",
  },
  {
    title: "Quantum Leap",
    artist: "DJ Vector",
    album: "Future Shock",
    duration: "5:20",
    image: "https://placehold.co/400x400.png",
    imageHint: "abstract geometric",
  },
  {
    title: "Cobblestone Heart",
    artist: "The Wandering Bards",
    album: "Tavern Tales",
    duration: "2:58",
    image: "https://placehold.co/400x400.png",
    imageHint: "fantasy tavern",
  },
  {
    title: "Ocean's Breath",
    artist: "Coralia",
    album: "Tidal Rhythms",
    duration: "4:30",
    image: "https://placehold.co/400x400.png",
    imageHint: "underwater scene",
  },
  {
    title: "Lost in Static",
    artist: "Ghost in the Machine",
    album: "System Error",
    duration: "3:15",
    image: "https://placehold.co/400x400.png",
    imageHint: "glitch art",
  }
];

export function SongBrowsing() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Discover New Music</h1>
        <p className="text-muted-foreground mt-2">
          A curated selection of songs from emerging artists. Updated weekly.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {songs.map((song, index) => (
          <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="relative p-0">
              <Image
                src={song.image}
                alt={`Album art for ${song.album}`}
                width={400}
                height={400}
                className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={song.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Button
                size="icon"
                className="absolute bottom-4 right-4 h-12 w-12 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
              >
                <Play className="h-6 w-6 fill-primary-foreground" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="font-headline truncate text-lg">{song.title}</CardTitle>
              <CardDescription className="truncate">{song.artist}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Heart className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Plus className="size-5" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
