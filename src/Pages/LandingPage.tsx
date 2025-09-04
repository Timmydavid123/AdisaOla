"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Link } from "react-router-dom"
import { portfolioItems } from "../data/portfolio-data";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const menuRef = useRef(null)

  const images = [
    "/image10.jpg",
    "/image8.jpg",
    "/image7.jpg",
    "/image6.jpg",
    "/image9.jpg",
  ]

  const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Portfolio", href: "/portfolio" },
    { name: "Exhibition", href: "/exhibition" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: { closest: (arg0: string) => unknown } }) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const portfolioSection = document.getElementById("portfolio")
      const aboutSection = document.getElementById("about")
      const scrollY = window.scrollY
      
      if (portfolioSection && aboutSection) {
        const portfolioTop = portfolioSection.offsetTop
        const aboutTop = aboutSection.offsetTop
        
        if (scrollY >= portfolioTop && scrollY < aboutTop) {
          setIsDarkBackground(false)
        } else if (scrollY >= aboutTop) {
          setIsDarkBackground(true)
        } else {
          setIsDarkBackground(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 800)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Custom CSS for thin typography and header style */}
      <style jsx global>{`
        /* Thin typography throughout the site */
        body {
          font-weight: 300;
          overflow-x: hidden;
        }
        h1, h2, h3, h4, h5, h6, p, a, span, li, button {
          font-weight: 300;
          letter-spacing: 0.5px;
        }
        
        /* Header style from the image */
        .faulkner-header {
          position: fixed;
          width: 100%;
          padding: 1.5rem 0;
          background: transparent;
          z-index: 50;
          transition: background 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 2rem;
        }
        
        .header-name {
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: white;
        }
        
        /* 3D Menu Toggle Button - Fixed position */
        .menu-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 40px;
          height: 40px;
          z-index: 1000;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          padding: 8px;
          transition: all 0.3s ease;
        }
        
        .menu-toggle:hover {
          background: rgba(100, 100, 100, 0.5);
          transform: scale(1.1);
        }
        
        .menu-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: white;
          margin: 2px 0;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        
        .menu-toggle.open span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        
        .menu-toggle.open span:nth-child(2) {
          opacity: 0;
        }
        
        .menu-toggle.open span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        
        /* 3D Sidebar Navigation */
        .sidebar-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100vh;
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(10px);
          z-index: 900;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 6rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
        }
        
        .sidebar-nav.open {
          transform: translateX(0);
        }
        
        .sidebar-nav::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #666666, #999999);
        }
        
        .nav-item {
          padding: 1.2rem 0;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          transform: translateX(20px);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        
        .sidebar-nav.open .nav-item {
          transform: translateX(0);
          opacity: 1;
        }
        
        .sidebar-nav.open .nav-item:nth-child(1) { transition-delay: 0.1s; }
        .sidebar-nav.open .nav-item:nth-child(2) { transition-delay: 0.2s; }
        .sidebar-nav.open .nav-item:nth-child(3) { transition-delay: 0.3s; }
        .sidebar-nav.open .nav-item:nth-child(4) { transition-delay: 0.4s; }
        .sidebar-nav.open .nav-item:nth-child(5) { transition-delay: 0.5s; }
        
        .nav-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(to right, #666666, #999999);
          transition: width 0.3s ease;
        }
        
        .nav-item:hover {
          color: #cccccc;
          transform: translateX(10px);
        }
        
        .nav-item:hover::before {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .header-name {
            font-size: 0.9rem;
            letter-spacing: 0.2em;
          }
          
          .menu-toggle {
            top: 1.5rem;
            right: 1.5rem;
          }
          
          .sidebar-nav {
            width: 250px;
          }
        }
      `}</style>

      {/* Menu Toggle Button with dynamic colors */}
      <div 
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          background: isDarkBackground ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <span style={{ background: isDarkBackground ? 'white' : 'black' }}></span>
        <span style={{ background: isDarkBackground ? 'white' : 'black' }}></span>
        <span style={{ background: isDarkBackground ? 'white' : 'black' }}></span>
      </div>

      {/* 3D Sidebar Navigation */}
      <nav ref={menuRef} className={`sidebar-nav ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="nav-item"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Header matching the image style */}
       <header className="faulkner-header">
              <div className="header-content">
                <Link 
                  to="/" 
                  className="header-name"
                  style={{ 
                    color: isDarkBackground ? 'white' : 'black',
                    textDecoration: 'none'
                  }}
                >
                  ADISA OLASHILE
                </Link>
              </div>
            </header>

      <section id="home" className="h-screen relative overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            transform: isTransitioning ? "scale(1.05)" : "scale(1)",
            filter: isTransitioning ? "blur(2px)" : "blur(0px)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20">
          <p className="text-white/80 mb-4 text-sm">Scroll to discover more</p>
          <svg
            className="w-6 h-6 text-white animate-bounce mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

<section id="portfolio" className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl text-black mb-6 font-light tracking-wider">PORTFOLIO</h2>
      <div className="w-24 h-1 bg-gray-800 mx-auto mb-8"></div>
      <p className="text-[10px] text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
        A curated collection of moments captured through my lens, showcasing the artistry and technical excellence 
        that defines my photography approach.
      </p>
    </div>

    {/* Only show first 3 portfolio items */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 justify-items-center">
      {portfolioItems.slice(0, 3).map((item, index) => (
        <div
          key={index}
          className="group overflow-hidden rounded-none shadow-md hover:shadow-xl transition-all duration-700 relative bg-black w-full max-w-md"
        >
          <div className="relative overflow-hidden h-96">
            {/* Image with overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Content that appears on hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {/* <span className="text-xs tracking-widest text-gray-300 mb-2">{item.category}</span>
              <h3 className="text-xl font-normal mb-2 tracking-wide">{item.title}</h3> */}
              
              <Link
                to={`/portfolio/${item.id}`}
                className="self-start text-white text-xs border border-white/40 hover:border-white px-3 py-2 tracking-widest transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
              >
                VIEW PROJECT
              </Link>
            </div>
            
            {/* Minimalist title that's always visible */}
            <div className="absolute bottom-4 left-4 z-15">
              <h3 className="text-white text-lg font-light tracking-wide">{item.title}</h3>
              <span className="text-xs text-gray-300">{item.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center">
      <Link to="/portfolio">
        <button className="bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-none text-sm tracking-widest transition-all duration-300 font-light">
          VIEW FULL PORTFOLIO
        </button>
      </Link>
    </div>
  </div>
</section>
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300 mb-6">Capturing moments, creating memories, telling stories through the lens.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            
          </div>
          <p className="copyright">© 2025 Adisa Olashile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}