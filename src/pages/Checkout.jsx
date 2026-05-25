import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!token) {
      setError('Please login before placing an order.');
      return;
    }
    if (!address || !city || !phone) {
      setError('Please complete shipping details.');
      return;
    }
    if (!cart.length) {
      setError('Your cart is empty.');
      return;
    }

    const items = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, shippingInfo: { address, city, phone }, total: cartTotal }),
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.message || 'Could not place order');
      return;
    }

    clearCart();
    setSuccess('Order placed successfully! Redirecting...');
    setTimeout(() => navigate(`/orders/${result._id}`), 1200);
  };

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <div className="checkout-form">
          <h3>Shipping details</h3>
          <form onSubmit={handleSubmit}>
            <label>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} required />
            <label>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} required />
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <button type="submit">Place order</button>
          </form>
        </div>
        <div className="checkout-summary">
          <h3>Order total</h3>
          <p>{cart.length} items</p>
          <p>${cartTotal.toFixed(2)}</p>
          <p>Make sure your shipping details are correct.</p>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
