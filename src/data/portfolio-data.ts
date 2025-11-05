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
  description: "This series is a personal bridge between two places I call home: Lagos and London. Though separated by geography, I see a deep kinship between them in the spirit of their people, the rhythm of the streets, and the unspoken codes of fashion, posture, and pride. Lagos Meets London is about visual echoes how cultural essence persists across continents. Through portraits, style, and daily street life, I document how Nigerian identity isn't left behind when people migrate; instead, it reshapes and reclaims space in a new city. ",
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
    conclusion: "In this work, I see memory, movement, and cultural duality but most of all, I see belonging. Through this work, I aim to showcase how architecture shapes our daily experiences and emotional connections to the spaces we inhabit.",
  },
  date: "2025",
  client: "Peckham",
  tags: ["African Art", "Photography", "Documentry",],
},
  {
    id: "Life-like-a-movie",
    title: "Life Like a Movie",
    category: "PORTRAIT",
    description: "For the past few months, I've been wandering the streets with my camera, seeking out strangers and moments that feel lifted from cinema. This series explores the cinematic quality hidden within everyday life, the way an ordinary Tuesday afternoon can hold the tension of a thriller, or how a chance encounter on a cobblestone street might mirror a scene from a classic film.",
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
        "Each photograph captures an unguarded moment: a businessman mid-stride, lost in thought; a heavily tattooed figure standing in stark profile against urban decay. These are not staged or directed. They're raw, spontaneous fragments of reality that happen to possess the composition, lighting, and emotional weight of scripted scenes. I'm drawn to the idea that we're all unknowing actors in our own narratives, moving through spaces that serve as natural sets, wearing our stories on our faces and bodies. The drama isn't manufactured, it's already there in the way light falls across a facade, in the posture of someone walking alone, in the juxtaposition of people who will never know they shared a frame.",
      conclusion:
        "This work is about paying attention. It's about recognizing that the extraordinary doesn't require special circumstances; it exists in the gesture of a stranger, the architecture of a moment, the unspoken narrative between subject and setting. These frames reveal the beauty, complexity, and poetry that unfold around us constantly, if only we're present enough to notice. Because life, after all, is its own kind of movie, and we're all both the audience and the cast.",
    },
    date: "2024",
    tags: ["portrait", "natural light", "emotion", "authentic"],
  },
  {
    id: "joy",
    title: "JOY",
    category: "FINE ART",
    description: "This series is a meditation on the universal language of joy, a force that transcends age, circumstance, and context. From children caught in the pure ecstasy of water play, their skin glistening with droplets and adorned with streaks of white like war paint of happiness, to the weathered face of a baba onilu whose smile carries the wisdom of countless rhythms and seasons, each portrait reveals joy as an act of radical self-authorship.",
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
        "The images span generations and moments: a young face split wide with laughter, water cascading like liquid light; hands that have drummed for decades, belonging to an elder whose eyes crinkle with a joy that has survived time itself; strangers and friends alike, each choosing in their own way to let happiness surface and shine through. What unites them is not their circumstances, which vary as widely as their ages, but their shared decision to create and claim joy as their own.There's something defiant in these smiles. They exist not because life has been easy, but because these individuals have chosen to forge joy from whatever materials they've been given. The baba onilu's expression speaks of a lifetime spent creating rhythm and beauty; the children's uninhibited glee reminds us of joy's primal nature; the individual portraits scattered throughout capture those fleeting, precious moments when someone decides to simply be happy, to simply be present.",
      conclusion:
        "Joy, these images insist, is democratic. It belongs to the young and the old, the player and the performer, the celebrated and the overlooked. It doesn't seem to actually tell you anything about your bank account or your status. It requires only your willingness to create a smile, a rhythm, and the decision to be fully alive in a single moment. The series becomes a visual anthology of chosen happiness, a testament to human resilience and the extraordinary power we possess to author our own emotional landscapes. Whether facing a camera directly with unguarded warmth or lost in the abandon of play, each subject demonstrates the same fundamental truth: joy is not a gift bestowed by favourable circumstances, but a creation born from our own minds and effort. Joy is not event-infused; it is not situation-compelled. Joy is a creation of our own minds and effort. You are the author of your joy.",
    },
    date: "2023",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },
    {
    id: "Alake",
    title: "ÀLÀKÉ",
    category: "FINE ART",
    description: "Àlàké (one to be pampered and cared for) a Yoruba name that carries within it the weight of tenderness, value, and ancestral blessing. This series is a meditation on identity reclaimed, on the quiet power of a woman who knows her worth beyond the Western gaze.",
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
        "Photographed in the lush, shadowed corners of a garden in Ibadan Nigeria, she sits and stands with the ease of someone at home in her own skin. The leopard print that drapes her body is not mere fashion, it speaks to an older language, one where pattern and adornment carry meaning, where the wild is worn with intention. Her cornrows trace precise lines across her scalp, a hairstyle with roots that stretch back millennia, functional and beautiful in equal measure. The details tell their own stories: red coral beads wrapped around her ankle, a tradition worn by Yoruba women. Pearl earrings catching the diffused light. A necklace of turquoise beads interrupted by wooden elements and carved symbols perhaps a reference to waist beads, to protection, Her gaze is steady, contemplative, directed away from the camera in one frame, meeting it directly in another.",
      conclusion:
        "This is portraiture that refuses to perform. There is no smile for comfort, no pose for palatability. Instead, there is a presence grounded, self-possessed, unapologetic. The natural backdrop of verdant foliage and weathered wood creates a liminal space, neither fully here nor there. Àlàké exists in her fullness, holding space for complexity, for beauty that doesn't ask permission, for heritage that adapts but never disappears.",
    },
    date: "2023",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },

     {
    id: "An Igbo mother in London",
    title: "An Igbo mother in London",
    category: "African Art",
    description: "Photographed moments after Sunday service on a quiet London street, this Igbo mother stands resplendent in full traditional attire, a powerful portrait of cultural preservation in the diaspora. Her gele, wrapped in rich crimson tones with gold embellishments, rises in sculptural folds that speak to both artistry and tradition. The elaborate headwrap frames her face with regal bearing, a crown of heritage worn with quiet confidence",
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
        "",
      details:
        "Behind her, the unmistakably British landscape unfolds: red brick Victorian buildings, a red double-decker bus at the stop, street signs, and the grey London pavement beneath her feet. The juxtaposition is striking yet harmonious and she doesn't stand apart from this cityscape; she belongs to it, even as she carries another home within her dress, her bearing, her Sunday ritual.",
      conclusion:
        "She is dressed in a complete aso ebi ensemble: a coral-red lace blouse with intricate embroidered patterns catches the diffused London light, its delicate needlework tracing florals across the fabric. The matching wrapper, tied at her waist in the traditional style, features complementary patterns that flow downward. A coordinating handbag rests at her side, its textured surface echoing the day's carefully chosen palette. Pearl bracelets encircle her wrists, and gold earrings catch the afternoon glow small touches that complete the ceremonial dress. This is the reality of diaspora life: home is never left behind. It travels across oceans, adapts to new climates, and flourishes on foreign streets. It shows up after church services in North London neighborhoods, vibrant and unapologetic, a bridge between worlds that her children will cross and recross throughout their lives.",
    },
    date: "2025",
    tags: ["African Art", "Peckham London", "Documentry"],
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
    description: "A striking documentary series capturing the flamboyant presence of a collective who command the streets of South London with theatrical flair and unapologetic style. Shot on location in Peckham, these images chronicle a group adorned in luxurious furs, wide-brimmed fedoras, and cascading gold jewellery, their aesthetic drawing from the iconography of 1970s Blaxploitation cinema filtered through a distinctly contemporary British lens. The photographs pulse with the raw energy of urban performance. Against the graffiti-covered walls and iconic black cabs of Peckham's streets, the subjects transform the everyday backdrop into a stage for self-expression. Their costumes, burgundy leather trenches with fur trim, leopard print coats, and layered chains bearing ornate medallions speak to a carefully curated identity that exists somewhere between homage, satire, and sincere celebration of excess.",
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
        "Each frame captures the swagger of their procession through the neighborhood, their synchronized poses and deliberate placement within the urban landscape suggesting both ownership and outsider status. The overcast London sky lends a cinematic quality to the scenes, the muted light emphasizing the richness of textures: the shine of patent leather, the depth of fur, the gleam of gold against skin.",
      conclusion:
        "These are portraits of confidence and community, of individuals who have chosen visibility in a society that often renders them invisible. The series interrogates notions of masculinity, Black British identity, and the reclamation of stereotypes through exaggeration and aesthetic prowess. There's humour here, but also defiance, a refusal to be confined by respectability politics or mainstream expectations. The London setting is crucial: the Underground roundel, the distinctive architecture, the multicultural signage all ground these images in a specific geography where immigrant communities have long carved out spaces of belonging. Peckham becomes both character and stage, its gritty authenticity providing the perfect counterpoint to the group's polished audacity. This is street photography elevated to cultural commentary, documenting a subculture that exists in plain sight yet remains largely unexamined. The series asks viewers to look beyond surface judgments and consider the artistry, the intention, and the community bonds that manifest through shared aesthetic choices and collective presence in public space.",
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
      {
    id: "Chairs-of-Kings",
    title: "Chairs of Kings",  
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/c2.jpg",
    images: {
      hero: "/c2.jpg",
      gallery: [
        "/c3.jpg",
        "/c4.jpg",
        "/c5.jpg",
        "/c6.jpg",
        "/c7.jpg",
        "/c8.jpg",
        "/c9.jpg",
        "/c10.jpg",
        "/c11.jpg",
        "/c2.jpg",
        "/c4.jpg",
      ],
      featured: "/c1.jpg",
    },
    content: {
      intro:
        "This series transforms familiar natural elements into abstract compositions that challenge perception and invite contemplation.",
      details:
        "Using techniques like macro photography and long exposure, I reveal the hidden patterns and rhythms that exist in nature. Each image is a meditation on form, texture, and the passage of time.",
      conclusion:
        "Through abstraction, we can discover new ways of seeing and appreciating the natural world that surrounds us.",
    },
    date: "2025",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },
      {
    id: "Africa-Mothers-in-Peckham",
    title: "Africa Mothers in Peckham on Mother's Day",  
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/a5.jpg",
    images: {
      hero: "/a5.jpg",
      gallery: [
        "/a3.jpg",
        "/a4.jpg",
        "/a2.jpg",
        "/a6.jpg",
        "/a7.jpg",
        "/a8.jpg",
        "/a9.jpg",
        "/a10.jpg",
        "/a1.jpg",
        "/a5.jpg",
        "/a11.jpg",
      ],
      featured: "/a1.jpg",
    },
    content: {
      intro:
        "This series transforms familiar natural elements into abstract compositions that challenge perception and invite contemplation.",
      details:
        "Using techniques like macro photography and long exposure, I reveal the hidden patterns and rhythms that exist in nature. Each image is a meditation on form, texture, and the passage of time.",
      conclusion:
        "Through abstraction, we can discover new ways of seeing and appreciating the natural world that surrounds us.",
    },
    date: "2025",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },

        {
    id: "STEAMPUNK",
    title: "STEAMPUNK",  
    category: "FINE ART",
    description: "Exploring the abstract patterns and textures found in the natural world.",
    image: "/s1.jpg",
    images: {
      hero: "/s1.jpg",
      gallery: [
        "/s3.jpg",
        "/s4.jpg",
        "/s5.jpg",
        "/s6.jpg",
        "/s7.jpg",
        "/s8.jpg",
        "/s9.jpg",
        "/s10.jpg",
        "/s12.jpg",
        "/s3.jpg",
        "/s11.jpg",
      ],
      featured: "/s2.jpg",
    },
    content: {
      intro:
        "This series transforms familiar natural elements into abstract compositions that challenge perception and invite contemplation.",
      details:
        "Using techniques like macro photography and long exposure, I reveal the hidden patterns and rhythms that exist in nature. Each image is a meditation on form, texture, and the passage of time.",
      conclusion:
        "Through abstraction, we can discover new ways of seeing and appreciating the natural world that surrounds us.",
    },
    date: "2025",
    tags: ["abstract", "nature", "fine art", "patterns"],
  },
]
