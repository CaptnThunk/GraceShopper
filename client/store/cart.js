import axios from 'axios'

const RECEIVE_CART_PRODUCTS = 'RECEIVE_CART_PRODUCTS'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT'

//ACTION CREATOR
export const receiveCartProducts = (cartProducts) => {
  return {
    type: RECEIVE_CART_PRODUCTS,
    cartProducts,
  }
}

export const increaseQuantity = (singleCartProduct) => {
  return {
    type: INCREASE_QUANTITY,
    singleCartProduct,
  }
}

export const decreaseQuantity = (singleCartProduct) => {
  return {
    type: DECREASE_QUANTITY,
    singleCartProduct,
  }
}

export const deleteCartProduct = (productId) => {
  return {
    type: DELETE_CART_PRODUCT,
    productId,
  }
}

//THUNK
export const fetchCartProductsThunk = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(receiveCartProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const increaseQuantityThunk = (order_productId, singleCartProduct) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(
        `/api/order_products/${order_productId}`,
        singleCartProduct
      )
      dispatch(increaseQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const decreaseQuantityThunk = (order_productId, singleCartProduct) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(
        `/api/order_products/${order_productId}`,
        singleCartProduct
      )
      dispatch(decreaseQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteCartProductThunk = (productId, orderId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/orders_products/${productId}/${orderId}`) //route might be different
      dispatch(deleteCartProduct(productId)) //might change it
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CART_PRODUCTS:
      return action.cartProducts // not sure how it is called yet
    case INCREASE_QUANTITY: {
      let updatedProducts = [...state]
      let pIdx = updatedProducts.findIndex(
        (product) => product.id === action.product.productId
      )
      updatedProducts[pIdx].quantity += 1
      return updatedProducts
    }
    case DECREASE_QUANTITY: {
      let updatedProducts = [...state]
      let pIdx = updatedProducts.findIndex(
        (product) => product.id === action.product.productId
      )
      updatedProducts[pIdx].quantity -= 1
      return updatedProducts
    }
    case DELETE_CART_PRODUCT: {
      const remainingProducts = state.filter(
        (product) => product.id !== action.productId // need to double check all attributes' name
      )
      return remainingProducts
    }

    default:
      return state
  }
}

export default cartReducer