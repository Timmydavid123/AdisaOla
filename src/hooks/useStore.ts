import { useState, useEffect } from "react"
import type { Product, WishlistItem, CartItem, Language, Currency } from "../types"
import { products, languages, currencies, translations, categories, partCategories, brands } from "../data/mockData"

export function useStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [currentCurrency, setCurrency] = useState<Currency>(currencies[0])

  // Initialize with some mock data
  useEffect(() => {
    setWishlistItems([
      {
        id: "1",
        product: products[0],
        addedAt: new Date(),
      },
      {
        id: "2",
        product: products[1],
        addedAt: new Date(),
      },
    ])

    setCartItems([
      {
        id: "1",
        product: products[2],
        quantity: 2,
        addedAt: new Date(),
      },
      {
        id: "2",
        product: products[3],
        quantity: 1,
        addedAt: new Date(),
      },
    ])
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const formatPrice = (price: number) => {
    const convertedPrice = price * currentCurrency.rate
    return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`
  }

  const t = (key: keyof typeof translations.en) => {
    return translations[currentLanguage.code as keyof typeof translations]?.[key] || translations.en[key]
  }

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    wishlistItems,
    cartItems,
    currentLanguage,
    setCurrentLanguage,
    currentCurrency,
    setCurrency,
    languages,
    currencies,
    categories,
    partCategories,
    brands,
    formatPrice,
    t,
  }
}
