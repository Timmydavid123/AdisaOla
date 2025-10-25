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
   externalLink?: string;
}

export const portfolioItems: PortfolioItem[] = [
{
  id: "Superrare",
  title: "Superrare Nft",

  image: "/f2863f177315831.64d3ebf2deae2.jpg",

  content: {
    intro: "This series explores the intersection of human ambition and architectural beauty in contemporary urban environments.",
    details: "",
    conclusion: "Through this work, I aim to showcase how architecture shapes our daily experiences and emotional connections to the spaces we inhabit.",
  },
  images: {
    hero: "",
    gallery: [],
    featured: ""
  },
  category: "",
  description: "",
  date: "",
  tags: [],
  externalLink: "https://superrare.com/adisaolashile"
},
  {
    id: "Life-like-a-movie",
    title: "Foundation Nft",
    category: "PORTRAIT",
    description: "Intimate portraits that capture authentic human emotion in natural settings.",
    image: "1679995624-foundation.webp",
    images: {
      hero: "/main.jpg",
      gallery: [
        "/l1.jpg",
        "/l2.jpg",
        "/l3.jpg",
        "/l13.jpg",
        "/l6.jpg",
        "/l15.jpg",
        "/l8.jpg",
        "/l9.jpg",
        "/l10.jpg",
        "/l11.jpg",
        "/l12.jpg",
      ],
      featured: "/l5.jpg",
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
    externalLink: "https://foundation.app/@adisaolashile"
  },
  {
    id: "OpeanSea",
    title: "OpenSea Nft",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/opeansea.png",
    images: {
      hero: "/j7.jpg",
      gallery: [
        "/j2.jpg",
        "/j4.jpg",
        "/j3.jpg",
        "/j1.jpg",
        "/j5.jpg",
        "/j6.jpg",
        "/j7.jpg",
        "/j8.jpg",
        "/j9.jpg",
        "/j10.jpg",
        "/j2.jpg",
      ],
      featured: "/j11.jpg",
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
    externalLink: "https://opensea.io/Adisaolashile"
  },
]
