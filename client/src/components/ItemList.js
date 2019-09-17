import React from 'react'
import Item from './Item'

const ItemList = ({items, deleteItem, editItem}) => (

  <div>
    {items.map(item => (
      <Item key={item.id} item={item} editItem={editItem} deleteItem={deleteItem}/>
    ))}
  </div>

)
export default ItemList