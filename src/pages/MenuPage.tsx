import { useCallback, useEffect, useState } from "react"
import MenuList from "../components/menu/MenuList";
import { MenuItem } from "../model/MenuItemModel";
import MenuModal from '../components/menu/MenuModal'
import { MenuCategory } from "../model/MenuCategoryModel";
import styles from '../components/menu/MenuPage.module.css'
import { useOrderContext } from "../store/OrdersContext";
import fireIcon from '../assets/img/fire.png';
import vegeIcon from '../assets/img/plant.png';
import noLactoseIcon from '../assets/img/vegan.png';
import allCategoriesIcon from '../assets/img/food.png';

const MenuPage = () => {

  const { getAllMenuItems, allMenuItems, filteredMenuItems } = useOrderContext()

  const [menuItems, setMenuItems] = useState<MenuItem[]>(allMenuItems);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(filteredMenuItems);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItem>(menuItems[0]);

  const [, updateState] = useState<object>({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchedMenuItems = await getAllMenuItems()
      setMenuItems(fetchedMenuItems.sort((a: MenuItem, b: MenuItem) => a.name > b.name ? 1 : -1))
      setFilteredItems(fetchedMenuItems)
      console.log(filteredItems)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])

  const filterMenuItems = (filterBy: string) => {
    if (filterBy === 'all') {
      setFilteredItems(menuItems)
      return
    }
    const filteredResults = menuItems.filter(item => item.category === filterBy)
    setFilteredItems(filteredResults)
  }

  function sortMenuItemsByPrice(ascending: Boolean): void {
    if (ascending) {
      const sortedByPriceAsc = filteredItems.sort((a: MenuItem, b: MenuItem) => a.price > b.price ? 1 : -1)
      setFilteredItems(sortedByPriceAsc)
    } else {
      const sortedByPriceDesc = filteredItems.sort((a: MenuItem, b: MenuItem) => a.price < b.price ? 1 : -1)
      setFilteredItems(sortedByPriceDesc)
    }
  }
  
  if (isLoading) {
    return <div>Loading</div>
  } else {
    return (
      <>
        {isModalOpen ? (<MenuModal menuItem={currentlySelectedMenuItem} openedModal={setIsModalOpen} />) : (
          <div className={styles.background}>
            <div className={styles.categoryButtons}>
              <div>
                Sort by price:
                <button onClick={() => {
                sortMenuItemsByPrice(true)
                forceUpdate()
                }}>Asc</button>
                
                <button onClick={() => {
                sortMenuItemsByPrice(false)
                forceUpdate()
                }}>Desc</button>

              </div>

              <div>
                <button onClick={() => filterMenuItems(MenuCategory.all)}>
                  <img src={allCategoriesIcon} className={styles.categoryIcons} alt="" /> All</button>
                <button onClick={() => filterMenuItems(MenuCategory.spicy)}>
                  <img src={fireIcon} className={styles.categoryIcons} alt="" /> Spicy
                </button>
                <button onClick={() => filterMenuItems(MenuCategory.vege)}>
                  <img src={vegeIcon} className={styles.categoryIcons} alt="" /> Vege
                </button>
                <button onClick={() => filterMenuItems(MenuCategory.lactoseFree)}>
                  <img src={noLactoseIcon} className={styles.categoryIcons} alt="" /> Lactose free
                </button>
              </div>
            </div>

            <div className={styles.categoryButtons}>
              <div>
                search: <input type="text" placeholder="search for a dish" />
              </div>
            </div>

            <h1>Menu</h1>
            <h2>Today's recommendations:</h2>
            <MenuList
              items={filteredItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem} />
          </div>
        )}
      </>
    )
  }
  
}

export default MenuPage