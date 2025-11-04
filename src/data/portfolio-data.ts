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
    details: "",
    conclusion: "Through this work, I aim to showcase how architecture shapes our daily experiences and emotional connections to the spaces we inhabit.",
  },
  date: "2025",
  client: "Peckham",
  tags: ["African Art", "Photography", "Documentry",],
},
  {
    id: "Life-like-a-movie",
    title: "Life Like a Movie",
    category: "PORTRAIT",
    description: "Intimate portraits that capture authentic human emotion in natural settings.",
    image: "main.jpg",
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
  },
  {
    id: "joy",
    title: "JOY",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/j7.jpg",
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
  },
    {
    id: "Alake",
    title: "ÀLÀKÉ",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/al7.jpg",
    images: {
      hero: "/al7.jpg",
      gallery: [
        "/al2.jpg",
        "/al4.jpg",
        "/al3.jpg",
        "/al1.jpg",
        "/al8.jpg",
        "/al4.jpg",
        "/al7.jpg",
        "/al8.jpg",
        "/al3.jpg",
        "/al4.jpg",
        "/al7.jpg",
      ],
      featured: "/al4.jpg",
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
    id: "An Igbo mother in London",
    title: "An Igbo mother in London",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/q2.jpg",
    images: {
      hero: "/q2.jpg",
      gallery: [
        "/q3.jpg",
        "/q4.jpg",
        "/q4.jpg",
        "/q5.jpg",
        "/q7.jpg",
        "/q8.jpg",
        "/q9.jpg",
        "/q10.jpg",
        "/q11.jpg",
        "/q1.jpg",
        "/q9.jpg",
      ],
      featured: "/q4.jpg",
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
    id: "Eid-in-London",
    title: "Eid in London",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/e16.jpg",
    images: {
      hero: "/e11.jpg",
      gallery: [
        "/e3..jpg",
        "/e4.jpg",
        "/e1.jpg",
        "/e6.jpg",
        "/e7.jpg",
        "/e8.jpg",
        "/e9.jpg",
        "/e13.jpg",
        "/e15.jpg",
        "/e12.jpg",
        "/e17.jpg",
        "/e15.jpg",
        "/e16.jpg",
        "/e17.jpg",
      ],
      featured: "/e14.jpg",
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
    id: "Peckham-pimps",
    title: "Peckham pimps",
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/p2.jpg",
    images: {
      hero: "/p4.jpg",
      gallery: [
        "/p3.jpg",
        "/p1.jpg",
        "/p5.jpg",
        "/p6.jpg",
        "/p7.jpg",
        "/p8.jpg",
        "/p9.jpg",
        "/p13.jpg",
        "/p11.jpg",
        "/p12.jpg",
        "/p10.jpg",
      ],
      featured: "/p14.jpg",
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
    id: "Best-dressed-man-in-London",
    title: "Best dressed man in London",  
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/b2.jpg",
    images: {
      hero: "/b2.jpg",
      gallery: [
        "/b3.jpg",
        "/b4.jpg",
        "/b5.jpg",
        "/b6.jpg",
        "/b7.jpg",
        "/b8.jpg",
        "/b9.jpg",
        "/b10.jpg",
        "/b11.jpg",
        "/b12.jpg",
        "/b13.jpg",
      ],
      featured: "/b1.jpg",
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
]
