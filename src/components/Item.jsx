import React from 'react'
import { Link } from 'react-router-dom'

// Use Vite base URL so assets resolve correctly when app is served from a subpath
const BASE = import.meta.env.BASE_URL || '/'
const FALLBACK_IMG = `${BASE}placeholder.jpg`

export default function Item({ item }){
  // Normaliza la URL de la imagen: mantiene las URLs absolutas y convierte
  // rutas relativas (p.ej. '/paleta1.jpg') para que respeten BASE_URL de Vite.
  const normalizeImage = (img) => {
    if(!img) return FALLBACK_IMG
    if(/^https?:\/\//i.test(img)) return img
    const base = import.meta.env.BASE_URL || '/'
    return img.startsWith('/') ? `${base}${img.slice(1)}` : `${base}${img}`
  }

  const imgSrc = normalizeImage(item.image)
  if(import.meta.env.DEV){
    // Debug en desarrollo: muestra la URL que se intentará cargar
    try{ console.debug('[Item] imgSrc for', item.id, imgSrc) }catch(e){}
  }

  return (
    <article className="card">
      <div className="media">
        <img
          src={imgSrc}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = FALLBACK_IMG
          }}
        />
        <span className="price-badge"><span className="price">${item.price.toFixed(2)}</span></span>
      </div>
      <div className="card-body">
        <h4 className="card-title" title={item.title}>{item.title}</h4>
        <div className="meta">
          <span className="stock">{item.stock > 0 ? `Stock: ${item.stock}` : 'Sin stock'}</span>
        </div>
        <Link to={`/item/${item.id}`} className="btn">Ver detalle</Link>
      </div>
    </article>
  )
}
