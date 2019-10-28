import React, { useState } from 'react';
import './Header.scss';

type HeaderProps = {
  items: any[];
  onMenuClick: (item: any) => void;
  pageTitle: string;
  currentPage?: string;
};

const Header = (props: HeaderProps) => {
  const [menuOpen, openMenu] = useState(false);

  return (
    <header>
      <nav className="nav-header">
        <h1 className="nav-header__title">{props.pageTitle}</h1>

        <div
          className={
            'nav-header__hamburger' +
            (menuOpen ? ' nav-header__hamburger--opened' : '')
          }
          onClick={() => openMenu(!menuOpen)}
        >
          <div className="line"></div>
          <div className="line">
            <div className="rotator"></div>
          </div>
          <div className="line"></div>
        </div>
        <ul
          className={
            'nav-header__menu' + (menuOpen ? ' nav-header__menu--opened' : '')
          }
        >
          {props.items.map(item => (
            <li
              key={item.id}
              className={
                item.id === props.currentPage
                  ? 'nav-header__menu-item nav-header__menu-item--active'
                  : 'nav-header__menu-item'
              }
              onClick={() => {
                props.onMenuClick(item);
                openMenu(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
