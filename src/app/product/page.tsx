"use client";

// app/products/page.tsx
// Client-side products listing with Supabase and real-time updates

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  category_id: string | null;
  price: number;
  compare_price: number | null;
  stock: number | null;
  material: string | null;
  color: string | null;
  size: string | null;
  height_cm: number | null;
  diameter_cm: number | null;
  drainage_hole: boolean | null;
  suitable_for: string | null;
  weight_kg: number | null;
  thumbnail: string;
  hero_image_1: string | null;
  hero_image_2: string | null;
  hero_image_3: string | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  sub_category_id: string | null;
  child_category_id: string | null;
};

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products from Supabase
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (supabaseError) {
          throw new Error(supabaseError.message);
        }
        
        setProducts(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Optional: Set up real-time subscription for product updates
    const subscription = supabase
      .channel('products_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
          filter: 'is_active=eq.true',
        },
        (payload) => {
          console.log('Product changed:', payload);
          // Refetch products when changes occur
          fetchProducts();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const activeProducts = products.filter((product) => product.is_active !== false);

  // Format price in INR
  const formatINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Rest of the component remains the same...
  // (Include the same JSX and styles from the previous version)
  
  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Our Products</h1>
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading products...</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            text-align: center;
          }
          .loader {
            width: 50px;
            height: 50px;
            border: 3px solid #e2e8f0;
            border-top-color: #2c5f2d;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 1rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loading-container p {
            color: #5a6e7c;
            font-size: 1rem;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="title">Our Products</h1>
        <div className="error-container">
          <p className="error-message">⚠️ Error: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
        <style jsx>{`
          .error-container {
            text-align: center;
            padding: 3rem;
          }
          .error-message {
            color: #e53e3e;
            margin-bottom: 1rem;
            font-size: 1rem;
          }
          .retry-button {
            padding: 0.5rem 1.5rem;
            background: #2c5f2d;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background 0.2s ease;
          }
          .retry-button:hover {
            background: #1f4520;
          }
        `}</style>
      </div>
    );
  }

  if (!activeProducts.length) {
    return (
      <div className="container">
        <h1 className="title">Our Products</h1>
        <p className="no-products">No products available at the moment. Please check back soon!</p>
        <style jsx>{`
          .no-products {
            text-align: center;
            color: #5a6e7c;
            padding: 3rem;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Our Products</h1>
      <p className="subtitle">Discover our beautiful collection of planters and pots</p>
      
      <div className="grid">
        {activeProducts.map((product) => (
          <Link href={`/product/${product.slug}`} key={product.id} className="card-link">
            <div className="card">
              <div className="image-wrapper">
                <img src={product.thumbnail} alt={product.name} className="product-image" loading="lazy" />
                {product.is_featured && <span className="featured-badge">Featured</span>}
                {product.compare_price && product.compare_price > product.price && (
                  <span className="sale-badge">Sale</span>
                )}
              </div>
              
              <div className="card-content">
                <h2 className="product-name">{product.name}</h2>
                {product.short_description && (
                  <p className="short-description">{product.short_description}</p>
                )}
                
                <div className="price-section">
                  <span className="current-price">
                    {formatINR(typeof product.price === 'string' ? parseFloat(product.price) : product.price)}
                  </span>
                  {product.compare_price && product.compare_price > product.price && (
                    <span className="compare-price">
                      {formatINR(typeof product.compare_price === 'string' ? parseFloat(product.compare_price) : product.compare_price)}
                    </span>
                  )}
                </div>
                
                <div className="product-details">
                  {product.material && <span className="detail-badge">{product.material}</span>}
                  {product.color && <span className="detail-badge">{product.color}</span>}
                  {product.height_cm && <span className="detail-badge">{product.height_cm}cm</span>}
                  {product.drainage_hole && <span className="detail-badge">Drainage Hole</span>}
                </div>
                
                <div className="stock-info">
                  {product.stock !== null && product.stock > 0 ? (
                    <span className="in-stock">✓ In Stock ({product.stock})</span>
                  ) : (
                    <span className="out-of-stock">✗ Out of Stock</span>
                  )}
                </div>
                
                <div className="view-button">View Product →</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a2a3a;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          text-align: center;
          color: #5a6e7c;
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .card-link {
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-link:hover {
          transform: translateY(-4px);
        }
        .card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.2s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-link:hover .card {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .image-wrapper {
          position: relative;
          padding-top: 100%;
          overflow: hidden;
          background: #f5f5f5;
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card-link:hover .product-image {
          transform: scale(1.05);
        }
        .featured-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ff6b35;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 1;
        }
        .sale-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #e53e3e;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 1;
        }
        .card-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a2a3a;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }
        .short-description {
          font-size: 0.875rem;
          color: #5a6e7c;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .price-section {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .current-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c5f2d;
        }
        .compare-price {
          font-size: 1rem;
          color: #a0aec0;
          text-decoration: line-through;
        }
        .product-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .detail-badge {
          background: #edf2f7;
          color: #2d3748;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
        }
        .stock-info {
          margin-bottom: 1rem;
          font-size: 0.75rem;
        }
        .in-stock {
          color: #2c7a4b;
          font-weight: 500;
        }
        .out-of-stock {
          color: #c53030;
          font-weight: 500;
        }
        .view-button {
          margin-top: auto;
          text-align: center;
          padding: 0.625rem;
          background: #f7fafc;
          color: #2c5f2d;
          font-weight: 600;
          border-radius: 8px;
          transition: background 0.2s ease;
          font-size: 0.875rem;
        }
        .card-link:hover .view-button {
          background: #2c5f2d;
          color: white;
        }
        @media (max-width: 640px) {
          .container {
            padding: 1rem;
          }
          .title {
            font-size: 1.75rem;
          }
          .grid {
            gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}