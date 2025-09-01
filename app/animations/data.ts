
export interface AnimationAsset {
  id: number;
  title: string;
  src: string;
  type: 'Sticker' | 'GIF' | 'Emoji';
}

export const animations: AnimationAsset[] = [
  // Stickers
  { id: 1, title: 'Cool Cat', src: 'https://picsum.photos/200/200?random=1', type: 'Sticker' },
  { id: 2, title: 'Happy Dog', src: 'https://picsum.photos/200/200?random=2', type: 'Sticker' },
  { id: 3, title: 'Dancing Robot', src: 'https://picsum.photos/200/200?random=3', type: 'Sticker' },
  { id: 4, title: 'Waving Bear', src: 'https://picsum.photos/200/200?random=4', type: 'Sticker' },
  { id: 5, title: 'Surprised Pikachu', src: 'https://picsum.photos/200/200?random=5', type: 'Sticker' },

  // GIFs
  { id: 6, title: 'Funny Fail', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDBxZ3FpemRjaHlscjZsejlzZWh2bDNmMnV3c3J6b2h2dGdzbmdhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1d5Zn8z5g0v4Y/giphy.gif', type: 'GIF' },
  { id: 7, title: 'Mind Blown', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGcyY2d0bHl2aHU5NnA0aWl0ZzZzM2k3dGI0ZTJnMmJvdGxucTVmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif', type: 'GIF' },
  { id: 8, title: 'Deal With It', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajVxazR6cWQ3ZWp6eDE3bWJhd2liZHFwZzNqY3o5eDZneDljYzFkbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13Iu93lYVutk1W/giphy.gif', type: 'GIF' },
  { id: 9, title: 'Homer Backs Away', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQ2ZDMzeXVqZzJzNnZicmU2b281dW1pbDY1NnBqejg0OHJjYnR0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a93jwI0wkWTO8/giphy.gif', type: 'GIF' },
  { id: 10, title: 'This is Fine', src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTk5bWc2bXY0bXFjcmJmYnFqM3ZmdnN6Y2ZldGNkaWt0enU4dTRkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif', type: 'GIF' },
  
  // Emojis
  { id: 11, title: 'Laughing', src: 'https://picsum.photos/200/200?random=11', type: 'Emoji' },
  { id: 12, title: 'Thumbs Up', src: 'https://picsum.photos/200/200?random=12', type: 'Emoji' },
  { id: 13, title: 'Heart', src: 'https://picsum.photos/200/200?random=13', type: 'Emoji' },
  { id: 14, title: 'Fire', src: 'https://picsum.photos/200/200?random=14', type: 'Emoji' },
  { id: 15, title: 'Thinking', src: 'https://picsum.photos/200/200?random=15', type: 'Emoji' },
];
