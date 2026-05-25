import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      if (!token) {
        setError('Login required to view orders');
        setStatus('ready');
        return;
      }
      const response = await fetch('/api/orders/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'Unable to load orders');
      } else {
        setOrders(result);
      }
      setStatus('ready');
    };
    loadOrders();
  }, [token]);

  if (status === 'loading') {
    return <div className="empty-state">Loading orders...</div>;
  }

  if (error) {
    return <div className="empty-state">{error}</div>;
  }

  return (
    <section className="orders-page">
      <h2>My orders</h2>
      {orders.length === 0 ? (
        <div className="empty-state">You have not placed any orders yet.</div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <article key={order._id} className="order-card">
              <h3>Order #{order._id.slice(-6)}</h3>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <Link className="button button-secondary" to={`/orders/${order._id}`}>View details</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
