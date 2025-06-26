import { MediaPlayer } from '@/components/media-player';
import { tracks } from '@/data/media';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary">
              Connectonic
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <MediaPlayer tracks={tracks} />
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
              Built with Next.js and Firebase.
            </p>
        </div>
      </footer>
    </div>
  );
}
