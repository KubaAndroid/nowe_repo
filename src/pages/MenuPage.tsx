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
    sortMenuItemsByPrice
  } = useOrderContext()

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentlySelectedMenuItem, setCurrentlySelectedMenuItem] = useState<MenuItem>(allMenuItems[0]);

  const [searchQuery, setSearchQuery] = useState<string>("")

  // const [myFilteredMenuItems, setMyFilteredMenuItems] = useState<MenuItem[]>(filteredMenuItems)


  const [, updateState] = useState<object>({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const getMenuItems = async () => {
      await getAllMenuItems()
      // setMyFilteredMenuItems(filteredMenuItems)
      setFilteredMenuItems(filteredMenuItems)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])

  const filterMenuItems = (filterBy: string) => {
    if (filterBy === 'all') {
      setFilteredMenuItems(allMenuItems)
      return
    }
    const filteredResults = allMenuItems.filter(item => item.category === filterBy)
    // setFilteredMenuItems(filteredResults)

    setFilteredMenuItems(filteredResults)
  }

  const searchMenuItems = (query: string) => {
    // TODO: cannot filter FILTERED MENU ITEMS, because there 
    let queriedItems = allMenuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    setFilteredMenuItems(queriedItems)

    // let queriedItems = filteredMenuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    // setMyFilteredMenuItems(queriedItems)
    // forceUpdate()
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
                    setSearchQuery(e.target.value)
                    searchMenuItems(searchQuery)
                  }} />
              </div>
            </div>

            <h1>Menu</h1>
            {/* <h2>Today's recommendations:</h2> */}

            {/* TODO: myFilteredMenuItems is empty at this point */}
            <MenuList
              items={filteredMenuItems}
              setIsModalOpen={setIsModalOpen}
              setCurrentItem={setCurrentlySelectedMenuItem}
              searchQuery={searchQuery}
            />
            
          </div>
        )}
      </>
    )
  }
  
}

export default MenuPage