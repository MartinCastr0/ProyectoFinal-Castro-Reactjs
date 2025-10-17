import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

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
        <img src={item.image} alt={item.title} style={{width:320}} />
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
