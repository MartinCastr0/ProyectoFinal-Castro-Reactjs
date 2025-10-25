// Componente de la barra de navegación
// Lo hice con CSS puro porque quería practicar sin Bootstrap
// Me basé en el diseño que vimos en la clase 5
import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar(){
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="logo">
          {/* use BASE so logo resolves correctly if app is served under subpath */}
          <Link to="/"><img src={`${import.meta.env.BASE_URL || '/'}logo.svg`} alt="TodoPadel"/></Link>
        </div>

        <div className="nav-center">
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/category/paletas">Paletas</Link>
            <Link to="/category/bolsos">Bolsos</Link>
            <Link to="/category/pelotas">Pelotas</Link>
          </nav>
          <div className="nav-search">
            <input type="search" placeholder="Buscá tu próxima paleta..." aria-label="Buscar" />
          </div>
        </div>

        <div className="nav-actions">
          {/* CartWidget solo se muestra si CartProvider está disponible */}
          {React.createElement(React.Suspense, { 
            fallback: null 
          }, React.createElement(CartWidget))}
        </div>
      </div>
    </header>
  )
}
