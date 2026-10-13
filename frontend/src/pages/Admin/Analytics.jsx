import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnalytics } from '../../features/admin/adminSlice'
import { FaChartLine, FaRupeeSign, FaShoppingCart, FaUsers } from 'react-icons/fa'

const Analytics = () => {
  const dispatch = useDispatch()
  const { analytics } = useSelector((state) => state.admin)
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    dispatch(fetchAnalytics(period))
  }, [dispatch, period])

  const data = analytics || {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Analytics</h1>
          <p className="text-dark-500 text-sm">Sales performance overview</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Sales by Category */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaChartLine className="text-primary-600" /> Sales by Category
          </h2>
          <div className="space-y-3">
            {data.categorySales?.length === 0 ? (
              <p className="text-dark-500 text-center py-8">No data yet</p>
            ) : (
              data.categorySales?.map((cat, i) => {
                const maxRevenue = Math.max(
                  ...data.categorySales.map((c) => c.revenue)
                )
                const width = (cat.revenue / maxRevenue) * 100

                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium">
                        {cat._id || 'Uncategorized'}
                      </span>
                      <span className="font-bold">
                        ₹{cat.revenue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                        style={{ width: `${width}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-dark-500 mt-1">
                      {cat.itemsSold} items sold
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaRupeeSign className="text-primary-600" /> Payment Methods
          </h2>
          <div className="space-y-3">
            {data.paymentMethods?.length === 0 ? (
              <p className="text-dark-500 text-center py-8">No data yet</p>
            ) : (
              data.paymentMethods?.map((pm, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium capitalize">
                      {pm._id === 'cod'
                        ? 'Cash on Delivery'
                        : pm._id === 'card'
                        ? 'Credit/Debit Card'
                        : pm._id === 'upi'
                        ? 'UPI'
                        : pm._id}
                    </p>
                    <p className="text-xs text-dark-500">
                      {pm.count} orders
                    </p>
                  </div>
                  <p className="font-bold">₹{pm.revenue.toLocaleString('en-IN')}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FaUsers className="text-primary-600" /> Top Customers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-dark-500 uppercase">
                  Rank
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-dark-500 uppercase">
                  Customer
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-dark-500 uppercase">
                  Orders
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-dark-500 uppercase">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.topCustomers?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-dark-500">
                    No data yet
                  </td>
                </tr>
              ) : (
                data.topCustomers?.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-dark-500">{c.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{c.orderCount}</td>
                    <td className="px-4 py-3 text-right font-bold">
                      ₹{c.totalSpent.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Sales Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">Daily Sales</h2>
        {data.dailySales?.length === 0 ? (
          <p className="text-dark-500 text-center py-8">No data yet</p>
        ) : (
          <div className="flex items-end gap-1 h-48 overflow-x-auto">
            {data.dailySales?.map((day, i) => {
              const maxRevenue = Math.max(
                ...data.dailySales.map((d) => d.revenue)
              )
              const height = (day.revenue / maxRevenue) * 100

              return (
                <div
                  key={i}
                  className="flex-1 min-w-[20px] flex flex-col items-center group relative"
                >
                  <div
                    className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t hover:from-primary-700 hover:to-primary-500 transition-colors"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  ></div>
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900 text-white text-xs rounded p-2 whitespace-nowrap pointer-events-none z-10">
                    {day._id}: ₹{day.revenue.toLocaleString('en-IN')}
                    <br />({day.orders} orders)
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics