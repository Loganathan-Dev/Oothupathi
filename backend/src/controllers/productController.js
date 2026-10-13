import Product from '../models/Product.js'

// @desc    Get all products (PUBLIC)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query
    const filter = { isActive: true }

    if (category) filter.category = category
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    let sortOption = '-createdAt'
    if (sort === 'price-asc') sortOption = 'price'
    if (sort === 'price-desc') sortOption = '-price'
    if (sort === 'name') sortOption = 'name'

    const products = await Product.find(filter).sort(sortOption)
    res.json({ success: true, count: products.length, data: { products } })
  } catch (error) {
    console.error('getProducts error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single product (PUBLIC)
// @route   GET /api/products/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, data: { product } })
  } catch (error) {
    console.error('getProduct error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get product by slug (PUBLIC)
// @route   GET /api/products/slug/:slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, data: { product } })
  } catch (error) {
    console.error('getProductBySlug error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create product (ADMIN)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    
    const {
      name,
      description,
      category,
      price,
      stock,
      images,
      isActive,
      isFeatured,
    } = req.body

    // Validate
    if (!name || !description || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, category, and price',
      })
    }

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      category,
      price: Number(price),
      stock: Number(stock) || 0,
      images: images || [],
      isActive: isActive !== false,
      isFeatured: isFeatured === true,
    })

        res.status(201).json({ success: true, data: { product } })
  } catch (error) {
    console.error('❌ createProduct error:', error)
    res.status(500).json({
      success: false,
      message: error.message,
      errors: error.errors,
    })
  }
}

// @desc    Update product (ADMIN)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, data: { product } })
  } catch (error) {
    console.error('updateProduct error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete product (ADMIN)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }
    res.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error('deleteProduct error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

