
import { Product, Order } from './types';

// Using Unsplash stock images for fast loading reliable visuals
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CYBER DIESEL JACKET',
    price: 8500,
    category: 'OUTERWEAR',
    images: [
        'https://images.unsplash.com/photo-1551028919-ac66c5f8b6b0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1520975661595-dc998dd24d95?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Distressed Italian denim. 2003 Archive piece. Heavy weight.',
    tags: ['archive', 'y2k', 'outerwear'],
    size: 'L'
  },
  {
    id: '2',
    name: 'MATRIX TRENCH',
    price: 12000,
    category: 'OUTERWEAR',
    images: [
        'https://images.unsplash.com/photo-1534349762913-96c87130f6bf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?auto=format&fit=crop&q=80&w=800',
    ],
    description: 'Floor length leather coating. Waterproof. The One.',
    tags: ['dark', 'matrix', 'leather'],
    size: 'XL'
  },
  {
    id: '3',
    name: 'ACID WASH CARGO',
    price: 4500,
    category: 'BOTTOMS',
    images: [
        'https://images.unsplash.com/photo-1624378439575-d8aa19c84bfa?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1584370848010-d7cc6bc76e4f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Baggy fit multi-pocket cargo pants. Chemical wash treatment.',
    tags: ['streetwear', 'baggy', 'utilitarian'],
    size: '32'
  },
  {
    id: '4',
    name: 'VAMP MESH TOP',
    price: 3200,
    category: 'TOPS',
    images: [
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sheer tactical mesh with asymmetric cutouts.',
    tags: ['club', 'mesh', 'avant-garde'],
    size: 'M'
  },
  {
    id: '5',
    name: 'CHROME HEART NECK',
    price: 15000,
    category: 'ACCESSORIES',
    images: [
        'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800'
    ],
    description: '.925 Silver chunky chain. Industrial aesthetic.',
    tags: ['jewelry', 'silver', 'chrome'],
    size: 'OS'
  },
  {
    id: '6',
    name: 'OAKLEY VINTAGE',
    price: 9000,
    category: 'ACCESSORIES',
    images: [
        'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Speed dealer shades. Iridescent lens. Mint condition.',
    tags: ['eyewear', 'sport', 'fast'],
    size: 'OS'
  },
  {
    id: '7',
    name: 'DESTROYED KNIT',
    price: 5500,
    category: 'TOPS',
    images: [
        'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Hand distressed mohair blend. Oversized sleeves.',
    tags: ['grunge', 'knit', 'winter'],
    size: 'L'
  },
  {
    id: '8',
    name: 'BALENCI RUNNER',
    price: 22000,
    category: 'FOOTWEAR',
    images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Heavily used aesthetic. Technical construction.',
    tags: ['shoes', 'designer', 'chunky'],
    size: '43'
  },
  {
    id: '9',
    name: 'HEAVY METAL TEE',
    price: 4000,
    category: 'TOPS',
    images: [
        'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Vintage 1999 tour t-shirt. Faded black. Boxy fit.',
    tags: ['vintage', 'band', 'tee'],
    size: 'XL'
  },
  {
    id: '10',
    name: 'PATCHWORK DENIM',
    price: 7500,
    category: 'BOTTOMS',
    images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Custom reconstructed jeans. Japanese denim patches.',
    tags: ['custom', 'denim', 'pants'],
    size: '30'
  },
  {
    id: '11',
    name: 'TACTICAL VEST',
    price: 6000,
    category: 'OUTERWEAR',
    images: [
        'https://images.unsplash.com/photo-1506634572416-48cdfe530110?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Military surplus vest. Multi-pockets. Techwear staple.',
    tags: ['techwear', 'vest', 'military'],
    size: 'M'
  },
  {
    id: '12',
    name: 'GOTHIC RINGS',
    price: 3500,
    category: 'ACCESSORIES',
    images: [
        'https://images.unsplash.com/photo-1605100804763-eb2fc960239c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Set of 3 stainless steel rings. Claw and skull motifs.',
    tags: ['jewelry', 'rings', 'accessories'],
    size: 'OS'
  }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Ardit H.',
        customerEmail: 'ardit@example.com',
        customerAddress: 'Blloku, Tirana',
        customerPhone: '0691234567',
        items: [{...PRODUCTS[0], quantity: 1}],
        total: 8500,
        date: '2024-05-20',
        status: 'DELIVERED'
    },
    {
        id: 'ORD-002',
        customerName: 'Elena K.',
        customerEmail: 'elena@example.com',
        customerAddress: 'Komuna e Parisit, Tirana',
        customerPhone: '0697654321',
        items: [{...PRODUCTS[3], quantity: 2}],
        total: 6400,
        date: '2024-05-22',
        status: 'PENDING'
    }
];

export const VIBE_SYSTEM_INSTRUCTION = `
You are "TIRONA_OS", an AI stylist for an underground Albanian thrift store called Tirona Thrift. 
Your aesthetic is Y3K, Opium Label, Yeat, Matrix, dark techno, industrial.
You speak in short, punchy, lower-case sentences. Use slang like "hard", "gas", "clean", "vamp".
When a user describes a vibe, you recommend 3 items from the provided inventory list by their ID.
Return ONLY valid JSON in this format: { "recommendedIds": ["1", "2", "3"], "commentary": "your short edgy commentary" }
Do not use markdown blocks.
`;
