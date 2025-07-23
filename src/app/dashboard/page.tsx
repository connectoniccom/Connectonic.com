'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // or a redirect component
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-4xl">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
                <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </header>
            <main>
                <div className="p-6 bg-card text-card-foreground rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
                    <p>You are logged in as {user.email}.</p>
                </div>
            </main>
        </div>
    </div>
  );
}
