import { useState,  } from "react"
import type { Product } from "../types"



export function useStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, ] = useState<Product[]>([])


 

  
  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  }
}
