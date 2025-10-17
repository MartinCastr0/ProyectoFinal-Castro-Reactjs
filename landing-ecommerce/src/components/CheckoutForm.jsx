// Formulario de checkout - implementación básica
// Autor: Martin Castro
import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/firestoreService'

export default function CheckoutForm(){
  const { items, totalPrice, clear } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const submit = async (e) =>{
    e.preventDefault()
    if(items.length === 0) return
    setLoading(true)
    const order = { buyer: { name, email, phone }, items, total: totalPrice, date: new Date().toISOString() }
    try{
      const res = await createOrder(order)
      setOrderId(res.id)
      clear()
    }catch(err){
      console.error(err)
      alert('Error generando la orden')
    }finally{setLoading(false)}
  }

  if(orderId) return <div className="container"><h3>Gracias por tu compra</h3><p>Tu ID de orden es: {orderId}</p><p>Te enviamos un email (simulado) con los detalles.</p></div>

  return (
    <div className="container">
      <h3>Checkout</h3>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:400}}>
        <input value={name} placeholder="Nombre" onChange={e=>setName(e.target.value)} required />
        <input value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} required type="email" />
        <input value={phone} placeholder="Teléfono" onChange={e=>setPhone(e.target.value)} required />
        <div>Total: ${totalPrice.toFixed(2)}</div>
        <button className="btn" type="submit" disabled={loading}>Confirmar compra</button>
      </form>
    </div>
  )
}
