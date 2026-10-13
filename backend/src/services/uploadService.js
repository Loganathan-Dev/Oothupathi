import cloudinary from '../../config/cloudinary.js'
import { Readable } from 'stream'

class UploadService {
  async uploadFile(file, folder = 'oothupathi') {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )

        // Convert buffer to stream if needed
        if (file.buffer) {
          const readableStream = new Readable()
          readableStream.push(file.buffer)
          readableStream.push(null)
          readableStream.pipe(uploadStream)
        } else {
          // If file is a stream or path
          uploadStream.end(file)
        }
      })

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  async uploadMultipleFiles(files, folder = 'oothupathi') {
    try {
      const uploadPromises = files.map((file) => this.uploadFile(file, folder))
      const results = await Promise.all(uploadPromises)
      return results
    } catch (error) {
      console.error('Multiple upload error:', error)
      throw error
    }
  }

  async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return result
    } catch (error) {
      console.error('Delete error:', error)
      throw error
    }
  }

  async deleteMultipleFiles(publicIds) {
    try {
      const deletePromises = publicIds.map((publicId) => this.deleteFile(publicId))
      const results = await Promise.all(deletePromises)
      return results
    } catch (error) {
      console.error('Multiple delete error:', error)
      throw error
    }
  }
}

export default new UploadService()