import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to Your AI Music Recommender!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a Next.js application ready for you to build upon.</p>
          <p className="mt-4">It looks like things are set up correctly now. You can start by editing this page in <code>src/app/page.tsx</code>.</p>
        </CardContent>
      </Card>
    </main>
  );
}
