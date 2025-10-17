import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList'
import { fetchProducts } from '../services/firestoreService'
import { useParams } from 'react-router-dom'

export default function ItemListContainer(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(()=>{
    setLoading(true)
    fetchProducts().then(products => {
      if(categoryId){
        setItems(products.filter(p => p.category === categoryId))
      } else setItems(products)
    }).finally(()=>setLoading(false))
  },[categoryId])

  if(loading) return <div className="loader">Cargando productos...</div>

  if(items.length === 0) return <div className="loader">No hay productos en esta categoría</div>

  return <ItemList items={items} />
}
