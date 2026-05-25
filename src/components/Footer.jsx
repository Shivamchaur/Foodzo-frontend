import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner page-container">
        <div className="footer-brand">
          <h3>Foodzo</h3>
          <p>Fresh food & recipes — delivered and made at home.</p>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <Link to="/products">Menu</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <div className="footer-meta">
          <div>Contact: support@foodzo.example</div>
          <small>© {new Date().getFullYear()} Foodzo. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;