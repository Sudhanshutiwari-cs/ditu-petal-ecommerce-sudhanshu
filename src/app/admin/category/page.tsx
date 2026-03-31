// app/admin/categories/page.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ParentCategory {
  id: string
  name: string
  slug: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  created_at: string
}

interface SubCategory {
  id: string
  category_id: string
  name: string
  slug: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  created_at: string
}

interface ChildCategory {
  id: string
  category_id: string
  sub_category_id: string
  name: string
  slug: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  created_at: string
}

interface CategoryWithChildren extends ParentCategory {
  subCategories?: (SubCategory & { childCategories?: ChildCategory[] })[]
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithChildren[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set())
  
  const supabase = createClient()
  const router = useRouter()

  // Fetch all categories with their sub-categories and child categories
  const fetchAllCategories = async () => {
    try {
      setLoading(true)
      
      // Fetch parent categories
      const { data: parentCategories, error: parentError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

      if (parentError) throw parentError

      // Fetch all sub categories
      const { data: subCategories, error: subError } = await supabase
        .from('sub_categories')
        .select('*')
        .order('name', { ascending: true })

      if (subError) throw subError

      // Fetch all child categories
      const { data: childCategories, error: childError } = await supabase
        .from('child_categories')
        .select('*')
        .order('name', { ascending: true })

      if (childError) throw childError

      // Build the hierarchical structure
      const categoriesWithChildren = (parentCategories || []).map(parent => {
        const subCategoriesForParent = (subCategories || [])
          .filter(sub => sub.category_id === parent.id)
          .map(sub => ({
            ...sub,
            childCategories: (childCategories || [])
              .filter(child => child.sub_category_id === sub.id)
          }))
        
        return {
          ...parent,
          subCategories: subCategoriesForParent
        }
      })

      setCategories(categoriesWithChildren)
    } catch (error) {
      console.error('Error fetching categories:', error)
      alert('Error fetching categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  // Delete category based on type
  const handleDelete = async () => {
    if (!deleteConfirm) return

    try {
      let error = null

      if (deleteConfirm.type === 'parent') {
        // Check if parent has sub-categories
        const { data: subCategories, error: checkError } = await supabase
          .from('sub_categories')
          .select('id')
          .eq('category_id', deleteConfirm.id)

        if (checkError) throw checkError

        if (subCategories && subCategories.length > 0) {
          alert('Cannot delete parent category with existing sub-categories. Please delete sub-categories first.')
          setDeleteConfirm(null)
          return
        }

        const { error: deleteError } = await supabase
          .from('categories')
          .delete()
          .eq('id', deleteConfirm.id)
        error = deleteError
      } 
      else if (deleteConfirm.type === 'sub') {
        // Check if sub-category has child categories
        const { data: childCategories, error: checkError } = await supabase
          .from('child_categories')
          .select('id')
          .eq('sub_category_id', deleteConfirm.id)

        if (checkError) throw checkError

        if (childCategories && childCategories.length > 0) {
          alert('Cannot delete sub-category with existing child categories. Please delete child categories first.')
          setDeleteConfirm(null)
          return
        }

        const { error: deleteError } = await supabase
          .from('sub_categories')
          .delete()
          .eq('id', deleteConfirm.id)
        error = deleteError
      }
      else if (deleteConfirm.type === 'child') {
        const { error: deleteError } = await supabase
          .from('child_categories')
          .delete()
          .eq('id', deleteConfirm.id)
        error = deleteError
      }

      if (error) throw error

      alert(`${deleteConfirm.type === 'parent' ? 'Category' : deleteConfirm.type === 'sub' ? 'Sub-category' : 'Child category'} deleted successfully`)
      setDeleteConfirm(null)
      fetchAllCategories()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error deleting category')
    }
  }

  // Toggle parent category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  // Toggle sub-category expansion
  const toggleSubCategory = (subCategoryId: string) => {
    const newExpanded = new Set(expandedSubCategories)
    if (newExpanded.has(subCategoryId)) {
      newExpanded.delete(subCategoryId)
    } else {
      newExpanded.add(subCategoryId)
    }
    setExpandedSubCategories(newExpanded)
  }

  // Filter categories based on search
  const filterCategories = (categories: CategoryWithChildren[]): CategoryWithChildren[] => {
    if (!searchTerm) return categories

    const searchTermLower = searchTerm.toLowerCase()
    
    return categories.filter(category => {
      // Check if parent category matches
      const parentMatches = 
        category.name.toLowerCase().includes(searchTermLower) ||
        category.slug.toLowerCase().includes(searchTermLower) ||
        (category.description?.toLowerCase() || '').includes(searchTermLower) ||
        (category.seo_title?.toLowerCase() || '').includes(searchTermLower)

      // Check if any sub-category matches
      const hasMatchingSub = category.subCategories?.some(sub => 
        sub.name.toLowerCase().includes(searchTermLower) ||
        sub.slug.toLowerCase().includes(searchTermLower) ||
        (sub.description?.toLowerCase() || '').includes(searchTermLower) ||
        sub.childCategories?.some(child =>
          child.name.toLowerCase().includes(searchTermLower) ||
          child.slug.toLowerCase().includes(searchTermLower)
        )
      )

      return parentMatches || hasMatchingSub
    })
  }

  const filteredCategories = filterCategories(categories)

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <Link
            href="/admin/categories/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New Category
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search categories, sub-categories, or child categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Tree View */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No categories found
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Parent Category Header */}
                  <div className="bg-gray-50 p-4 flex justify-between items-center hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="mr-3 text-gray-500 hover:text-gray-700"
                      >
                        {expandedCategories.has(category.id) ? '▼' : '▶'}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-semibold text-gray-800">{category.name}</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Parent</span>
                          {category.subCategories && category.subCategories.length > 0 && (
                            <span className="text-xs text-gray-500">({category.subCategories.length} sub-categories)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Slug: {category.slug}
                          {category.description && <span className="ml-3">• {category.description}</span>}
                        </div>
                        {category.seo_title && (
                          <div className="text-xs text-gray-400 mt-1">SEO: {category.seo_title}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/categories/edit/${category.id}`}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'parent', id: category.id, name: category.name })}
                        className="text-red-600 hover:text-red-800 px-3 py-1 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Sub Categories (if expanded) */}
                  {expandedCategories.has(category.id) && category.subCategories && category.subCategories.length > 0 && (
                    <div className="ml-8 border-l-2 border-gray-200">
                      {category.subCategories.map((sub) => (
                        <div key={sub.id} className="border-t border-gray-200">
                          <div className="bg-white p-4 flex justify-between items-center hover:bg-gray-50">
                            <div className="flex items-center flex-1">
                              <button
                                onClick={() => toggleSubCategory(sub.id)}
                                className="mr-3 text-gray-500 hover:text-gray-700"
                              >
                                {expandedSubCategories.has(sub.id) && sub.childCategories && sub.childCategories.length > 0 ? '▼' : '▶'}
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <span className="text-md font-medium text-gray-700">{sub.name}</span>
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sub</span>
                                  {sub.childCategories && sub.childCategories.length > 0 && (
                                    <span className="text-xs text-gray-500">({sub.childCategories.length} child categories)</span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Slug: {sub.slug}
                                  {sub.description && <span className="ml-3">• {sub.description}</span>}
                                </div>
                                {sub.seo_title && (
                                  <div className="text-xs text-gray-400 mt-1">SEO: {sub.seo_title}</div>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin/categories/edit/${sub.id}`}
                                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'sub', id: sub.id, name: sub.name })}
                                className="text-red-600 hover:text-red-800 px-3 py-1 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {/* Child Categories (if expanded) */}
                          {expandedSubCategories.has(sub.id) && sub.childCategories && sub.childCategories.length > 0 && (
                            <div className="ml-8 border-l-2 border-gray-200">
                              {sub.childCategories.map((child) => (
                                <div key={child.id} className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center hover:bg-gray-100">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm font-medium text-gray-600">{child.name}</span>
                                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Child</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                      Slug: {child.slug}
                                      {child.description && <span className="ml-3">• {child.description}</span>}
                                    </div>
                                    {child.seo_title && (
                                      <div className="text-xs text-gray-400 mt-1">SEO: {child.seo_title}</div>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Link
                                      href={`/admin/categories/edit/${child.id}`}
                                      className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm"
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      onClick={() => setDeleteConfirm({ type: 'child', id: child.id, name: child.name })}
                                      className="text-red-600 hover:text-red-800 px-3 py-1 text-sm"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete the {deleteConfirm.type} category "{deleteConfirm.name}"? 
                This action cannot be undone.
              </p>
              {deleteConfirm.type === 'parent' && (
                <p className="text-sm text-red-600 mt-2">
                  Note: You cannot delete a parent category that has sub-categories.
                </p>
              )}
              {deleteConfirm.type === 'sub' && (
                <p className="text-sm text-red-600 mt-2">
                  Note: You cannot delete a sub-category that has child categories.
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}