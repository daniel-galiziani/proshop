import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productContants'

const ProductEditScreen = ({ match, history }) => {
        const productId = match.params.id

        const [name, setName] = useState('')
        const [price, setPrice] = useState(0)
        const [image, setImage] = useState('')
        const [brand, setBrand] = useState('')
        const [category, setCategory] = useState('')
        const [countInStock, setCountInStock] = useState(0)
        const [description, setDescription] = useState('')

        const dispatch = useDispatch()

        const productDetails = useSelector(state => state.productDetails)
        const { loading, error, product } = productDetails

        const productUpdate = useSelector(state => state.productUpdate)
        const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


        useEffect(() => {
            if(successUpdate){
                dispatch({ type: PRODUCT_UPDATE_RESET })
                history.push('/admin/productlist')
            } else {
                if (!product.name || product._id !== productId) {
                    dispatch(listProductsDetails(productId));
                  } else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                  }
            } 
        }, [dispatch, history, product, productId, successUpdate]);
          
          
        const submitHandler = (e) => {
            e.preventDefault()
           dispatch(updateProduct({
               _id: productId,
               name,
               price,
               image,
               brand,
               category,
               description,
               countInStock,
           }))
        }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ?  (
                <Loader /> 
            ) : error ? ( 
            <Message variant='danger'>{error}</Message> 
            ) : (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <Form.Control 
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <FormLabel>Price</FormLabel>
                    <Form.Control 
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                <FormLabel>Image</FormLabel>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                <FormLabel>Brand</FormLabel>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <FormLabel>Count In Stock</FormLabel>
                    <Form.Control 
                        type='number'
                        placeholder='Enter CountInStock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                <FormLabel>Category</FormLabel>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                <FormLabel>Description</FormLabel>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>
            </Form>
            )}
            

          
        </FormContainer>
        </>
        
    )
}

export default ProductEditScreen