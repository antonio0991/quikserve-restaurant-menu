import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Section } from '../../models/IMenu';
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
    <div>
      <NavBar venue={venueState.venue} />
      <img src={venueState.venue?.webSettings.bannerImage} alt="Banner" />
      <div className="main-body">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="menu-wrapper">
          <div className="menu">
            <MenuHeader sections={menuState.menu?.sections} />
            <div className="sections">
              {sections && <AccordionComponent sections={sections} />}
            </div>
          </div>
          <Cart></Cart>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
