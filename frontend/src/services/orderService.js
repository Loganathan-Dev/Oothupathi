import api from './api'

const orderService = {
  // Get all orders
  async getOrders() {
    const response = await api.get('/orders')
    return response.data
  },

  // Create new order
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData)
    return response.data
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response.data
  },

  // Get single order
  async getOrder(orderId) {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  },

  // Delete order
  async deleteOrder(orderId) {
    const response = await api.delete(`/orders/${orderId}`)
    return response.data
  }
}

export default orderService