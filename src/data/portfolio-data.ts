export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  images: {
    hero: string
    gallery: string[]
    featured: string
  }
  content: {
    intro: string
    details: string
    conclusion: string
  }
  date: string
  client?: string
  tags: string[]
}

export const portfolioItems: PortfolioItem[] = [
{
  id: "Lagos-London",
  title: "Lagos Meet London",
  category: "Documentry",
  description: "This series is a personal bridge between two places I call home: Lagos and London. Though separated by geography, I see a deep kinship between them in the spirit of their people, the rhythm of the streets, and the unspoken codes of fashion, posture, and pride. Lagos Meets London is about visual echoes how cultural essence persists across continents. Through portraits, style, and daily street life, I document how Nigerian identity isn't left behind when people migrate; instead, it reshapes and reclaims space in a new city. In this work, I see memory, movement, and cultural duality but most of all, I see belonging.",
  image: "/port1.jpg",
  images: {
    hero: "/port1.jpg",
    gallery: [
      "/port8.jpg",
      "/port4.jpg",
      "/port5.jpg",
      "/port3.jpg",
      "/port6.jpg",
      "/port7.jpg",
      "/port9.jpg", 
      "/port10.jpg", 
      "/port11.jpg", 
      "/port12.jpg", 
      "/port13.jpg", 
    ],
    featured: "/port2.jpg",
  },
  content: {
    intro: "This series explores the intersection of human ambition and architectural beauty in contemporary urban environments.",
    details: "Each photograph in this collection was carefully composed to highlight the geometric patterns and dramatic lighting that define modern cityscapes. The project spans multiple cities and captures both the grandeur and intimacy of urban life.",
    conclusion: "Through this work, I aim to showcase how architecture shapes our daily experiences and emotional connections to the spaces we inhabit.",
  },
  date: "2024",
  client: "Metropolitan Arts Council",
  tags: ["architecture", "urban", "cityscape", "modern"],
},
  {
    id: "natural-portraits",
    title: "Natural Portraits",
    category: "PORTRAIT",
    description: "Intimate portraits that capture authentic human emotion in natural settings.",
    image: "water.jpg",
    images: {
      hero: "/image4.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg",
    },
    content: {
      intro: "A collection of portraits that celebrate the authentic beauty and complexity of human expression.",
      details:
        "Working exclusively with natural light, this series focuses on creating genuine connections between subject and viewer. Each session was approached as a collaborative exploration of personality and emotion.",
      conclusion:
        "These portraits remind us that true beauty lies in authenticity and the courage to be vulnerable in front of the camera.",
    },
    date: "2024",
    tags: ["portrait", "natural light", "emotion", "authentic"],
  },
  {
    id: "abstract-nature",
    title: "Abstract Nature",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/image4.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro:
        "This series transforms familiar natural elements into abstract compositions that challenge perception and invite contemplation.",
      details:
        "Using techniques like macro photography and long exposure, I reveal the hidden patterns and rhythms that exist in nature. Each image is a meditation on form, texture, and the passage of time.",
      conclusion:
        "Through abstraction, we can discover new ways of seeing and appreciating the natural world that surrounds us.",
    },
    date: "2023",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },
  {
    id: "wedding-moments",
    title: "Wedding Moments",
    category: "WEDDING",
    description: "Capturing the joy, emotion, and intimate moments of life's most precious celebrations.",
    image: "/image2.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro: "Wedding photography that focuses on genuine emotion and the unique story of each couple's special day.",
      details:
        "My approach to wedding photography is documentary-style, capturing authentic moments as they unfold naturally. I believe the best wedding photos are those that transport you back to the feeling of the moment.",
      conclusion:
        "Each wedding is a unique celebration of love, and my goal is to preserve those irreplaceable memories for generations to come.",
    },
    date: "2024",
    tags: ["wedding", "celebration", "emotion", "documentary"],
  },
  {
    id: "street-photography",
    title: "Street Stories",
    category: "DOCUMENTARY",
    description: "Documenting the spontaneous moments and human stories that unfold in urban spaces.",
    image: "/image4.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro: "Street photography that captures the unscripted drama and beauty of everyday urban life.",
      details:
        "This ongoing project documents the diverse stories and characters that make up the fabric of city life. Each photograph is a glimpse into a moment that will never happen again in quite the same way.",
      conclusion:
        "Through street photography, we can celebrate the extraordinary moments that exist within ordinary days.",
    },
    date: "2023-2024",
    tags: ["street", "documentary", "urban", "candid"],
  },
  {
    id: "fashion-editorial",
    title: "Fashion Editorial",
    category: "FASHION",
    description: "High-fashion editorial work that blends creativity with commercial appeal.",
    image: "/image2.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro: "Editorial fashion photography that pushes creative boundaries while maintaining commercial viability.",
      details:
        "Working with top stylists, makeup artists, and models, this series explores the intersection of fashion, art, and storytelling. Each shoot is carefully conceptualized to create images that are both visually striking and emotionally resonant.",
      conclusion:
        "Fashion photography at its best tells a story and evokes emotion while showcasing the artistry of design and style.",
    },
    date: "2024",
    client: "Vogue Italia",
    tags: ["fashion", "editorial", "commercial", "creative"],
  },
  {
    id: "landscape-serenity",
    title: "Landscape Serenity",
    category: "LANDSCAPE",
    description: "Peaceful landscapes that showcase the tranquil beauty of natural environments.",
    image: "/image3.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro: "A meditation on the peaceful and restorative power of natural landscapes.",
      details:
        "This collection was created during extended periods in nature, often requiring early morning hikes and patient waiting for the perfect light. Each image aims to convey the sense of peace and wonder that comes from being immersed in natural beauty.",
      conclusion:
        "In our increasingly digital world, these landscapes serve as reminders of the healing power of nature and our connection to the earth.",
    },
    date: "2023",
    tags: ["landscape", "nature", "serenity", "peaceful"],
  },
  {
    id: "corporate-portraits",
    title: "Corporate Portraits",
    category: "CORPORATE",
    description: "Professional portraits that capture personality while maintaining corporate sophistication.",
    image: "/image4.jpg",
    images: {
      hero: "/image2.jpg",
      gallery: [
        "/image2.jpg",
        "/image4.jpg",
        "/image3.jpg",
        "/image2.jpg",
      ],
      featured: "/image4.jpg?height=500&width=800",
    },
    content: {
      intro: "Corporate photography that balances professionalism with authentic personality.",
      details:
        "Working with executives and teams across various industries, I create portraits that serve business needs while revealing the human side of corporate culture. The goal is to create images that are both approachable and authoritative.",
      conclusion:
        "Great corporate photography helps build trust and connection by showing the people behind the business.",
    },
    date: "2024",
    tags: ["corporate", "professional", "business", "headshots"],
  },
]
