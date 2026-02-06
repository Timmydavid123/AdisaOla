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
    id: "baba-onlilu",
    title: "Baba Onilu",
    category: "",
    description:
      "A cover story for Culture Custodian Magazine spotlighting the power of storytelling through portraiture.",
    image: "/l.png",
    images: {
      hero: "/pub3-hero.jpg",
      gallery: ["/pub3a.jpg", "/pub3b.jpg", "/pub3c.jpg"],
      featured: "/pub3f.jpg",
    },
    content: {
      intro:
        "In this exclusive feature, Adisa discusses the philosophy behind capturing truth through the lens.",
      details:
        "It examines his approach to blending street photography and personal narrative to create emotionally resonant imagery.",
      conclusion:
        "Portraits of Change is not just about faces — it’s about the stories that live within them.",
    },
    date: "2025",
    client: "Culture Custodian",
    tags: ["Photography", "Portrait", "Storytelling", "Culture"],
    link: "https://www.ghanamma.com/ng/2022/04/10/how-nigerian-photographer-took-photos-of-an-aged-drummer-sold-it-as-an-nft-for-millions-of-naira/",
  },
    {
    id: "The Guardian",
    title: "The Guardian",
    category: "",
    description:
      "A cover story for Culture Custodian Magazine spotlighting the power of storytelling through portraiture.",
    image: "/pub4.jpeg",
    images: {
      hero: "/pub3-hero.jpg",
      gallery: ["/pub3a.jpg", "/pub3b.jpg", "/pub3c.jpg"],
      featured: "/pub3f.jpg",
    },
    content: {
      intro:
        "In this exclusive feature, Adisa discusses the philosophy behind capturing truth through the lens.",
      details:
        "It examines his approach to blending street photography and personal narrative to create emotionally resonant imagery.",
      conclusion:
        "Portraits of Change is not just about faces — it’s about the stories that live within them.",
    },
    date: "2025",
    client: "Culture Custodian",
    tags: ["Photography", "Portrait", "Storytelling", "Culture"],
    link: "https://www.ghanamma.com/ng/2022/04/10/how-nigerian-photographer-took-photos-of-an-aged-drummer-sold-it-as-an-nft-for-millions-of-naira/",
  },
]
