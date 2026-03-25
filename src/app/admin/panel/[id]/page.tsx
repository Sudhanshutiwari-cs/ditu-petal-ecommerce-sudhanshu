'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface Banner {
  id: string
  name: string
  background_color: string | null
  image: string | null
  description: string | null
  heading: string | null  // Changed from array to single string
  side_text: string | null
  vertical_text: string | null
  created_at: string | null
  updated_at: string | null
}

export default function ViewBannerPage() {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchBanner()
  }, [id])

  const fetchBanner = async () => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setBanner(data)
    } catch (error) {
      console.error('Error fetching banner:', error)
      alert('Error fetching banner')
      router.push('/admin/panel')
    } finally {
      setLoading(false)
    }
  }

  // Function to strip HTML tags for plain text display
  const stripHtml = (html: string) => {
    if (!html) return ''
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading banner...</p>
        </div>
      </div>
    )
  }

  if (!banner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Banner not found</p>
          <Link href="/admin/panel" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Back to Banners
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/panel"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{banner.name}</h1>
                <p className="text-sm text-gray-600 mt-1">View banner configuration</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/admin/panel/${id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Banner
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Preview Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="h-64 relative"
              style={{ backgroundColor: banner.background_color || '#f3f4f6' }}
            >
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Basic Information
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Banner Name</label>
                  <p className="font-medium">{banner.name}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: banner.background_color || '#ffffff' }}
                    />
                    <p className="font-medium">{banner.background_color || '#ffffff'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Banner Eyebrow</label>
                  <p className="font-medium whitespace-pre-wrap">{banner.description || 'No description provided'}</p>
                </div>
              </div>
            </div>

            {/* Main Heading with Rich Text */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Main Heading
              </h2>
              
              <div>
                {banner.heading ? (
                  <div className="prose max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ __html: banner.heading }}
                      className="rich-text-content"
                    />
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <label className="text-xs text-gray-400">HTML Preview</label>
                      <details className="mt-1">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                          Show HTML source
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                          <code>{banner.heading}</code>
                        </pre>
                      </details>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No heading provided</p>
                )}
              </div>
            </div>

            {/* Additional Text */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Additional Background Overlay Text
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Side Text</label>
                  <p className="font-medium whitespace-pre-wrap">{banner.side_text || 'No side text provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Vertical Text</label>
                  <p className="font-medium whitespace-pre-wrap">{banner.vertical_text || 'No vertical text provided'}</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Metadata
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Created At</label>
                  <p className="font-medium">
                    {banner.created_at ? new Date(banner.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Last Updated</label>
                  <p className="font-medium">
                    {banner.updated_at ? new Date(banner.updated_at).toLocaleString() : 'N/A'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-gray-500">Banner ID</label>
                  <p className="font-medium text-sm text-gray-600 font-mono">{banner.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add styles for rich text content */}
      <style jsx global>{`
        .rich-text-content {
          line-height: 1.6;
          color: #374151;
        }
        .rich-text-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        .rich-text-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        .rich-text-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        .rich-text-content h4 {
          font-size: 1em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        .rich-text-content p {
          margin-bottom: 1em;
        }
        .rich-text-content strong {
          font-weight: bold;
        }
        .rich-text-content em {
          font-style: italic;
        }
        .rich-text-content u {
          text-decoration: underline;
        }
        .rich-text-content ul, .rich-text-content ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        .rich-text-content ul {
          list-style-type: disc;
        }
        .rich-text-content ol {
          list-style-type: decimal;
        }
        .rich-text-content li {
          margin-bottom: 0.25em;
        }
        .rich-text-content a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .rich-text-content a:hover {
          color: #2563eb;
        }
        .rich-text-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        .rich-text-content table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1em;
        }
        .rich-text-content table td, .rich-text-content table th {
          border: 1px solid #e5e7eb;
          padding: 0.5em;
        }
        .rich-text-content table th {
          background-color: #f9fafb;
          font-weight: bold;
        }
        .rich-text-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .rich-text-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 6px;
          overflow-x: auto;
          margin-bottom: 1em;
        }
        .rich-text-content pre code {
          background-color: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  )
}