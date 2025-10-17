import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({ item }){
  return (
    <article className="card">
      <img src={item.image} alt={item.title} style={{width:'100%',borderRadius:6}} />
      <h4 style={{minHeight:40}}>{item.title}</h4>
      <p>${item.price.toFixed(2)}</p>
      <p>{item.stock > 0 ? `Stock: ${item.stock}` : 'Sin stock'}</p>
      <Link to={`/item/${item.id}`} className="btn">Ver detalle</Link>
    </article>
  )
}
