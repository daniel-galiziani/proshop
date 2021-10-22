import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }


    return (
        <>
        <Form onSubmit={submitHandler} className="m-2">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
            ></Form.Control>
        </Form>
        <Button 
                type='submit' 
                variant='outline-success' 
                className='p-2'
                onClick={submitHandler}
            >
                Search
        </Button>
        </>
    )
}

export default SearchBox
