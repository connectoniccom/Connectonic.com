
export interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  videoSrc: string;
  dataAiHint: string;
  audioSrc: string;
  otherMedia?: {
    title: string;
    type: 'Audio' | 'Video';
    src: string;
  }[];
}

export const artists: Artist[] = [
  {
    id: 1,
    name: 'Leo Mantis',
    image: 'https://picsum.photos/400/400',
    dataAiHint: 'musician portrait',
    bio: 'A solo artist known for his soulful melodies and intricate guitar work. His music blends elements of folk, rock, and blues.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    otherMedia: [
        { title: 'Acoustic Session', type: 'Audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
        { title: 'Live at The Roxy', type: 'Video', src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' },
    ],
  },
  {
    id: 2,
    name: 'Starlight Groove',
    image: 'https://picsum.photos/401/401',
    dataAiHint: 'band music',
    bio: 'A dynamic funk band that brings energy to every stage. Their groovy basslines and powerful horns are guaranteed to make you move.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
     otherMedia: [
        { title: 'Funky Town', type: 'Audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    ],
  },
  {
    id: 3,
    name: 'DJ Echo',
    image: 'https://picsum.photos/402/402',
    dataAiHint: 'dj mixing',
    bio: 'An electronic music producer and DJ who creates immersive soundscapes. Her sets are a journey through ambient, techno, and house.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    otherMedia: [],
  },
  {
    id: 4,
    name: 'The Midnight Howlers',
    image: 'https://picsum.photos/403/403',
    dataAiHint: 'rock band',
    bio: 'A hard-hitting rock band with raw vocals and blistering guitar solos. Their sound is reminiscent of classic rock with a modern edge.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    otherMedia: [
        { title: 'Stadium Anthem', type: 'Audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
        { title: 'Rehearsal Footage', type: 'Video', src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' },
    ],
  },
  {
    id: 5,
    name: 'Celeste Bloom',
    image: 'https://picsum.photos/404/404',
    dataAiHint: 'singer stage',
    bio: 'A pop singer with a powerful voice and an anthemic sound. Her songs are about love, loss, and empowerment.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    videoSrc: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
     otherMedia: [
        { title: 'Starlight Ballad', type: 'Audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
    ],
  },
  {
    id: 6,
    name: 'Cindy Sanyu',
    image: `https://storage.googleapis.com/gcf-v2-uploads-737297307622.us-central1.cloudfunctions.appspot.com/Images/Cindy%20sanyu.jpg`,
    dataAiHint: 'ugandan musician',
    bio: 'Cinderella Sanyu, known as Cindy, is a Ugandan musician. She was one of the original members of Blu*3. She is known for her energetic live performances and has been dubbed \'The King Herself\'.',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    videoSrc: 'https://storage.googleapis.com/gcf-v2-uploads-737297307622.us-central1.cloudfunctions.appspot.com/Cindy%20sanyu/Dufla_Diligon_Feat_Cindy_Sanyu___Tempo.mp4',
    otherMedia: [
        { title: 'Boom Party', type: 'Audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
    ],
  },
];
