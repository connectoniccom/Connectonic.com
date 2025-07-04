import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { CalendarClock, MapPin } from "lucide-react";

const events = [
  {
    artist: "The Midnight Bloom",
    venue: "The Velvet Lounge",
    city: "New York, NY",
    date: "2024-08-15",
    time: "8:00 PM",
    image: "https://placehold.co/600x400.png",
    imageHint: "concert indie",
  },
  {
    artist: "Echoes in Stereo",
    venue: "Satellite Stage",
    city: "Los Angeles, CA",
    date: "2024-08-22",
    time: "9:00 PM",
    image: "https://placehold.co/600x400.png",
    imageHint: "live music",
  },
  {
    artist: "Lunar Phases",
    venue: "The Starfall Theater",
    city: "Chicago, IL",
    date: "2024-09-05",
    time: "7:30 PM",
    image: "https://placehold.co/600x400.png",
    imageHint: "music performance",
  },
  {
    artist: "Static Waves",
    venue: "The Bassment Club",
    city: "Austin, TX",
    date: "2024-09-12",
    time: "10:00 PM",
    image: "https://placehold.co/600x400.png",
    imageHint: "dj set",
  },
];

export function ArtistEvents() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Upcoming Events</h1>
                <p className="text-muted-foreground mt-2">
                    Catch your favorite emerging artists live.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                        <CardHeader className="p-0">
                            <img src={event.image} alt={event.artist} width={600} height={400} className="object-cover aspect-[16/9]" data-ai-hint={event.imageHint} />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="font-headline text-xl mb-2">{event.artist}</CardTitle>
                            <CardDescription className="font-semibold">{event.venue}</CardDescription>
                            <div className="text-muted-foreground text-sm flex items-center gap-2 mt-2">
                                <MapPin className="size-4" />
                                <span>{event.city}</span>
                            </div>
                            <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                                <CalendarClock className="size-4" />
                                <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} - {event.time}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full">Get Tickets</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
