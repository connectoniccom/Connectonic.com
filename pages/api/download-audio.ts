
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { URL } from 'url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Note: The frontend sends 'videoUrl' for both audio and video.
  const { videoUrl: audioUrl } = req.body;

  if (!audioUrl || typeof audioUrl !== 'string') {
    return res.status(400).json({ error: 'Audio URL is required.' });
  }

  try {
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch audio: ${audioResponse.statusText}`);
    }

    const contentType = audioResponse.headers.get('content-type') || 'audio/mpeg';
    const contentDisposition = audioResponse.headers.get('content-disposition');
    const parsedUrl = new URL(audioUrl);
    const filename = parsedUrl.pathname.split('/').pop() || 'audio.mp3';
    
    res.setHeader('Content-Type', contentType);
    if (contentDisposition) {
        res.setHeader('Content-Disposition', contentDisposition);
    } else {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }

    if (audioResponse.body) {
      audioResponse.body.pipe(res);
    } else {
      throw new Error('Audio response body is null');
    }

  } catch (error) {
    console.error('Error downloading audio:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download audio.' });
    }
  }
}
