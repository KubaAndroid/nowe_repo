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
      <div className={styles.list}>
      {items.map((item, index) =>
        <MenuItemLayout
          key={item.id}
          menuItem={item}
          index={index}
          setIsModalOpen={setIsModalOpen}
          setCurrentItem={setCurrentItem}
      />)}
    </div>
  )
}

export default MenuList