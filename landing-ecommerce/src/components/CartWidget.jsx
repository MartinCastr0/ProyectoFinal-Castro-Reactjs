import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartWidget(){
  const { totalItems } = useCart()
  return (
    <Link to="/cart" className="cart-widget">
      <img src="https://via.placeholder.com/32?text=🛒" alt="cart"/>
      <span>{totalItems}</span>
    </Link>
  )
}
