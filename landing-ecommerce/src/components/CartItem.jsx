import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }){
  const { removeItem } = useCart()
  return (
    <li style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:8}}>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <img src={item.image} alt={item.title} style={{width:80,height:60,objectFit:'cover',borderRadius:6}}/>
        <div>
          <div style={{fontWeight:600}}>{item.title}</div>
          <div>Cantidad: {item.quantity}</div>
          <div>Subtotal: ${(item.quantity * item.price).toFixed(2)}</div>
        </div>
      </div>
      <div>
        <button className="btn" onClick={()=>removeItem(item.id)}>Eliminar</button>
      </div>
    </li>
  )
}
