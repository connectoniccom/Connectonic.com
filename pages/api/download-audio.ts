
import type { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg from 'fluent-ffmpeg';
import fetch from 'node-fetch';
import { Writable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { videoUrl } = req.body;

  if (!videoUrl || typeof videoUrl !== 'string') {
    return res.status(400).json({ error: 'Video URL is required.' });
  }

  try {
    const videoResponse = await fetch(videoUrl);
    if (!videoResponse.ok) {
      throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
    }

    if (!videoResponse.body) {
      throw new Error('Video response body is null');
    }

    const videoStream = videoResponse.body;

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');

    const outputStream = new Writable({
      write(chunk, encoding, callback) {
        res.write(chunk, encoding);
        callback();
      },
      final(callback) {
        res.end();
        callback();
      }
    });

    ffmpeg(videoStream as any)
      .toFormat('mp3')
      .on('error', (err) => {
        console.error('Error during ffmpeg processing:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to process video.' });
        }
      })
      .pipe(outputStream, { end: true });

  } catch (error) {
    console.error('Error downloading or processing video:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download or process video.' });
    }
  }
}
