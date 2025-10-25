import React from 'react'
import Item from './Item'

export default function ItemList({ items }){
  return (
    <div className="container">
      <div className="item-list">
        {items.map(item => <Item key={item.id} item={item} />)}
      </div>
    </div>
  )
}
