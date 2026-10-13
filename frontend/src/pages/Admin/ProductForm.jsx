import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  updateProduct,
  fetchAllProducts,
} from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { FaSave, FaTimes } from 'react-icons/fa'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products, submitting } = useSelector((state) => state.admin)
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'sambrani',
    price: '',
    stock: '',
    isActive: true,
    isFeatured: false,
  })
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (isEditing && products.length === 0) {
      dispatch(fetchAllProducts())
    }
    if (isEditing) {
      const product = products.find((p) => p._id === id)
      if (product) {
        setFormData({
          name: product.name || '',
          description: product.description || '',
          category: product.category || 'sambrani',
          price: product.price || '',
          stock: product.stock || '',
          isActive: product.isActive ?? true,
          isFeatured: product.isFeatured ?? false,
        })
        setImageUrl(product.images?.[0]?.url || '')
      }
    }
  }, [id, products, isEditing, dispatch])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill all required fields')
      return
    }

    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
      images: imageUrl ? [{ url: imageUrl }] : [],
    }

    try {
      if (isEditing) {
        await dispatch(updateProduct({ id, productData: data })).unwrap()
        toast.success('Product updated successfully')
      } else {
        await dispatch(createProduct(data)).unwrap()
        toast.success('Product created successfully')
      }
      navigate('/admin/products')
    } catch (error) {
      toast.error(error || 'Failed to save product')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-dark-500 text-sm">
            {isEditing
              ? 'Update product details'
              : 'Fill in the details to add a new product'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="text-dark-500 hover:text-dark-700"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Premium Sambrani Cups"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="input-field resize-none"
            placeholder="Describe your product..."
          />
        </div>

        {/* Category + Price + Stock */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="sambrani">Sambrani</option>
              <option value="dhoop">Dhoop</option>
              <option value="incense">Incense Sticks</option>
              <option value="herbal">Herbal Products</option>
              <option value="pooja">Pooja Items</option>
              <option value="gift">Gift Boxes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="input-field"
              placeholder="149"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="input-field"
              placeholder="100"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-field"
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl && (
            <div className="mt-3">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-dark-700">Active (visible to customers)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-dark-700">Featured product</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <FaSave size={14} />
            {submitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm