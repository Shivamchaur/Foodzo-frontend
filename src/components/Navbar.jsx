import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="nav-bar">
      <div className="nav-brand">
        <Link to="/">Foodzo</Link>
        
      </div>
      <nav className="nav-links">
        <Link to="/products">Menu</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
        {user ? (
          <>
            <span style={{ fontWeight: '600', color: '#2563eb' }}>Hi, {user.name}</span>
            <Link to="/orders">Orders</Link>
            <button className="link-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
