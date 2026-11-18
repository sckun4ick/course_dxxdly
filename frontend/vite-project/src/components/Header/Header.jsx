import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/logo_sait.png';
import './Header.scss';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header_center">
        <NavLink to="/" className="header_logo" onClick={closeMenu}>
          <img src={logo} alt="dYdX grants" className="header_logo_img" />
        </NavLink>

        <nav className="header_nav">
          <NavLink 
            to="/initiatives" 
            className={({ isActive }) => `header_nav_link ${isActive ? 'active' : ''}`}
          >
            Discover initiatives
          </NavLink>
          <NavLink 
            to="/funded-grants" 
            className={({ isActive }) => `header_nav_link ${isActive ? 'active' : ''}`}
          >
            Funded grants
          </NavLink>
          <NavLink 
            to="/program-expenses" 
            className={({ isActive }) => `header_nav_link ${isActive ? 'active' : ''}`}
          >
            Program expenses
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => `header_nav_link ${isActive ? 'active' : ''}`}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/faq" 
            className={({ isActive }) => `header_nav_link ${isActive ? 'active' : ''}`}
          >
            FAQ
          </NavLink>
        </nav>

        <div className="header_actions">
          <button className="header_apply_btn">
            Apply for grant
          </button>
          
          <button 
            className={`header_burger ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="burger_line"></span>
            <span className="burger_line"></span>
            <span className="burger_line"></span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="header_mobile_menu">
          <nav className="header_mobile_nav">
            <NavLink to="/initiatives" className="header_mobile_link" onClick={closeMenu}>
              Discover initiatives
            </NavLink>
            <NavLink to="/funded-grants" className="header_mobile_link" onClick={closeMenu}>
              Funded grants
            </NavLink>
            <NavLink to="/program-expenses" className="header_mobile_link" onClick={closeMenu}>
              Program expenses
            </NavLink>
            <NavLink to="/blog" className="header_mobile_link" onClick={closeMenu}>
              Blog
            </NavLink>
            <NavLink to="/faq" className="header_mobile_link" onClick={closeMenu}>
              FAQ
            </NavLink>
            <button className="header_mobile_apply_btn" onClick={closeMenu}>
              Apply for grant
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
