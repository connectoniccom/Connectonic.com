
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Music, Video, User, PlayCircle, Download, Loader2 } from 'lucide-react';
import { artists, Artist } from './data';

const ArtistsPage = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentVideo, setCurrentVideo] = useState<{ src: string; title: string } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (selectedArtist) {
      setCurrentVideo({ src: selectedArtist.videoSrc, title: 'Main Video' });
    }
  }, [selectedArtist]);

  const filteredArtists = useMemo(() => {
    if (!searchTerm) return artists;
    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const otherArtists = artists.filter(artist => artist.id !== selectedArtist?.id);

  const handleMediaSelect = (media: { title: string; type: 'Audio' | 'Video'; src: string }) => {
    if (media.type === 'Video') {
      setCurrentVideo({ src: media.src, title: media.title });
    } else {
      console.log("Audio selected:", media.src);
      const audio = new Audio(media.src);
      audio.play();
    }
  };

  const handleDownload = async (url: string, type: 'video' | 'audio') => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/download-${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url }),
      });

      if (!response.ok) {
        throw new Error(`Download failed with status: ${response.status}`);
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `${selectedArtist?.name}_${type}.${type === 'video' ? 'mp4' : 'mp3'}`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      // You could show a toast notification here to inform the user
    } finally {
      setIsDownloading(false);
    }
  };


  if (selectedArtist) {
    return (
      <div className="w-full p-4 animate-fade-in">
        <Button variant="outline" onClick={() => setSelectedArtist(null)} className="mb-8">
          &larr; Back to All Artists
        </Button>
        <h1 className="text-5xl font-extrabold mb-4 text-center">{selectedArtist.name}</h1>
        <p className="text-lg text-muted-foreground text-center mb-8">{selectedArtist.bio}</p>

        {/* Main Media Canvas */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Featured Media</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {/* Video Container */}
            {currentVideo && (
                 <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center"><Video className="mr-2" /> {currentVideo.title}</h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video key={currentVideo.src} controls className="w-full h-full" preload="metadata">
                          <source src={currentVideo.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                    </div>
                     <div className="flex gap-2 pt-2">
                        <Button onClick={() => handleDownload(currentVideo.src, 'video')} disabled={isDownloading}>
                            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                            Download Video
                        </Button>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
        {/* Other Media */}
         {selectedArtist.otherMedia && selectedArtist.otherMedia.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>More from {selectedArtist.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedArtist.otherMedia.map((media, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                    onClick={() => handleMediaSelect(media)}
                  >
                    <div className="flex items-center">
                       {media.type === 'Audio' ? <Music className="h-5 w-5 mr-3" /> : <Video className="h-5 w-5 mr-3" />}
                       <div>
                        <p className="font-semibold">{media.title}</p>
                        <p className="text-sm text-muted-foreground">{media.type}</p>
                      </div>
                    </div>
                    <PlayCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Artists Gallery */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Discover Other Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {otherArtists.map((artist) => (
            <div key={artist.id} className="cursor-pointer group" onClick={() => setSelectedArtist(artist)}>
              <Image
                src={artist.image}
                alt={artist.name}
                width={200}
                height={200}
                className="rounded-full object-cover w-full aspect-square transition-transform duration-300"
                data-ai-hint={artist.dataAiHint}
              />
              <p className="mt-2 text-center font-semibold">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Featured Artists</h1>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for an artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredArtists.map((artist) => (
          <Card
            key={artist.id}
            className="text-center cursor-pointer group p-4 hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedArtist(artist)}
          >
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative overflow-hidden rounded-full shadow-lg h-32 w-32 mb-4">
                 <Image
                  src={artist.image}
                  alt={`Profile photo of ${artist.name}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300"
                  data-ai-hint={artist.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">{artist.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
       {filteredArtists.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">No artists found matching your search.</p>
      )}
    </div>
  );
};

export default ArtistsPage;
