import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllProducts,
  deleteProduct,
} from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const { products = [], loading } = useSelector((state) => state.admin || {})
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await dispatch(deleteProduct(id)).unwrap()
      toast.success('Product deleted')
    } catch (error) {
      toast.error(error || 'Failed to delete')
    }
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-900">
            Products
          </h1>
          <p className="text-dark-500 text-sm">{products.length} products in store</p>
        </div>
        <Link
          to="/admin/products/new"
          className="btn-primary w-full sm:w-auto justify-center"
        >
          <FaPlus size={14} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow mb-4 p-3 sm:p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="font-heading text-lg font-semibold mb-2">
            {search ? 'No products match your search' : 'No products yet'}
          </h3>
          <Link to="/admin/products/new" className="btn-primary inline-flex mt-4">
            <FaPlus size={14} /> Add First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.images?.[0]?.url ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl">
                              {getCategoryEmoji(product.category)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-dark-900 text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-dark-500 line-clamp-1">
                            {product.description?.slice(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="badge bg-primary-50 text-primary-700 capitalize">
                        {getCategoryEmoji(product.category)} {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-sm">
                      ₹{product.price}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          product.stock < 10 ? 'text-red-600' : 'text-dark-600'
                        }`}
                      >
                        {product.stock}
                        {product.stock < 10 && ' ⚠️'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`badge ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="inline-block p-2 text-primary-600 hover:bg-primary-50 rounded-lg mr-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts