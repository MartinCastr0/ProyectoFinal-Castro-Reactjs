import React from 'react'
import { useCart } from '../context/CartContext'

// Use Vite base URL so assets resolve correctly when app is served from a subpath
const BASE = import.meta.env.BASE_URL || '/'
const FALLBACK_IMG = `${BASE}placeholder.jpg`

export default function CartItem({ item }){
  const { removeItem } = useCart()
  return (
    <li style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:8}}>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        {(() => {
          const normalizeImage = (img) => {
            if(!img) return FALLBACK_IMG
            if(/^https?:\/\//i.test(img)) return img
            const base = import.meta.env.BASE_URL || '/'
            return img.startsWith('/') ? `${base}${img.slice(1)}` : `${base}${img}`
          }
          const imgSrc = normalizeImage(item.image)
          return (
            <img
              src={imgSrc}
              alt={item.title}
              style={{width:80,height:60,objectFit:'cover',borderRadius:6}}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG }}
            />
          )
        })()}
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
