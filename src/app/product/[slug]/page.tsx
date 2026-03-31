"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { createClient } from '@/lib/supabase/client'

// Star Icon Component
function StarIcon({ filled = true, size = 16 }: { filled?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#F5A623" : "none"}
      stroke={filled ? "#F5A623" : "#D1D5DB"}
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// Heart Icon
function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

// Share Icon
function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

// Chevron Icons
function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// Cart Icon Component
function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

// Product Card Component
function ProductCard({
  image,
  brand,
  price,
  name,
  rating,
  sold,
  slug,
}: {
  image: string
  brand: string
  price: number
  name: string
  rating: number
  sold: number
  slug?: string
}) {
  return (
    <Link href={`/product/${slug}`} className="flex-shrink-0 w-48 group cursor-pointer">
      <div className="bg-neutral-100 rounded-lg overflow-hidden mb-3 aspect-[3/4] group-hover:opacity-90 transition-opacity">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-sm font-medium text-neutral-900">{brand}</p>
      <p className="text-lg font-bold text-neutral-900">${price}</p>
      <p className="text-sm text-neutral-600 line-clamp-2">{name}</p>
      <div className="flex items-center gap-2 mt-1">
        <StarIcon size={14} />
        <span className="text-sm text-neutral-600">{rating}</span>
        <span className="text-sm text-neutral-400">·</span>
        <span className="text-sm text-neutral-600">{sold.toLocaleString()} Sold</span>
      </div>
    </Link>
  )
}

// Review Rating Bar Component
function RatingBar({ rating, count, total }: { rating: number; count: number; total: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-sm text-neutral-600">{rating}.0</span>
      <StarIcon size={14} />
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-900 rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className="w-12 text-sm text-neutral-600 text-right">{count}</span>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#3d2a2a] text-[#d4c4b5]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Brand Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#d4c4b5] flex items-center justify-center">
                <span className="text-[#d4c4b5] font-serif text-base lg:text-lg">D</span>
              </div>
              <div>
                <h2 className="text-white font-medium text-base lg:text-lg">DituPetal</h2>
                <p className="text-[#a89585] text-[10px] lg:text-xs tracking-widest uppercase">
                  Boutique
                </p>
              </div>
            </div>
            <p className="text-[#a89585] text-xs lg:text-sm leading-relaxed">
              From the heart of the city, we pour passion into every petal,
              crafting beautiful floral stories for every occasion. Your
              cherished local flower shop, dedicated to delivering fresh beauty
              and joy, around the clock.
            </p>
            <div className="flex gap-2 lg:gap-3">
              {[
                { href: "#", icon: "comment" },
                { href: "#", icon: "instagram" },
                { href: "#", icon: "location" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#5a4545] flex items-center justify-center hover:bg-[#6a5555] transition-colors"
                >
                  {social.icon === "comment" && (
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-[#d4c4b5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-[#d4c4b5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        strokeWidth={1.5}
                      />
                      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                      <circle cx="18" cy="6" r="1" fill="currentColor" />
                    </svg>
                  )}
                  {social.icon === "location" && (
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-[#d4c4b5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-medium text-base lg:text-lg mb-4 lg:mb-6">Shop</h3>
            <ul className="space-y-2 lg:space-y-3">
              {[
                "All Bouquets",
                "Artificial Bouquets",
                "Roses Collection",
                "Mixed Bouquets",
                "Premium Collection",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#a89585] hover:text-white transition-colors text-xs lg:text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-medium text-base lg:text-lg mb-4 lg:mb-6">Services</h3>
            <ul className="space-y-2 lg:space-y-3">
              {[
                "Our Services",
                "Custom Bouquet",
                "Delivery Service",
                "Event Decoration",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#a89585] hover:text-white transition-colors text-xs lg:text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium text-base lg:text-lg mb-4 lg:mb-6">Contact</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li className="flex items-start gap-2 lg:gap-3">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-[#a89585] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[#a89585] text-xs lg:text-sm">
                  Jalan Teuku Umar No.43,
                  <br />
                  Denpasar Barat
                </span>
              </li>
              <li className="flex items-center gap-2 lg:gap-3">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-[#a89585] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:ditupetal26@gmail.com"
                  className="text-[#a89585] text-xs lg:text-sm hover:text-white transition-colors break-all"
                >
                  ditupetal26@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 lg:gap-3">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 text-[#a89585] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+6287825830959"
                  className="text-[#a89585] text-xs lg:text-sm hover:text-white transition-colors"
                >
                  +62 878 2583 0959
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#5a4545]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-5 flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4">
          <p className="text-[#a89585] text-xs lg:text-sm text-center md:text-left">
            © 2026 DituPetal. All rights reserved.
          </p>
          <div className="flex gap-4 lg:gap-8">
            <Link
              href="#"
              className="text-[#a89585] text-xs lg:text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[#a89585] text-xs lg:text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 lg:px-8 lg:py-6 bg-[#3d2a2a]"
    >
      <div className="relative mx-auto flex max-w-[1800px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="https://wuwjfagcfhowbwqwujka.supabase.co/storage/v1/object/public/website-assets/Black_White_Minimalist_Beauty_Typography_Logo_20260302_154544_0000-removebg-preview.png"
            alt="DituPetal Logo"
            className="h-20 lg:h-15 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 lg:flex">
          <Link href="/" className="text-sm tracking-wide text-white/90 transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/bouquets" className="text-sm tracking-wide text-white/90 transition-colors hover:text-white">
            Bouquets
          </Link>
          <Link href="/hampers" className="text-sm tracking-wide text-white/90 transition-colors hover:text-white">
            Hampers
          </Link>
          <Link href="/about" className="text-sm tracking-wide text-white/90 transition-colors hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-sm tracking-wide text-white/90 transition-colors hover:text-white">
            Contact
          </Link>
        </div>

        {/* Right Icons */}
        <div className="hidden items-center space-x-6 lg:flex">
          <Link
            href="/search"
            className="text-white/90 transition-colors hover:text-white"
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>

          <Link
            href="/login"
            className="text-white/90 transition-colors hover:text-white"
            aria-label="Account"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <Link
            href="/cart"
            className="text-white/90 transition-colors hover:text-white"
            aria-label="Cart"
          >
            <CartIcon />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 flex h-8 w-8 lg:hidden flex-col items-center justify-center space-y-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 transform bg-white transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 transform bg-white transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-[#3d2a2a] transition-transform duration-500 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl tracking-wide text-white/90 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/bouquets"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl tracking-wide text-white/90 transition-colors hover:text-white"
          >
            Bouquets
          </Link>
          <Link
            href="/hampers"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl tracking-wide text-white/90 transition-colors hover:text-white"
          >
            Hampers
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl tracking-wide text-white/90 transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl tracking-wide text-white/90 transition-colors hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Main Product Page Component
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [popularProducts, setPopularProducts] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [slug, setSlug] = useState<string | null>(null)
  const [navbarHeight, setNavbarHeight] = useState(80)
  const navbarRef = useRef<HTMLElement>(null)

  const supabase = createClient()

  // Measure navbar height
  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight)
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Unwrap params Promise
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params
      setSlug(unwrappedParams.slug)
    }
    unwrapParams()
  }, [params])

  // Fetch product by slug
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return
      
      try {
        setLoading(true)
        
        // Fetch the main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select(`
            *,
            category:category_id (
              id,
              name,
              slug
            ),
            sub_category:sub_category_id (
              id,
              name,
              slug
            ),
            child_category:child_category_id (
              id,
              name,
              slug
            )
          `)
          .eq('slug', slug)
          .single()

        if (productError) throw productError
        if (!productData) throw new Error('Product not found')

        setProduct(productData)

        // Fetch related products (same category, excluding current product)
        if (productData.category_id) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', productData.category_id)
            .eq('is_active', true)
            .neq('id', productData.id)
            .limit(10)

          if (!relatedError && relatedData) {
            setRelatedProducts(relatedData)
          }
        }

        // Fetch popular products (featured products)
        const { data: popularData, error: popularError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('is_featured', true)
          .neq('id', productData.id)
          .limit(10)

        if (!popularError && popularData) {
          setPopularProducts(popularData)
        }

      } catch (err: any) {
        console.error('Error fetching product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug, supabase])

  // Parse color options from the product
  const getColorOptions = () => {
    if (product?.color) {
      try {
        // If color is stored as JSON string
        if (typeof product.color === 'string' && product.color.startsWith('{')) {
          const colors = JSON.parse(product.color)
          return colors
        }
        // If color is stored as comma-separated values
        if (typeof product.color === 'string' && product.color.includes(',')) {
          return product.color.split(',').map((c: string, i: number) => ({
            name: c.trim(),
            color: getColorHex(c.trim())
          }))
        }
        // If single color value
        return [{ name: product.color || 'Default', color: getColorHex(product.color) }]
      } catch {
        return [{ name: product.color || 'Default', color: '#4A4A3A' }]
      }
    }
    return []
  }

  // Helper to get hex color from color name
  const getColorHex = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Royal Brown': '#4A4A3A',
      'Beige': '#D4C4B0',
      'Blue': '#2D5A7B',
      'Black': '#1A1A1A',
      'White': '#FFFFFF',
      'Red': '#E34234',
      'Green': '#4C6A3B',
      'Gray': '#808080',
      'Navy': '#000080',
      'Khaki': '#C3B091',
      'Brown': '#8B4513'
    }
    return colorMap[colorName] || '#4A4A3A'
  }

  // Parse size options from the product
  const getSizeOptions = () => {
    if (product?.size) {
      try {
        if (typeof product.size === 'string' && product.size.includes(',')) {
          return product.size.split(',').map((s: string) => s.trim())
        }
        return [product.size]
      } catch {
        return []
      }
    }
    return []
  }

  // Get thumbnails array
  const getThumbnails = () => {
    const thumbnails = []
    if (product?.thumbnail) thumbnails.push(product.thumbnail)
    if (product?.hero_image_1) thumbnails.push(product.hero_image_1)
    if (product?.hero_image_2) thumbnails.push(product.hero_image_2)
    if (product?.hero_image_3) thumbnails.push(product.hero_image_3)
    return thumbnails.length > 0 ? thumbnails : ['/api/placeholder/600/800']
  }

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (product?.compare_price && product?.price) {
      const discount = ((product.compare_price - product.price) / product.compare_price) * 100
      return Math.round(discount)
    }
    return 0
  }

  // Add to cart function
  const addToCart = async () => {
    if (!product || product.stock === 0 || !slug) return
    
    setAddingToCart(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Redirect to login or show login modal
        window.location.href = '/login?redirect=/product/' + slug
        return
      }

      const { error: cartError } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: quantity,
          selected_color: getColorOptions()[selectedColor]?.name,
          selected_size: getSizeOptions()[selectedSize]
        })

      if (cartError) throw cartError
      
      alert('Product added to cart!')
    } catch (err) {
      console.error('Error adding to cart:', err)
      alert('Failed to add product to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  // Get review stats (you should fetch this from a reviews table)
  const reviewStats = {
    average: 4.5,
    total: 1250,
    breakdown: [
      { rating: 5, count: 823 },
      { rating: 4, count: 338 },
      { rating: 3, count: 74 },
      { rating: 2, count: 12 },
      { rating: 1, count: 3 },
    ],
  }

  const totalReviews = reviewStats.breakdown.reduce((sum, item) => sum + item.count, 0)

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center" style={{ paddingTop: navbarHeight }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center mt-2.5 justify-center"  style={{ paddingTop: navbarHeight }}>
          <div className="text-center max-w-md px-4">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Product Not Found</h1>
            <p className="text-neutral-600 mb-6">{error || 'The product you are looking for does not exist or has been removed.'}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-neutral-900 text-white px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const colorOptions = getColorOptions()
  const sizeOptions = getSizeOptions()
  const thumbnails = getThumbnails()
  const discountPercentage = getDiscountPercentage()

  // Transform products for ProductCard component
  const transformProductForCard = (product: any) => ({
    image: product.thumbnail || '/api/placeholder/400/600',
    brand: product.category?.name || 'Product',
    price: product.price,
    name: product.name,
    rating: 4.5,
    sold: 0,
    slug: product.slug,
  })

  return (
    <>
      <Header />
      <div className="min-h-screen  bg-white" style={{ paddingTop: navbarHeight }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center mt-3 gap-2 text-sm text-neutral-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-neutral-900 cursor-pointer">Homepage</Link>
            <span>{">"}</span>
            {product.category && (
              <>
                <Link href={`/category/${product.category.slug}`} className="hover:text-neutral-900 cursor-pointer">
                  {product.category.name}
                </Link>
                <span>{">"}</span>
              </>
            )}
            {product.sub_category && (
              <>
                <Link href={`/category/${product.category?.slug}/${product.sub_category.slug}`} className="hover:text-neutral-900 cursor-pointer">
                  {product.sub_category.name}
                </Link>
                <span>{">"}</span>
              </>
            )}
            <span className="text-neutral-900 font-medium line-clamp-1">{product.name}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden">
                  <img
                    src={thumbnails[currentImage] || '/api/placeholder/600/800'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                {thumbnails.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {thumbnails.map((thumb, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          currentImage === index ? "border-neutral-900" : "border-transparent"
                        }`}
                      >
                        <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Action Buttons & Navigation */}
              <div className="flex flex-col gap-3">
                <button className="w-12 h-12 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors">
                  <ShareIcon />
                </button>
                <button className="w-12 h-12 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors">
                  <HeartIcon />
                </button>
                <div className="flex-1" />
                <button 
                  onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : thumbnails.length - 1))}
                  className="w-12 h-12 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <ChevronLeft />
                </button>
                <button 
                  onClick={() => setCurrentImage((prev) => (prev < thumbnails.length - 1 ? prev + 1 : 0))}
                  className="w-12 h-12 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <p className="text-sm text-neutral-500 mb-2">
                {product.category?.name || product.sub_category?.name || 'Product'}
              </p>
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">{product.name}</h1>

              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {product.compare_price && (
                    <span className="text-neutral-400 line-through">${product.compare_price.toFixed(2)}</span>
                  )}
                  <span className="text-2xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                  {discountPercentage > 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <StarIcon size={18} />
                  <span className="font-semibold text-neutral-900">{reviewStats.average}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-neutral-200 my-6" />

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-900 mb-2">Description:</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Short Description */}
              {product.short_description && !product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-900 mb-2">Description:</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {product.short_description}
                  </p>
                </div>
              )}

              {/* Additional Specifications */}
              {(product.material || product.weight_kg || product.height_cm || product.diameter_cm || product.suitable_for) && (
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-900 mb-2">Specifications:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {product.material && (
                      <div>
                        <span className="text-neutral-500">Material:</span>
                        <span className="text-neutral-900 ml-2">{product.material}</span>
                      </div>
                    )}
                    {product.weight_kg && (
                      <div>
                        <span className="text-neutral-500">Weight:</span>
                        <span className="text-neutral-900 ml-2">{product.weight_kg} kg</span>
                      </div>
                    )}
                    {product.height_cm && (
                      <div>
                        <span className="text-neutral-500">Height:</span>
                        <span className="text-neutral-900 ml-2">{product.height_cm} cm</span>
                      </div>
                    )}
                    {product.diameter_cm && (
                      <div>
                        <span className="text-neutral-500">Diameter:</span>
                        <span className="text-neutral-900 ml-2">{product.diameter_cm} cm</span>
                      </div>
                    )}
                    {product.suitable_for && (
                      <div>
                        <span className="text-neutral-500">Suitable For:</span>
                        <span className="text-neutral-900 ml-2">{product.suitable_for}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {colorOptions.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-neutral-600 mb-3">
                    Color: <span className="font-semibold text-neutral-900">{colorOptions[selectedColor]?.name}</span>
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {colorOptions.map((color: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-14 h-10 rounded-lg transition-all ${
                          selectedColor === index ? "ring-2 ring-offset-2 ring-neutral-900" : ""
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizeOptions.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-neutral-600">
                      Size: <span className="font-semibold text-neutral-900">{sizeOptions[selectedSize]}</span>
                    </p>
                    <button className="text-sm text-neutral-900 underline">View Size Chart</button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {sizeOptions.map((size: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`w-14 h-12 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === index
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 text-neutral-900 hover:border-neutral-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="text-sm text-neutral-600 mb-2 block">Quantity:</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 border border-neutral-200 rounded-lg flex items-center justify-center hover:bg-neutral-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={addToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`flex-1 py-4 rounded-lg font-semibold transition-colors ${
                    product.stock > 0 && !addingToCart
                      ? "bg-neutral-900 text-white hover:bg-neutral-800"
                      : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  {addingToCart ? "Adding..." : (product.stock > 0 ? "Add To Cart" : "Out of Stock")}
                </button>
                {product.stock > 0 && (
                  <button className="flex-1 border-2 border-neutral-900 text-neutral-900 py-4 rounded-lg font-semibold hover:bg-neutral-50 transition-colors">
                    Checkout Now
                  </button>
                )}
              </div>

              <button className="text-sm text-neutral-600 underline">Delivery T&C</button>
            </div>
          </div>

          {/* Product Reviews Section */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Product Reviews</h2>
            <div className="border border-neutral-200 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Circle */}
                <div className="flex items-center gap-6">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        fill="none"
                        stroke="#E5E5E5"
                        strokeWidth="6"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        fill="none"
                        stroke="#F5A623"
                        strokeWidth="6"
                        strokeDasharray={`${(reviewStats.average / 5) * 314} 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-neutral-900">{reviewStats.average}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(reviewStats.average)} size={18} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">from {(reviewStats.total / 1000).toFixed(2)}k reviews</p>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="flex-1 space-y-3">
                  {reviewStats.breakdown.map((item) => (
                    <RatingBar
                      key={item.rating}
                      rating={item.rating}
                      count={item.count}
                      total={totalReviews}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Products Section */}
          {popularProducts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Popular this week</h2>
                <Link href="/products/popular" className="text-sm text-neutral-600 underline hover:text-neutral-900">
                  View All
                </Link>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {popularProducts.map((product, index) => (
                  <ProductCard key={index} {...transformProductForCard(product)} />
                ))}
              </div>
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Related Products</h2>
                <Link href={`/category/${product.category?.slug}`} className="text-sm text-neutral-600 underline hover:text-neutral-900">
                  View All
                </Link>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={index} {...transformProductForCard(product)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}