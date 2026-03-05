'use client'

import { useEffect, useState, useCallback } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useDropzone } from 'react-dropzone'

interface Website {
  id: string
  name: string
  hero_banner1: string | null
  hero_banner2: string | null
  hero_banner3: string | null
  hero_banner4: string | null
  hero_banner5: string | null
  created_at: string | null
  updated_at: string | null
}

interface WebsiteFormData {
  name: string
  hero_banner1: File | string | null
  hero_banner2: File | string | null
  hero_banner3: File | string | null
  hero_banner4: File | string | null
  hero_banner5: File | string | null
}

type BannerField =
  | 'hero_banner1'
  | 'hero_banner2'
  | 'hero_banner3'
  | 'hero_banner4'
  | 'hero_banner5'

interface ImageUploadProps {
  currentImage: string | null
  onImageChange: (file: File | null) => void
  label: string
}

function ImageUpload({ currentImage, onImageChange, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage)

  useEffect(() => {
    setPreview(currentImage)
  }, [currentImage])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      onImageChange(selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }, [onImageChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const handleRemove = () => {
    setPreview(null)
    onImageChange(null)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {preview ? (
        <div className="relative">
          <div className="relative h-40 w-full rounded-lg overflow-hidden border border-gray-200">
            <img src={preview} alt={label} className="w-full h-full object-cover"/>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />

          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      )}
    </div>
  )
}

const mapWebsiteToFormData = (website: Website): WebsiteFormData => ({
  name: website.name,
  hero_banner1: website.hero_banner1,
  hero_banner2: website.hero_banner2,
  hero_banner3: website.hero_banner3,
  hero_banner4: website.hero_banner4,
  hero_banner5: website.hero_banner5,
})

export default function WebsitesPage() {

  const [website, setWebsite] = useState<Website | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<WebsiteFormData>({
    name: '',
    hero_banner1: null,
    hero_banner2: null,
    hero_banner3: null,
    hero_banner4: null,
    hero_banner5: null,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchMainWebsite()
  }, [])

  const fetchMainWebsite = async () => {
    try {

      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) {

        if (error.code === 'PGRST116') {
          setWebsite(null)
        } else {
          throw error
        }

      } else {

        setWebsite(data)
        setFormData(mapWebsiteToFormData(data))

      }

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

  }

  const handleImageChange = (field: BannerField, file: File | null) => {

    setFormData(prev => ({
      ...prev,
      [field]: file
    }))

  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {

    try {

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { error } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('website-assets')
        .getPublicUrl(filePath)

      return publicUrl

    } catch (error) {

      console.error(error)
      return null

    }

  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!website) return

    setSaving(true)

    try {

      const updates: Partial<Website> = {
        name: formData.name,
        updated_at: new Date().toISOString()
      }

      for (let i = 1; i <= 5; i++) {

        const field = `hero_banner${i}` as BannerField
        const value = formData[field]

        if (value instanceof File) {

          const url = await uploadImage(value, 'hero_banners')

          if (url) updates[field] = url

        }

        else if (typeof value === 'string') {

          updates[field] = value

        }

        else {

          updates[field] = null

        }

      }

      const { error } = await supabase
        .from('websites')
        .update(updates)
        .eq('id', website.id)

      if (error) throw error

      await fetchMainWebsite()

      alert('Website updated successfully!')

    } catch (error) {

      console.error(error)
      alert('Error updating website')

    } finally {

      setSaving(false)

    }

  }

  const handleReset = () => {

    if (website) {
      setFormData(mapWebsiteToFormData(website))
    }

  }

  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )

  }

  if (!website) {

    return (
      <div className="container mx-auto px-4 py-12">
        No Website Found
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Website Configuration
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-4">
              Basic Information
            </h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              required
            />

          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-6">
              Hero Banners
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <ImageUpload
                currentImage={typeof formData.hero_banner1 === 'string' ? formData.hero_banner1 : null}
                onImageChange={(file) => handleImageChange('hero_banner1', file)}
                label="Hero Banner 1"
              />

              <ImageUpload
                currentImage={typeof formData.hero_banner2 === 'string' ? formData.hero_banner2 : null}
                onImageChange={(file) => handleImageChange('hero_banner2', file)}
                label="Hero Banner 2"
              />

              <ImageUpload
                currentImage={typeof formData.hero_banner3 === 'string' ? formData.hero_banner3 : null}
                onImageChange={(file) => handleImageChange('hero_banner3', file)}
                label="Hero Banner 3"
              />

              <ImageUpload
                currentImage={typeof formData.hero_banner4 === 'string' ? formData.hero_banner4 : null}
                onImageChange={(file) => handleImageChange('hero_banner4', file)}
                label="Hero Banner 4"
              />

              <ImageUpload
                currentImage={typeof formData.hero_banner5 === 'string' ? formData.hero_banner5 : null}
                onImageChange={(file) => handleImageChange('hero_banner5', file)}
                label="Hero Banner 5"
              />

            </div>

          </div>

          <div className="flex justify-end space-x-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border rounded"
            >
              Reset Changes
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}