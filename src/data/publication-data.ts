import type { To } from "react-router-dom"

export interface PublicationItem {
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

export const publicationItems: PublicationItem[] = [
  {
    id: "bn-feature",
    title: "Baba Onilu: The NFT Revolution",
    category: "INTERVIEW",
    description:
      "A deep dive into how Adisa Olashile’s ‘Baba Onilu’ series redefined the intersection of photography and blockchain art in Nigeria.",
    image: "/pub1.jpg",
    images: {
      hero: "/pub1-hero.jpg",
      gallery: ["/pub1a.jpg", "/pub1b.jpg", "/pub1c.jpg"],
      featured: "/pub1f.jpg",
    },
    content: {
      intro:
        "Published on BellaNaija, this piece explores the story behind the viral NFT ‘Baba Onilu’ and how it bridges traditional storytelling and digital ownership.",
      details:
        "The feature unpacks the cultural impact of documenting ordinary people through extraordinary mediums, shining light on how art and technology amplify African voices.",
      conclusion:
        "Through platforms like NFTs, African photographers are claiming new spaces for visibility, value, and ownership.",
    },
    date: "2023",
    client: "BellaNaija",
    tags: ["NFT", "Photography", "Culture", "Innovation"],
    link: "https://www.bellanaija.com/2022/04/adisa-olashile-baba-onilu-nft/",
  },
  {
    id: "guardian-feature",
    title: "Little Lagos, Big Dreams",
    category: "ARTICLE",
    description:
      "Featured in The Guardian, this article examines the creative migration of Nigerian artists in the diaspora.",
    image: "/pub2.jpg",
    images: {
      hero: "/pub2-hero.jpg",
      gallery: ["/pub2a.jpg", "/pub2b.jpg"],
      featured: "/pub2f.jpg",
    },
    content: {
      intro:
        "The Guardian’s feature explores how African artists are redefining identity and cultural expression in global art spaces.",
      details:
        "Through interviews and photo essays, the article highlights how migration influences creative storytelling and authenticity.",
      conclusion:
        "The story reaffirms that cultural identity travels — it evolves, but it never disappears.",
    },
    date: "2024",
    client: "The Guardian",
    tags: ["Diaspora", "Culture", "Art", "Identity"],
    link: "https://guardian.ng/life/little-lagos-big-dreams/",
  },
  {
    id: "culture-magazine",
    title: "Portraits of Change",
    category: "FEATURE",
    description:
      "A cover story for Culture Custodian Magazine spotlighting the power of storytelling through portraiture.",
    image: "/pub3.jpg",
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
    link: "https://culturecustodian.com/adisa-olashile-on-harnessing-the-magic-of-serendipity-through-photography/",
  },
]
