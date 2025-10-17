import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/firestoreService'
import ItemDetail from '../components/ItemDetail'

export default function ItemDetailContainer(){
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetchProductById(itemId).then(p => setItem(p)).finally(()=>setLoading(false))
  },[itemId])

  if(loading) return <div className="loader">Cargando detalle...</div>
  if(!item) return <div className="loader">Producto no encontrado</div>

  return <ItemDetail item={item} />
}
