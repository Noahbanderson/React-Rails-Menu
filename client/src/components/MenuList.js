import React from 'react'
import Menu from './Menu'

const MenuList = ({menus, editMenu, deleteMenu}) => (

    <div> 
        {menus.map(menu => (
            <Menu key={menu.id} menu={menu} editMenu={editMenu} deleteMenu={deleteMenu} />
        ))}
    </div>
)


export default MenuList