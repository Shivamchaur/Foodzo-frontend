import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import Recipes from './pages/Recipes.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Footer from './components/Footer.jsx';
import Admin from './pages/Admin.jsx';

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes future={{ v7_relativeSplatPath: true }}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="empty-state"><h2>Page not found</h2><p>Use the menu to continue shopping.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
