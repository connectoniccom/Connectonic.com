
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, DocumentData } from 'firebase/firestore';

interface Note {
  id: string;
  text: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        
        // Subscribe to user's notes
        const q = query(collection(db, "notes"), where("userId", "==", user.uid));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const userNotes: Note[] = [];
          querySnapshot.forEach((doc: DocumentData) => {
            userNotes.push({ id: doc.id, ...doc.data() } as Note);
          });
          setNotes(userNotes);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
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
    return null; // or a redirect component
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4">
        <div className="w-full max-w-4xl">
            <header className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
                <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            </header>
            <main className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You are logged in as {user.email}.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
                        <Input 
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="Add a new note..."
                        />
                        <Button type="submit">Add Note</Button>
                      </form>
                      <ul className="space-y-2">
                        {notes.map((n) => (
                          <li key={n.id} className="p-2 bg-secondary rounded-md">{n.text}</li>
                        ))}
                      </ul>
                    </CardContent>
                </Card>
            </main>
        </div>
    </div>
  );
}
