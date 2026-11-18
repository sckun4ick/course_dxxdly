import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/logo_sait.png';
import twitterIcon from '../../assets/logos/Vector.svg';
import discordIcon from '../../assets/logos/Vector-1.svg';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_center">
        <div className="footer_logo_wrap">
          <NavLink to="/" className="footer_logo_link">
            <img src={logo} alt="dYdX grants" className="footer_logo" />
          </NavLink>
        </div>

        <nav className="footer_nav">
          <NavLink to="/about" className="footer_link">
            About
          </NavLink>
          <NavLink to="/faq" className="footer_link">
            FAQ
          </NavLink>
          <NavLink to="/brand-assets" className="footer_link">
            Brand assets
          </NavLink>
          <a 
            href="https://dydx.foundation" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer_link external"
          >
            dYdX Foundation ↗
          </a>
          <a 
            href="#" 
            className="footer_link external"
          >
            dYdX trading ↗
          </a>
        </nav>

        <div className="footer_socials">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer_social_link"
            aria-label="Twitter"
          >
            <img src={twitterIcon} alt="" className="footer_social_icon" />
          </a>
          <a 
            href="https://discord.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer_social_link"
            aria-label="Discord"
          >
            <img src={discordIcon} alt="" className="footer_social_icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
