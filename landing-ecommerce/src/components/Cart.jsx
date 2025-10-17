import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from './CartItem'

export default function Cart(){
  const { items, clear, totalPrice } = useCart()
  const navigate = useNavigate()

  if(items.length === 0) return <div className="container"><div className="loader">Carrito vacío. <Link to="/">Ir al catálogo</Link></div></div>

  return (
    <div className="container">
      <h3>Carrito</h3>
      <ul style={{listStyle:'none',padding:0}}>
        {items.map(i => <CartItem key={i.id} item={i} />)}
      </ul>
      <div style={{marginTop:16}}>
        <div style={{fontWeight:700,marginBottom:8}}>Total: ${totalPrice.toFixed(2)}</div>
        <button className="btn" onClick={()=>navigate('/checkout')}>Finalizar compra</button>
        <button className="btn" style={{marginLeft:8}} onClick={clear}>Vaciar carrito</button>
      </div>
    </div>
  )
}
