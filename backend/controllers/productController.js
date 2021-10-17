import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/product
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/product/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product) {
        await product.remove()
        res.json({ message: 'Product Remove' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc    Create a product
// @route   POST /api/product
// @access  Private/Admin
const createdProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
})

const createdProduct = await product.save()
res.status(201).json(createdProduct)

})


// @desc    Update a product
// @route   PUT /api/product/:id
// @access  Private/Admin
const updatedProduct = asyncHandler(async (req, res) => {
   const { 
       name,
       price,
       description,
       image,
       brand,
       category,
       countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

   
})



export { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    updatedProduct, 
    createdProduct,
 }