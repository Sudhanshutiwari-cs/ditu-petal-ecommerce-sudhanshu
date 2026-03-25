"use client"

import { useState, useEffect } from "react"
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
    <a href={`/product/${slug}`} className="flex-shrink-0 w-48 group cursor-pointer">
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
    </a>
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

  const supabase = createClient()

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6 flex-wrap">
          <a href="/" className="hover:text-neutral-900 cursor-pointer">Homepage</a>
          <span>{">"}</span>
          {product.category && (
            <>
              <a href={`/category/${product.category.slug}`} className="hover:text-neutral-900 cursor-pointer">
                {product.category.name}
              </a>
              <span>{">"}</span>
            </>
          )}
          {product.sub_category && (
            <>
              <a href={`/category/${product.category?.slug}/${product.sub_category.slug}`} className="hover:text-neutral-900 cursor-pointer">
                {product.sub_category.name}
              </a>
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
              <a href="/products/popular" className="text-sm text-neutral-600 underline hover:text-neutral-900">
                View All
              </a>
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
              <a href={`/category/${product.category?.slug}`} className="text-sm text-neutral-600 underline hover:text-neutral-900">
                View All
              </a>
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
  )
}