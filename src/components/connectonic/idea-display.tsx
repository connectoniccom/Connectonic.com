'use client';

import { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Play, Pause, Square, Music } from 'lucide-react';

export type MusicIdea = {
  melody: string;
  chords: string;
  genre: string;
  tempo: number;
};

interface IdeaDisplayProps {
    musicIdea: MusicIdea;
}

export function IdeaDisplay({ musicIdea }: IdeaDisplayProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const synth = useRef<Tone.Synth | null>(null);
    const sequence = useRef<Tone.Sequence | null>(null);
    const isTransportStopped = useIsTransportStopped();


    useEffect(() => {
        if (!synth.current) {
            synth.current = new Tone.Synth().toDestination();
        }

        return () => {
            if (synth.current) {
                synth.current.dispose();
                synth.current = null;
            }
            if (sequence.current) {
                sequence.current.dispose();
                sequence.current = null;
            }
            Tone.Transport.stop();
            Tone.Transport.cancel();
        };
    }, []);

    const handlePlayPause = () => {
        if (!synth.current) return;
        
        if (isPlaying) {
            Tone.Transport.pause();
            setIsPlaying(false);
        } else {
            if (Tone.Transport.state === 'paused') {
                Tone.Transport.start();
            } else {
                if (sequence.current) {
                    sequence.current.dispose();
                }
                
                sequence.current = new Tone.Sequence((time, note) => {
                    synth.current?.triggerAttackRelease(note, '8n', time);
                }, ['C4', 'E4', 'G4', 'B4'], '4n').start(0);
                sequence.current.loop = true;
                Tone.Transport.bpm.value = musicIdea.tempo;
                Tone.Transport.start();
            }
            setIsPlaying(true);
        }
    };
    
    const handleStop = () => {
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        setIsPlaying(false);
    };

    const handleExport = () => {
        const content = `Connectonic.com - AI Music Idea\n\nGenre: ${musicIdea.genre}\nTempo: ${musicIdea.tempo} BPM\n\n--- Melody Idea ---\n${musicIdea.melody}\n\n--- Chord Progression ---\n${musicIdea.chords}\n\nNote: This is a text export. Full MIDI export requires structured musical data.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'connectonic-idea.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="overflow-hidden shadow-2xl shadow-accent/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Your AI-Generated Idea</CardTitle>
                <div className="flex items-center gap-4 pt-4">
                    <Button onClick={handlePlayPause} variant="outline" size="icon">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                    </Button>
                    <Button onClick={handleStop} variant="outline" size="icon" disabled={isTransportStopped}>
                        <Square className="h-5 w-5" />
                        <span className="sr-only">Stop</span>
                    </Button>
                    <Button onClick={handleExport} variant="outline" className="ml-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6 grid gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-full">
                      <Music className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Melody Idea</h3>
                        <p className="text-foreground/80 mt-1">{musicIdea.melody}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-full">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-accent"><path d="M9 18V5l12-2v13"/><path d="M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Chord Progression</h3>
                        <p className="text-foreground/80 mt-1">{musicIdea.chords}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


function useIsTransportStopped() {
    const [isStopped, setIsStopped] = useState(Tone.Transport.state === 'stopped');

    useEffect(() => {
        const onStart = () => setIsStopped(false);
        const onStop = () => setIsStopped(true);
        const onPause = () => setIsStopped(false);

        Tone.Transport.on('start', onStart);
        Tone.Transport.on('stop', onStop);
        Tone.Transport.on('pause', onPause);

        return () => {
            Tone.Transport.off('start', onStart);
            Tone.Transport.off('stop', onStop);
            Tone.Transport.off('pause', onPause);
        }
    }, []);

    return isStopped;
}
