import { useEffect, useState } from "react"
import MenuList from "../components/menu/MenuList";
import { MenuItem } from "../model/MenuItemModel";
import MenuModal from '../components/menu/MenuModal'


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  useEffect(() => {
    const getMenuItems = async() => {
      const fetchedMenuItems = await fetchMenuItems()
      setMenuItems(fetchedMenuItems)
      setIsLoading(false)
      setIsModalOpen(false)
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
      <>
        {isModalOpen ? (<MenuModal openedModal={setIsModalOpen} />) : (
          <section>
            <h1>Menu</h1>
            <h2>Today's recommendations:</h2>
            <MenuList items={menuItems} setIsModalOpen={setIsModalOpen} />
          </section>
        )}
      </>
    )
  }
  
}

export default MenuPage