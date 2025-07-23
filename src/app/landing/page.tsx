
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Welcome to Connectonic
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              The seamless way to connect your ideas, notes, and life's work in one place.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="App Screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              data-ai-hint="abstract network"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
