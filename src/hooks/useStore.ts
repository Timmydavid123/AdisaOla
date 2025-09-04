import { useState, useEffect } from "react"
import type { Product } from "../types"
import { products } from "../data/productdata"


export function useStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])


  // Initialize with some mock data
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

  
  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  }
}
