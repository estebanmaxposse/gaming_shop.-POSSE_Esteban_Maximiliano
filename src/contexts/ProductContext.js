import React, {useState, useContext, createContext } from "react"
import env from "react-dotenv"

const productContext = createContext()

export const useProduct = () => {
    return useContext(productContext)
}

const ProductContext = ({children}) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

    const getProducts = async (category) => {
        category = category || ''
        await fetch(env.API_URL + '/api/products' + `/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(async response => {
            let data = await response.json()
            return data
        })
        .then(data => {
            setProducts(data)
        })
        // .then(() => {
        //     return products
        // })
        .catch(error => {
            console.error(error)
        })
    }

    const getProduct = async (id) => {
        await fetch(env.API_URL + '/api/products/product/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(async response => {
            let data = await response.json()
            return data
        })
        .then(data => {
            setProduct(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const addProduct = async (product) => {
        await fetch(env.API_URL + '/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(product)
        })
        .then(async response => {
            let data = await response.json()
            return data
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const updateProduct = async (id, product) => {
        await fetch(env.API_URL + '/api/products/product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(product)
        })
        .then(async response => {
            let data = await response.json()
            return data
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const deleteProduct = async (id) => {
        await fetch(env.API_URL + '/api/products/product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(async response => {
            let data = await response.json()
            return data
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const value = {
        products,
        product,
        setProducts,
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct
    }

    return <productContext.Provider {...{value}}>{children}</productContext.Provider>
}

export default ProductContext