import { useEffect, useState } from "react"
import MenuList from "../components/menu/MenuList";
import { MenuItem } from "../model/MenuItemModel";


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    const getMenuItems = async() => {
      const fetchedMenuItems = await fetchMenuItems()
      setMenuItems(fetchedMenuItems)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    const res = await fetch('http://localhost:5000/menuItems')
    const data = await res.json()
    return data
  }

  if (isLoading) {
    return <div>Loading</div> // TODO: add style to loading? or remove loading?
  } else {
    return (
      <section>
        <h1>Menu</h1>
        <h2>Today's recommendations</h2>
        <MenuList items={menuItems} />
      </section>
    )
  }
  
}

export default MenuPage