
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { URL } from 'url';

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

    const contentType = videoResponse.headers.get('content-type') || 'video/mp4';
    const contentDisposition = videoResponse.headers.get('content-disposition');
    const parsedUrl = new URL(videoUrl);
    const filename = parsedUrl.pathname.split('/').pop() || 'video.mp4';
    
    res.setHeader('Content-Type', contentType);
    if (contentDisposition) {
        res.setHeader('Content-Disposition', contentDisposition);
    } else {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }
    
    if (videoResponse.body) {
      videoResponse.body.pipe(res);
    } else {
      throw new Error('Video response body is null');
    }

  } catch (error) {
    console.error('Error downloading video:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download video.' });
    }
  }
}
