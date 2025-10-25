import React, { createContext, useContext, useReducer } from 'react'

// Export CartContext so components can read it without triggering the throw
export const CartContext = createContext(null)

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

function reducer(state, action){
  switch(action.type){
    case 'ADD':{
      // Validaciones básicas: quantity positiva y stock definido
      const qtyToAdd = Number(action.quantity) || 0
      if(qtyToAdd <= 0) return state
      const stock = typeof action.item?.stock === 'number' ? action.item.stock : Infinity
      const existing = state.items.find(i => i.id === action.item.id)
      if(existing){
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: Math.min(i.quantity + qtyToAdd, stock) } : i)
        }
      }
      const quantity = Math.min(qtyToAdd, stock)
      return { ...state, items: [...state.items, { ...action.item, quantity }] }
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
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const value = {
    items: state.items,
    addItem: (item, quantity) => dispatch({ type: 'ADD', item, quantity }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    totalItems: state.items.reduce((s,i) => s + i.quantity, 0),
    totalPrice: state.items.reduce((s,i) => s + i.quantity * i.price, 0)
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const context = useContext(CartContext)
  if(!context){
    throw new Error('useCart debe usarse dentro de <CartProvider>. Asegurate de envolver la aplicación con CartProvider en `src/main.jsx`.')
  }
  return context
}

// Safe hook: devuelve un objeto por defecto en caso de que no exista provider.
// Útil para widgets que se renderizan en entornos donde el provider podría no estar presente
// (por ejemplo durante HMR). No sustituye a envolver correctamente la app con CartProvider.
export function useCartSafe(){
  const context = useContext(CartContext)
  if(!context){
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      clear: () => {},
      totalItems: 0,
      totalPrice: 0
    }
  }
  return context
}
