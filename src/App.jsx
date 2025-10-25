// Componente principal App
// Hecho por Martin Castro para la entrega final
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import ItemListContainer from './containers/ItemListContainer'
import ItemDetailContainer from './containers/ItemDetailContainer'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'

export default function App(){
  return (
    <div className="app">
      <NavBar />
      <main>
        <section className="hero">
          <div className="container">
            <h1>TodoPadel</h1>
            <p className="lead">Paletas, accesorios e indumentaria para jugadores de todos los niveles.</p>
            <p><Link className="btn" to="/">Ver catálogo</Link></p>
          </div>
        </section>
        <Routes>
          <Route path="/" element={<ItemListContainer/>} />
          <Route path="/category/:categoryId" element={<ItemListContainer/>} />
          <Route path="/item/:itemId" element={<ItemDetailContainer/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<CheckoutForm/>} />
        </Routes>
      </main>
    </div>
  )
}
