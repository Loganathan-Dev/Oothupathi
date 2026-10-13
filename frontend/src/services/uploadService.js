import api from './api'

const uploadService = {
  async uploadImage(file, folder = 'general') {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', folder)

    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  async uploadMultipleImages(files, folder = 'general') {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
    formData.append('folder', folder)

    const response = await api.post('/api/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  async deleteImage(publicId) {
    const response = await api.delete(`/api/upload/${publicId}`)
    return response.data
  },
}

export default uploadService