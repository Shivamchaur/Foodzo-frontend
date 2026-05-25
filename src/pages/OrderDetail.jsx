import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      if (!token) {
        setError('Login required to view order');
        setStatus('ready');
        return;
      }
      const response = await fetch(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'Unable to fetch order');
      } else {
        setOrder(result);
      }
      setStatus('ready');
    };
    loadOrder();
  }, [id, token]);

  if (status === 'loading') return <div className="empty-state">Loading order details...</div>;
  if (error) return <div className="empty-state">{error}</div>;
  if (!order) return <div className="empty-state">Order not found.</div>;

  return (
    <section className="order-detail-page">
      <h2>Order detail</h2>
      <div className="order-detail-card">
        <div className="order-meta">
          <p>Order ID: {order._id}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
        </div>
        <div>
          <h3>Items</h3>
          {order.items.map((item, index) => (
            <div className="order-item" key={item._id || item.product?._id || index}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>Qty: {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-meta">
          <h3>Shipping</h3>
          <p>{order.shippingInfo.address}</p>
          <p>{order.shippingInfo.city}</p>
          <p>{order.shippingInfo.phone}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
