import { Heart, Mic2, MonitorSpeaker, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

export function Player() {
  return (
    <div className="grid grid-cols-3 items-center px-4 py-3">
      {/* Song Info */}
      <div className="flex items-center gap-3">
        <Avatar className="size-14 rounded-md">
          <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="album cover" />
          <AvatarFallback>DA</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Starlight Echo</p>
          <p className="text-sm text-muted-foreground">Dream-Archives</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-2">
            <Heart className="size-5" />
        </Button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Shuffle className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipBack className="size-5" />
          </Button>
          <Button variant="default" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90">
            <Play className="size-6 fill-primary-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipForward className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Repeat className="size-5" />
          </Button>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 text-xs text-muted-foreground">
            <span>1:23</span>
            <Progress value={45} className="h-1.5" />
            <span>3:45</span>
        </div>
      </div>

      {/* Volume and other controls */}
      <div className="flex items-center justify-end gap-2 text-muted-foreground">
        <Button variant="ghost" size="icon" className="hover:text-foreground">
          <Mic2 className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-foreground">
          <MonitorSpeaker className="size-5" />
        </Button>
        <div className="flex w-32 items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:text-foreground">
            <Volume2 className="size-5" />
          </Button>
          <Slider defaultValue={[80]} max={100} step={1} className="w-full"/>
        </div>
      </div>
    </div>
  );
}
