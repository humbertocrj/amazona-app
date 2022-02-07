import Axios from 'axios'
const {CART_ADD_ITEM} = require('../constants/cartConstants')

export const addToCart = (productId, qty) => async(dispatch, getState)=>{
    //Get the product from backend
    const {data} = await Axios.get(`/api/products/${productId}`)

    dispatch({
        type: CART_ADD_ITEM, 
        payload: {
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty,
        }
    })

    //If page is refreshed, then all states will be cleared. So we need to store the information
    //using localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}