import React from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import MenuItemLayout from './MenuItemLayout'
import styles from './MenuList.module.css'

interface MenuType {
  items: MenuItem[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>
  setCurrentItem: React.Dispatch<React.SetStateAction<MenuItem>>
}

function MenuList({ items, setIsModalOpen, setCurrentItem }: MenuType) {
  return (
      <ul className={styles.list}>
      {items.map((item) => <MenuItemLayout
        key={item.id}
        menuItem={item}
        setIsModalOpen={setIsModalOpen}
        setCurrentItem={setCurrentItem}
      />)}
    </ul>
  )
}

export default MenuList