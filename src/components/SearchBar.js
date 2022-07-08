import React from "react";
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <>
            <Form className='d-flex' id='search-bar'>
                <FormControl type='search' placeholder='SEARCH...' aria-label='Search' id='search-bar-input'/>
                <Button variant='success' id='search-bar-button'>
                    <i className='bi bi-search'></i>
                </Button>
            </Form>
        </>
    )
}

export default SearchBar;