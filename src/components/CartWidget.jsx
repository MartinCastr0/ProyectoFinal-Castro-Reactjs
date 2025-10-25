import React from 'react'
import { Link } from 'react-router-dom'
import { useCartSafe } from '../context/CartContext'

export default function CartWidget(){
  // useCartSafe devuelve valores por defecto si el provider no está presente.
  const cart = useCartSafe()
  const totalItems = cart.totalItems || 0

  return (
    <Link to="/cart" className="cart-widget" aria-label={`Ver carrito (${totalItems} items)`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#172033" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20" r="1.4" fill="#172033"/>
        <circle cx="18" cy="20" r="1.4" fill="#172033"/>
      </svg>
      <span>{totalItems}</span>
    </Link>
  )
}
