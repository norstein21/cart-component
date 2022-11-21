import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading:false,
  cart:cartItems,
  total:0,
  amount:0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)

  const clearAllItems = ()=> {
    dispatch({ type: 'CLEAR_CART' })
  }

  const clearById = (id)=>{
    console.log(id)
    dispatch({ type: 'REMOVE', itemId: id})
  }

  const increase = (id)=>{
    dispatch({ type: 'INCREASE', itemId: id})
  }
  const decrease = (id)=>{
    dispatch({ type: 'DECREASE', itemId: id})
  }

  const toggleAmount = (id,type)=>{
    
  }

  const fetchApi = async () =>{
    dispatch({type: 'LOADING'})
    const data = await fetch(url);
    const cartData = await data.json();
    console.log(cartData);
    dispatch({type:'GET_ITEMS', dataBaru: cartData})
  }

  useEffect(()=>{
    fetchApi()
  },[])

  useEffect(()=>{ 
    dispatch({type: 'GET_TOTAL'})
  },[state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAllItems,
        clearById,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
