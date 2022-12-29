import { useEffect, useState } from "react"
import MenuList from "../components/menu/MenuList";
import { MenuItem } from "../model/MenuItemModel";
import MenuModal from '../components/menu/MenuModal'
import { MenuCategory } from "../model/MenuCategoryModel";
// import { useOrderContext } from "../store/OrdersContext";


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItem>(menuItems[0]);

  // const { getAllMenuItems } = useOrderContext()
  // useEffect(() => {
  //   const getMenuItems = async () => {
  //     setMenuItems(await getAllMenuItems())
  //     setIsLoading(false)
  //   }
  //   getMenuItems()
  // }, [])


  useEffect(() => {
    const getMenuItems = async() => {
      const fetchedMenuItems = await fetchMenuItems()
      setMenuItems(fetchedMenuItems.sort((a: MenuItem, b: MenuItem) => a.name > b.name ? 1 : -1))
      setFilteredMenuItems(fetchedMenuItems)
      setIsLoading(false)
      // setIsModalOpen(false)
    }
    getMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    const res = await fetch('http://localhost:5000/menuItems')
    const data = await res.json()
    return data
  }

  const filterMenuItems = (filterBy: string) => {
    if (filterBy === 'all') {
      setFilteredMenuItems(menuItems)
      return
    }
    const filteredResults = menuItems.filter(item => item.category === filterBy)
    setFilteredMenuItems(filteredResults)
  }

  const sortMenuItemsByPrice = (ascending: Boolean) => {
    ascending ?
      console.log(filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price > b.price ? 1 : -1))
      : console.log(filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price < b.price ? 1 : -1))
    //   setFilteredMenuItems(filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price < b.price ? 1 : -1))
    // : setFilteredMenuItems(filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price > b.price ? 1 : -1))
  }
  
  if (isLoading) {
    return <div>Loading</div> // TODO: add style to loading? or remove loading?
  } else {
    return (
      <>
        {isModalOpen ? (<MenuModal menuItem={currentlySelectedMenuItem} openedModal={setIsModalOpen} />) : (
          <section>
            <h1>Menu</h1>
            {/* TODO: add styles to buttons, center them */}
            <div> 
              <button onClick={() => filterMenuItems(MenuCategory.all)}>All</button>
              <button onClick={() => filterMenuItems(MenuCategory.spicy)}>Spicy</button>
              <button onClick={() => filterMenuItems(MenuCategory.vege)}>Vege</button>
              <button onClick={() => filterMenuItems(MenuCategory.lactose_free)}>Lactose free</button>
            </div>
            <div> 
              <button onClick={() => sortMenuItemsByPrice(true)}>Sort by price asc</button>
              <button onClick={() => sortMenuItemsByPrice(false)}>Sort by price desc</button>
            </div>
            <h2>Today's recommendations:</h2>
            <MenuList
              items={filteredMenuItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem} />
          </section>
        )}
      </>
    )
  }
  
}

export default MenuPage