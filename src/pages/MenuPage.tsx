import { useEffect, useState } from "react"
import MenuList from "../components/menu/MenuList";
import { MenuItem } from "../model/MenuItemModel";
import MenuModal from '../components/menu/MenuModal'
import { MenuCategory } from "../model/MenuCategoryModel";
import styles from '../components/menu/MenuPage.module.css'
// import { useOrderContext } from "../store/OrdersContext";
import fireIcon from '../assets/img/fire.png';
import vegeIcon from '../assets/img/plant.png';
import noLactoseIcon from '../assets/img/vegan.png';
import allCategoriesIcon from '../assets/img/food.png';

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
          <div className={styles.background}>
            <div className={styles.categoryButtons}>
              <button onClick={() => filterMenuItems(MenuCategory.all)}>
                <img src={allCategoriesIcon} className={styles.categoryIcons} alt="" /> All</button>
              <button onClick={() => filterMenuItems(MenuCategory.spicy)}>
                <img src={fireIcon} className={styles.categoryIcons} alt="" /> Spicy
              </button>
              <button onClick={() => filterMenuItems(MenuCategory.vege)}>
                <img src={vegeIcon} className={styles.categoryIcons} alt="" /> Vege
              </button>
              <button onClick={() => filterMenuItems(MenuCategory.lactose_free)}>
                <img src={noLactoseIcon} className={styles.categoryIcons} alt="" /> Lactose free
              </button>
            </div>
            <div> 
              <button onClick={() => sortMenuItemsByPrice(true)}>Sort by price asc</button>
              <button onClick={() => sortMenuItemsByPrice(false)}>Sort by price desc</button>
            </div>
            <h1>Menu</h1>
            {/* TODO: add styles to buttons, center them */}
            
            <h2>Today's recommendations:</h2>
            <MenuList
              items={filteredMenuItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem} />
          </div>
        )}
      </>
    )
  }
  
}

export default MenuPage