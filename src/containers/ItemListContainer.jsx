import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList'
import { fetchProducts } from '../services/firestoreService'
import { useParams } from 'react-router-dom'

export default function ItemListContainer(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(false)
  const { categoryId } = useParams()

  useEffect(()=>{
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const products = await fetchProducts()
        if(!mounted) return
        if(categoryId){
          setItems(products.filter(p => p.category === categoryId))
        } else setItems(products)
        setUsingMock(false)
      }catch(err){
        // Si falla la carga (p.ej. falta de credenciales), usar mock local como fallback
        console.warn('fetchProducts failed, falling back to mockProducts:', err)
        try{
          const mod = await import('../data/mockProducts')
          const products = mod.mockProducts || []
          if(!mounted) return
          if(categoryId){
            setItems(products.filter(p => p.category === categoryId))
          } else setItems(products)
          setUsingMock(true)
        }catch(e){
          console.error('Failed to load mockProducts', e)
          if(!mounted) return
          setItems([])
        }
      }finally{
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  },[categoryId])

  if(loading) return <div className="loader">Cargando productos...</div>

  if(items.length === 0) return <div className="loader">No hay productos en esta categoría</div>

  return (
    <>
      <ItemList items={items} />
    </>
  )
}
