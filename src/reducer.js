const reducer = (state,action)=>{
    if(action.type === 'CLEAR_CART'){
        return {...state,cart:[]}
    }

    if(action.type === 'REMOVE'){
        return {...state,cart: state.cart.filter((cartItem)=>cartItem.id !== action.itemId)}
    }

    if(action.type === 'INCREASE'){
        let plusCart = state.cart.map((cartItem)=>{
            if(cartItem.id === action.itemId){
                return {...cartItem,amount: cartItem.amount + 1}
            }
            return cartItem
        })
        return {...state,cart: plusCart}
    }

    if(action.type === 'DECREASE'){
        let plusCart = state.cart.map((cartItem)=>{
            if(cartItem.id === action.itemId){
                return {...cartItem,amount: cartItem.amount - 1}
            }
            return cartItem
        }).filter((cartItem)=>cartItem.amount > 0)
        return {...state,cart: plusCart}
    }

    if(action.type === 'GET_TOTAL'){
        const {total,amount} = state.cart.reduce(
            (cartTotal,cartItem)=>{
                const {price,amount} = cartItem;
                const itemTotal = price * amount;

                cartTotal.amount += amount;
                cartTotal.total  += itemTotal
                return cartTotal
            },{
                total:0,
                amount:0
            }
        )
        return {...state,total,amount}
    }
    
    if(action.type === 'GET_ITEMS'){
        return {...state,cart:action.dataBaru,loading:false}
    }

    if(action.type === 'LOADING'){
        return {...state,loading:true}
    }

    return state;
}

export default reducer;