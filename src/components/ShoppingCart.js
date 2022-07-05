import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const ShoppingCart = () => {
    return (
        <>
            <Button variant='link' className='position-relative'>
                <i className='bi bi-cart'></i>
                <Badge className='position-absolute top-0 start-100 translate-middle rounded-pill bg-danger'>0</Badge>
            </Button>
        </>
    )
}

export default ShoppingCart;