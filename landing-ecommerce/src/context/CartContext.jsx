import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

function reducer(state, action){
  switch(action.type){
    case 'ADD':{
      const existing = state.items.find(i => i.id === action.item.id)
      if(existing){
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: Math.min(i.quantity + action.quantity, action.item.stock) } : i)
        }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: action.quantity }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const addItem = (item, quantity) => dispatch({ type: 'ADD', item, quantity })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })
  const clear = () => dispatch({ type: 'CLEAR' })
  const totalItems = state.items.reduce((s,i) => s + i.quantity, 0)
  const totalPrice = state.items.reduce((s,i) => s + i.quantity * i.price, 0)
  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)
}
