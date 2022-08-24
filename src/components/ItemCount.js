import React, {useState} from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const ItemCount = ({initial, stock, onAdd}) => {

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
            <p className='text-muted item-detail-info-stock'>Stock Available: {stock}</p>
            <InputGroup>
                <span>
                    <Button onClick={dec} disabled={count <= 0} className='item-detail-info-button'><i className="bi bi-dash"></i></Button>
                </span>
                <FormControl type='text' value={count} onChange={(e) => setCount(Number(e.target.value))}></FormControl>
                <span>
                    <Button onClick={inc} disabled={count >= stock} className='item-detail-info-button'><i className="bi bi-plus"></i></Button>
                </span>
                <Button onClick={() => onAdd(count)} disabled={stock <= 0 || count <= 0 } className='item-detail-info-button'>Add to Cart</Button>
            </InputGroup>
        </div>
    );
};

export default ItemCount;