import React, {useState} from 'react';
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';

const ItemCount = ({initial, stock, onAdd}) => {

    onAdd = () => {
        alert(count + " items added to cart!");
    }

    const [count, setCount] = useState(initial);

    const inc = () => {
        if (count < stock) {
            setCount (count + 1);
        }
        
    };

    const dec = () => {
        if (count > 0) {
            setCount (count - 1);
        }
    };


    return (
        <div>
            <p>Stock Available: {stock}</p>
            <InputGroup>
                <span>
                    <Button onClick={dec} disabled={count <= 0}><i className="bi bi-dash"></i></Button>
                </span>
                <FormControl type='text' value={count}></FormControl>
                <span>
                    <Button onClick={inc} disabled={count >= stock}><i className="bi bi-plus"></i></Button>
                </span>
            </InputGroup>
            <Button onClick={onAdd} disabled={stock <= 0 || count <= 0 }>Add to Cart</Button>
        </div>
    );
};

export default ItemCount;