import React from 'react'
import { MenuItem } from '../../model/MenuItem'
import MenuItemLayout from './MenuItemLayout'
import styles from './MenuList.module.css'

interface MenuType {
    items: MenuItem[]
}

function MenuList({ items }: MenuType) {
  return (
      <ul className={styles.list}>
          {items.map((item) => <MenuItemLayout key={item.id} menuItem={ item } />)}
    </ul>
  )
}

export default MenuList