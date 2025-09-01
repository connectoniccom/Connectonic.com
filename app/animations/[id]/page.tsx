
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { animations } from '../data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AnimationPageProps {
  params: {
    id: string;
  };
}

export default function AnimationPage({ params }: AnimationPageProps) {
  const { id } = params;
  const asset = animations.find((a) => a.id === id);

  if (!asset) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-full">
        <div className="w-full max-w-md">
            <Button asChild variant="outline" className="mb-4">
                <Link href="/animations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Animations
                </Link>
            </Button>
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl text-center">{asset.title}</CardTitle>
                <CardDescription className="text-center">{asset.type}</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="aspect-square relative">
                    <Image
                    src={asset.src}
                    alt={asset.title}
                    fill
                    className="object-contain"
                    unoptimized={asset.type === 'GIF'}
                    />
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

// Generate static paths for each animation
export async function generateStaticParams() {
  return animations.map((asset) => ({
    id: asset.id,
  }));
}
