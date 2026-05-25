import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <section className="cart-page">
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link className="button" to="/products">Browse menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-meta">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button className="link-button danger" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order summary</h3>
            <p>Total items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p>Total price: ${cartTotal.toFixed(2)}</p>
            <button className="button" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
