import React from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import MenuItemLayout from './MenuItemLayout'
import styles from './MenuList.module.css'

interface MenuType {
  items: MenuItem[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>
}

function MenuList({ items, setIsModalOpen }: MenuType) {
  return (
      <ul className={styles.list}>
          {items.map((item) => <MenuItemLayout key={item.id} menuItem={ item } setIsModalOpen={setIsModalOpen} />)}
    </ul>
  )
}

export default MenuList