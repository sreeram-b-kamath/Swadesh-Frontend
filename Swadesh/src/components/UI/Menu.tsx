// Menu.tsx
import React, { useState } from 'react';

// Define types for the menu items
interface MenuItem {
  label: string;
  subMenu?: MenuItem[];
}

// Define the menu data
const menuData: MenuItem[] = [
  {
    label: 'Item 1',
    subMenu: [
      { label: 'Sub Item 1-1' },
      { label: 'Sub Item 1-2' },
    ],
  },
  {
    label: 'Item 2',
    subMenu: [
      { label: 'Sub Item 2-1' },
      { label: 'Sub Item 2-2' },
    ],
  },
  {
    label: 'Item 3',
  },
];

// Define the MenuItemComponent
const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div 
        onClick={handleClick} 
        style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ccc' }}
      >
        {item.label}
      </div>
      {isOpen && item.subMenu && (
        <div style={{ paddingLeft: '20px' }}>
          {item.subMenu.map((subItem, index) => (
            <MenuItemComponent key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

// Define the Menu component
const Menu: React.FC = () => {
  return (
    <div>
      {menuData.map((item, index) => (
        <MenuItemComponent key={index} item={item} />
      ))}
    </div>
  );
};

export default Menu;
