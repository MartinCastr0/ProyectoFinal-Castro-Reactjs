import React, { useState } from 'react'

export default function ItemCount({ stock, initial = 1, onAdd }){
  const [count, setCount] = useState(initial)
  const inc = () => setCount(c => Math.min(c+1, stock))
  const dec = () => setCount(c => Math.max(c-1, 1))
  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="btn" onClick={dec} disabled={count<=1}>-</button>
        <span>{count}</span>
        <button className="btn" onClick={inc} disabled={count>=stock}>+</button>
      </div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={()=>onAdd(count)} disabled={stock<=0}>Agregar al carrito</button>
      </div>
    </div>
  )
}
