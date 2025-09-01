
export interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  videoSrc: string;
  dataAiHint: string;
  otherMedia?: {
    title: string;
    type: 'Audio' | 'Video';
    src: string;
  }[];
}

export const artists: Artist[] = [
  {
    id: 1,
    name: 'Leo',
    bio: 'An independent artist known for his soulful melodies and acoustic vibes. His music often explores themes of love, loss, and self-discovery, resonating with a wide audience.',
    image: 'https://picsum.photos/400/400',
    dataAiHint: 'male singer',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    otherMedia: [
      { title: 'Sunset Serenade', type: 'Audio', src: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg' },
      { title: 'Ocean Dreams', type: 'Video', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'City Lights', type: 'Audio', src: 'http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3' },
    ],
  },
  {
    id: 2,
    name: 'Zara',
    bio: 'A rising pop star with a powerful voice and energetic stage presence. Zara\'s music is a blend of catchy pop hooks and heartfelt lyrics, making her a favorite among fans of modern pop.',
    image: 'https://picsum.photos/401/401',
    dataAiHint: 'female singer',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    otherMedia: [
        { title: 'Electric Pulse', type: 'Audio', src: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg' },
    ],
  },
  {
    id: 3,
    name: 'The Nomads',
    bio: 'An indie rock band famous for their raw energy and poetic lyrics. Their live shows are legendary, creating an immersive experience for their dedicated fanbase.',
    image: 'https://picsum.photos/402/402',
    dataAiHint: 'music band',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 4,
    name: 'DJ Echo',
    bio: 'An electronic music producer and DJ who creates immersive soundscapes. DJ Echo is known for pushing the boundaries of electronic music with innovative beats and textures.',
    image: 'https://picsum.photos/403/403',
    dataAiHint: 'dj',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 5,
    name: 'Serena',
    bio: 'A classical pianist with a contemporary twist. Serena blends timeless classical pieces with modern influences, creating a unique and captivating musical style.',
    image: 'https://picsum.photos/404/404',
    dataAiHint: 'female pianist',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
   {
    id: 6,
    name: 'Riff Raff',
    bio: 'A high-energy rock guitarist known for his electrifying solos and stage antics. His music is a pure adrenaline rush.',
    image: 'https://picsum.photos/405/405',
    dataAiHint: 'male guitarist',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
];
