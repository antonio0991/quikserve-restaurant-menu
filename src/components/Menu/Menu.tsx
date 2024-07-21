import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item, Section } from '../../models/IMenu';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchMenu } from '../../slices/menu.slice';
import { fetchVenue } from '../../slices/venue.slice';
import { ErrorComponent } from '../Loading/Error';
import { LoadingComponent } from '../Loading/Loading';
import AccordionComponent from './Accordion/AccordionComponent';
import Cart from './Cart/Cart';
import './Menu.css';
import MenuHeader from './MenuHeader/MenuHeader';
import NavBar from './NavBar/NavBar';
import SearchBar from './SearchBar/SearchBar';
import Basket from './Basket/Basket';

interface MenuComponentProps {}

const MenuComponent: React.FC<MenuComponentProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const venueState = useSelector((state: RootState) => state.venue);
  const menuState = useSelector((state: RootState) => state.menu);

  const [filter, setFilter] = useState('');
  const [sections, setSections] = useState<Section[] | null>(null);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchVenue());
  }, [dispatch]);

  useEffect(() => {
    if (menuState.menu) {
      setSections(filterSections(menuState.menu.sections, filter));
    }
  }, [filter, menuState.menu]);

  const filterSections = (sections: Section[], filter: string): Section[] => {
    if (!sections) return [];

    const visibleSections = sections.filter((section) => section.visible);

    const filteredSections = visibleSections
      .map((section) => {
        const filteredItems = section.items.map((item) => ({
          ...item,
          visible: item.name.toLowerCase().includes(filter.toLowerCase())
            ? 1
            : null,
        }));
        const hasVisibleItems = filteredItems.some((item) => item.visible);

        return {
          ...section,
          items: filteredItems,
          visible: hasVisibleItems ? 1 : null,
        };
      })
      .filter((section) => section.visible) as Section[];

    return filteredSections;
  };

  if (venueState.status === 'loading' || menuState.status === 'loading') {
    return <LoadingComponent />;
  }

  if (venueState.status === 'failed' || menuState.status === 'failed') {
    return <ErrorComponent error={venueState.error || menuState.error} />;
  }

  return (
    <div style={{width: '100%'}}>
      <NavBar venue={venueState.venue} />
      <img src={venueState.venue?.webSettings.bannerImage} alt="Banner"  style={{width: '100%'}}/>
      <div className="main-body">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="menu-wrapper">
          <div className="menu">
            <MenuHeader sections={menuState.menu?.sections} setSection={setSections}/>
            <div className="sections">
              {sections && <AccordionComponent sections={sections}/>}
            </div>
          </div>
          <div className="cartCard">
            <Cart></Cart>
          </div>
          <div className='footer-mobile'>
            <Basket></Basket>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuComponent;
