import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { addToCart } from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from 'react-icons/fa'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/products/${id}`)
      setProduct(res.data.data.product)
    } catch (err) {
      console.error('Fetch product error:', err)
      toast.error('Product not found')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning('Please login to add items to cart')
      navigate('/login')
      return
    }
    dispatch(addToCart({ product, quantity }))
    toast.success(`${product.name} added to cart!`)
  }

  const getCategoryEmoji = (cat) => {
    const emojis = {
      sambrani: '🔥',
      dhoop: '🌿',
      incense: '🕉️',
      herbal: '🌱',
      pooja: '🪔',
      gift: '🎁',
    }
    return emojis[cat] || '📦'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              {product.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-9xl">{getCategoryEmoji(product.category)}</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-4">
              <span className="badge bg-primary-100 text-primary-700">
                {getCategoryEmoji(product.category)} {product.category}
              </span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                    size={16}
                  />
                ))}
              </div>
              <span className="text-sm text-dark-500">
                {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b">
              <span className="font-heading text-3xl font-bold text-primary-600">
                ₹{product.price}
              </span>
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <FaCheckCircle size={12} /> In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-dark-900 mb-2">Description</h2>
              <p className="text-dark-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity + Add to Cart */}
            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-3 hover:bg-gray-100 text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t">
              <div className="text-center">
                <FaTruck className="text-primary-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-dark-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-primary-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-dark-600">100% Natural</p>
              </div>
              <div className="text-center">
                <FaUndo className="text-primary-600 text-xl mx-auto mb-1" />
                <p className="text-xs text-dark-600">7-Day Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications (if any) */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-xl font-bold text-dark-900 mb-4">
              Specifications
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-dark-600 capitalize">
                    {key}
                  </span>
                  <span className="text-sm text-dark-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
