import React from 'react';
import { Button, Badge } from 'react-bootstrap';

const CartWidget = () => {
    return (
        <>
            <Button variant='link' className='position-relative' id='cart-widget'>
                <i className='bi bi-cart'></i>
                <Badge className='position-absolute rounded-pill bg-danger'>0</Badge>
            </Button>
        </>
    )
}

export default CartWidget;