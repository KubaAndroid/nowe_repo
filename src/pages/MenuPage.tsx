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

  const {
    getAllMenuItems,
    allMenuItems,
    filteredMenuItems,
    setFilteredMenuItems,
    sortMenuItemsByPrice,
    filterMenuItems,
    searchMenuItems
  } = useOrderContext()

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItem>(allMenuItems[0]);

  useEffect(() => {
    const getMenuItems = async () => {
      await getAllMenuItems()
      setFilteredMenuItems(filteredMenuItems)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])
  
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
                }}>Asc</button>
                
                <button onClick={() => {
                sortMenuItemsByPrice(false)
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
                Search: <input
                  type="text"
                  placeholder="search for a dish"
                  onChange={(e) => {
                    searchMenuItems(e.target.value)
                  }} />
              </div>
            </div>

            <h1>Menu</h1>
            <MenuList
              items={filteredMenuItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem}
            />
            
          </div>
        )}
      </>
    )
  }
  
}

export default MenuPage