import express  from 'express'
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    deleteProduct,
    updatedProduct,
    createdProduct,
    createProductReview,
    getTopProducts, 
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createdProduct)
router
    .route('/:id/reviews')
    .post(protect, createProductReview)
router
    .get('/top', getTopProducts)
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updatedProduct)



    

export default router