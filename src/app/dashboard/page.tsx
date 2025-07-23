
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, DocumentData, orderBy } from 'firebase/firestore';
import { LogOut, PlusCircle } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  createdAt: any;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
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

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'notes'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userNotes: Note[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        userNotes.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(userNotes);
    }, (error) => {
      console.error("Error fetching notes: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/landing');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() === '' || !user) return;
    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        text: note,
        createdAt: serverTimestamp(),
      });
      setNote('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // Should be redirected, but as a fallback
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 grid gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Welcome back, {user.displayName || user.email}!</CardTitle>
            <CardDescription>Here are your latest notes. You can add more below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="flex gap-2 mb-6">
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="bg-background"
              />
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((n) => (
                <Card key={n.id} className="bg-secondary">
                  <CardContent className="p-4">
                    <p className="text-foreground">{n.text}</p>
                  </CardContent>
                  <CardFooter className="p-2 pt-0 text-xs text-muted-foreground">
                    <p>
                      {n.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {notes.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>You haven't added any notes yet.</p>
                    <p>Use the form above to get started.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
