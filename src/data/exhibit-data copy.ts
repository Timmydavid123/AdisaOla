import type { To } from "react-router-dom"

export interface ExhibitionItem {
  link: To
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

export const exhibitionItems: ExhibitionItem[] = [
{
  id: "Lagos-London",
  title: "",
  category: "Documentry",
  description: "This series is a personal bridge between two places I call home: Lagos and London. Though separated by geography, I see a deep kinship between them in the spirit of their people, the rhythm of the streets, and the unspoken codes of fashion, posture, and pride. Lagos Meets London is about visual echoes how cultural essence persists across continents. Through portraits, style, and daily street life, I document how Nigerian identity isn't left behind when people migrate; instead, it reshapes and reclaims space in a new city. In this work, I see memory, movement, and cultural duality but most of all, I see belonging.",
  image: "/e1.PNG",
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
    details: "",
    conclusion: "Through this work, I aim to showcase how architecture shapes our daily experiences and emotional connections to the spaces we inhabit.",
  },
  date: "2025",
  client: "Peckham",
  tags: ["African Art", "Photography", "Documentry",],
  link: "https://culturecustodian.com/adisa-olashile-on-harnessing-the-magic-of-serendipity-through-photography/?fbclid=PAdGRjcAMq4Q1leHRuA2FlbQIxMQABp63JIQ5Zccb6LQajwXZsiUDzJZ9rzK6NNdDKWCId2cCld6rsEWIRHAoyKK6e_aem__GUDuK6uWzqtgEKbwFsfyQ"
},
  {
    id: "natural-portraits",
    title: "",
    category: "PORTRAIT",
    description: "Intimate portraits that capture authentic human emotion in natural settings.",
    image: "e2.PNG",
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
      details: "Working exclusively with natural light, this series focuses on creating genuine connections between subject and viewer. Each session was approached as a collaborative exploration of personality and emotion.",
      conclusion: "These portraits remind us that true beauty lies in authenticity and the courage to be vulnerable in front of the camera.",
    },
    date: "2024",
    tags: ["portrait", "natural light", "emotion", "authentic"],
    link:  "https://guzangs.com/adisa-olashile-little-lagos-peckham/?fbclid=PAdGRjcAMq4UJleHRuA2FlbQIxMQABp24Ty1YmM7KFXVOsgd3UDEbQmNgPUEUck8S0mLji6zAKwlFg3S-IzktjqXy4_aem_bsddgRhhId2P4QafSSJKng"
  },
  {
    id: "abstract-nature",
    title: "Baba Onilu With BellaNaija",
    category: "",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/e3.jpg",
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
      intro: "This series transforms familiar natural elements into abstract compositions that challenge perception and invite contemplation.",
      details: "Using techniques like macro photography and long exposure, I reveal the hidden patterns and rhythms that exist in nature. Each image is a meditation on form, texture, and the passage of time.",
      conclusion: "Through abstraction, we can discover new ways of seeing and appreciating the natural world that surrounds us.",
    },
    date: "2023",
    tags: ["abstract", "nature", "fine art", "patterns"],
    link:  "https://www.bellanaija.com/2022/04/adisa-olashile-baba-onilu-nft/"
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
      details: "My approach to wedding photography is documentary-style, capturing authentic moments as they unfold naturally. I believe the best wedding photos are those that transport you back to the feeling of the moment.",
      conclusion: "Each wedding is a unique celebration of love, and my goal is to preserve those irreplaceable memories for generations to come.",
    },
    date: "2024",
    tags: ["wedding", "celebration", "emotion", "documentary"],
    link:  "/portfolio/1"
  },
]
