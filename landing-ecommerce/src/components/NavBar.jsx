// NavBar simple para navegación del e-commerce
// Autor: Martin Castro
import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <header className="navbar">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="logo">
          <Link to="/"><img src="/logo.svg" alt="TodoPadel" style={{height:36}}/></Link>
        </div>
        <nav>
          <Link to="/">Catálogo</Link>
          {' | '}
          <Link to="/category/paletas">Paletas</Link>
          {' | '}
          <Link to="/category/accesorios">Accesorios</Link>
          {' | '}
          <Link to="/category/indumentaria">Indumentaria</Link>
        </nav>
        <CartWidget />
      </div>
    </header>
  )
}
