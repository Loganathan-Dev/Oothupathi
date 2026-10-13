import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../services/api'
import { addToCart } from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'
import {
  FaSearch,
  FaShoppingCart,
  FaFilter,
  FaStar,
} from 'react-icons/fa'

const Products = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('-createdAt')

  useEffect(() => {
    fetchProducts()
  }, [category, sort])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category) params.append('category', category)
      if (sort) params.append('sort', sort)

      const response = await api.get(`/products?${params}`)
      setProducts(response.data.data.products)
    } catch (error) {
      console.error('Fetch products error:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.warning('Please login to add items to cart')
      return
    }
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-dark-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Discover our comprehensive range of premium manufacturing solutions.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="industrial">Industrial</option>
              <option value="herbal">Herbal</option>
              <option value="custom">Custom</option>
              <option value="packaging">Packaging</option>
              <option value="machinery">Machinery</option>
              <option value="tooling">Tooling</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="-createdAt">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-dark-800 mb-2">
              No products found
            </h3>
            <p className="text-dark-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary-100 to-primary-200">
                        📦
                      </div>
                    )}
                    {product.isFeatured && (
                      <span className="absolute top-2 left-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <span className="text-xs uppercase text-primary-600 font-medium">
                    {product.category}
                  </span>
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-semibold text-dark-900 mt-1 hover:text-primary-600 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-dark-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(product.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                        size={12}
                      />
                    ))}
                    <span className="text-xs text-dark-500 ml-1">
                      ({product.numReviews || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-primary-600">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                      title="Add to Cart"
                    >
                      <FaShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products