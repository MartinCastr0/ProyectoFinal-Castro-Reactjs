import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

// Use Vite base URL so assets resolve correctly when app is served from a subpath
const BASE = import.meta.env.BASE_URL || '/'
const FALLBACK_IMG = `${BASE}placeholder.jpg`

export default function ItemDetail({ item }){
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const onAdd = (qty) => {
    addItem(item, qty)
    setAdded(true)
  }

  return (
    <div className="container">
      <div className="card" style={{display:'flex',gap:16}}>
        {/* Normaliza la ruta de la imagen (respeta BASE_URL) */}
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
              style={{width:320}}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG }}
            />
          )
        })()}
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Precio: ${item.price.toFixed(2)}</p>
          <p>{item.stock > 0 ? `Stock disponible: ${item.stock}` : 'Producto sin stock'}</p>
          {!added && item.stock > 0 && <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />}
          {added && <div>
            <Link to="/cart" className="btn">Ir al carrito</Link>
            <Link to="/" style={{marginLeft:8}}>Seguir comprando</Link>
          </div>}
        </div>
      </div>
    </div>
  )
}
