import type { Product, Language, Currency } from "../types"

export const products: Product[] = [
  {
    id: "1",
    name: "Marine Engine Oil Filter",
    price: 45.99,
    image: "/placeholder.svg?height=60&width=60",
    category: "Engine Parts",
  },
  {
    id: "2",
    name: "Boat Propeller 3-Blade",
    price: 299.99,
    image: "/placeholder.svg?height=60&width=60",
    category: "Propulsion",
  },
  {
    id: "3",
    name: "Marine Battery 12V",
    price: 189.99,
    image: "/placeholder.svg?height=60&width=60",
    category: "Electrical",
  },
  {
    id: "4",
    name: "Anchor Chain 8mm",
    price: 12.99,
    image: "/placeholder.svg?height=60&width=60",
    category: "Anchoring",
  },
  {
    id: "5",
    name: "Life Jacket Adult",
    price: 79.99,
    image: "/placeholder.svg?height=60&width=60",
    category: "Safety",
  },
]

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

export const currencies: Currency[] = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1 },
  { code: "USD", name: "US Dollar", symbol: "$", rate: 0.0013 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.0012 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.001 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 0.0018 },
]

export const translations = {
  en: {
    searchPlaceholder: "Search by product name, type",
    talkToSpecialist: "Talk to a specialist",
    allCategories: "All Categories",
    home: "Home",
    parts: "Parts",
    brands: "Brands",
    contactUs: "Contact us",
    requestQuote: "Request Quote",
    wishlist: "Wishlist",
    cart: "Cart",
    viewAll: "View All",
    myOrders: "My Orders",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    emptyWishlist: "Your wishlist is empty",
    emptyCart: "Your cart is empty",
  },
  fr: {
    searchPlaceholder: "Rechercher par nom de produit, type",
    talkToSpecialist: "Parler à un spécialiste",
    allCategories: "Toutes les catégories",
    home: "Accueil",
    parts: "Pièces",
    brands: "Marques",
    contactUs: "Nous contacter",
    requestQuote: "Demander un devis",
    wishlist: "Liste de souhaits",
    cart: "Panier",
    viewAll: "Voir tout",
    myOrders: "Mes commandes",
    settings: "Paramètres",
    profile: "Profil",
    logout: "Déconnexion",
    emptyWishlist: "Votre liste de souhaits est vide",
    emptyCart: "Votre panier est vide",
  },
}

export const categories = [
  { id: "1", name: "Engine Parts", icon: "⚙️", count: 245 },
  { id: "2", name: "Propulsion", icon: "🚁", count: 189 },
  { id: "3", name: "Electrical", icon: "⚡", count: 156 },
  { id: "4", name: "Navigation", icon: "🧭", count: 98 },
  { id: "5", name: "Safety Equipment", icon: "🦺", count: 134 },
  { id: "6", name: "Anchoring", icon: "⚓", count: 87 },
  { id: "7", name: "Plumbing", icon: "🔧", count: 76 },
  { id: "8", name: "Deck Hardware", icon: "🔩", count: 112 },
]

export const partCategories = {
  "Engine & Propulsion": [
    { name: "Outboard Motors", count: 45 },
    { name: "Inboard Engines", count: 32 },
    { name: "Propellers", count: 78 },
    { name: "Engine Oil & Filters", count: 156 },
    { name: "Fuel Systems", count: 89 },
    { name: "Cooling Systems", count: 67 },
    { name: "Exhaust Systems", count: 43 },
    { name: "Transmission", count: 29 },
  ],
  "Electrical & Electronics": [
    { name: "Marine Batteries", count: 34 },
    { name: "GPS & Chartplotters", count: 28 },
    { name: "VHF Radios", count: 45 },
    { name: "Fish Finders", count: 67 },
    { name: "Lighting", count: 89 },
    { name: "Wiring & Cables", count: 123 },
    { name: "Switches & Controls", count: 56 },
    { name: "Inverters & Chargers", count: 23 },
  ],
  "Safety & Navigation": [
    { name: "Life Jackets", count: 78 },
    { name: "Flares & Signals", count: 34 },
    { name: "Fire Extinguishers", count: 45 },
    { name: "First Aid Kits", count: 23 },
    { name: "Compasses", count: 56 },
    { name: "Binoculars", count: 34 },
    { name: "Emergency Equipment", count: 67 },
    { name: "MOB Systems", count: 12 },
  ],
  "Deck & Hull": [
    { name: "Anchors & Chain", count: 89 },
    { name: "Ropes & Lines", count: 134 },
    { name: "Cleats & Hardware", count: 78 },
    { name: "Fenders & Bumpers", count: 56 },
    { name: "Winches", count: 34 },
    { name: "Hatches & Ports", count: 45 },
    { name: "Railings & Stanchions", count: 67 },
    { name: "Deck Drains", count: 23 },
  ],
}

export const brands = [
  { id: "1", name: "Yamaha", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "2", name: "Mercury", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "3", name: "Honda", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "4", name: "Suzuki", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "5", name: "Garmin", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "6", name: "Raymarine", logo: "/placeholder.svg?height=40&width=80", popular: true },
  { id: "7", name: "Lowrance", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "8", name: "Simrad", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "9", name: "Furuno", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "10", name: "Standard Horizon", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "11", name: "Icom", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "12", name: "Fortress", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "13", name: "Lewmar", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "14", name: "Harken", logo: "/placeholder.svg?height=40&width=80", popular: false },
  { id: "15", name: "West Marine", logo: "/placeholder.svg?height=40&width=80", popular: false },
]
