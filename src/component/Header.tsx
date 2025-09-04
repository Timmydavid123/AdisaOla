"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Header({ isDarkBackground = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Portfolio", href: "/portfolio" },
        { name: "Exhibition", href: "/exhibition" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (menuRef.current && !menuRef.current.contains(target) && 
          !target.closest(".menu-toggle")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Header */}
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

      {/* Menu Toggle Button */}
      <div 
        className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span style={{ background: isDarkBackground ? "white" : "black" }}></span>
        <span style={{ background: isDarkBackground ? "white" : "black" }}></span>
        <span style={{ background: isDarkBackground ? "white" : "black" }}></span>
      </div>

      {/* Sidebar Navigation */}
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

      {/* Local Styles */}
      <style>{`
        /* Header style - Fully transparent */
        .faulkner-header {
          width: 100%;
          padding: 1.5rem 0;
          background: transparent;
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 2rem;
          pointer-events: auto;
        }

        .header-name {
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: opacity 0.3s ease;
          text-shadow: ${isDarkBackground 
            ? '0 1px 2px rgba(0, 0, 0, 2.5)' 
            : '0 1px 2px rgba(0, 0, 0, 2.3)'};
        }

        .header-name:hover {
          opacity: 1.8;
        }

        /* Menu Toggle - With background color */
        .menu-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 40px;
          height: 40px;
          z-index: 1001;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          padding: 8px;
          transition: all 0.3s ease;
          background: ${isDarkBackground ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .menu-toggle span {
          display: block;
          width: 24px;
          height: 2px;
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

        /* Sidebar */
        .sidebar-nav {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100vh;
          background: rgba(17, 24, 39, 0.98);
          backdrop-filter: blur(10px);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 6rem 2rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .sidebar-nav.open {
          transform: translateX(0);
        }

        .sidebar-nav::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
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
          content: "";
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
    </>
  )
}