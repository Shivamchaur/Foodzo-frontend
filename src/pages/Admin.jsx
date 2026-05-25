import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Admin = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    inStock: true,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    loadProducts();
    loadOrders();
  }, [token]);

  const loadProducts = async () => {
    const response = await fetch('/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (response.ok) setProducts(result);
  };

  const loadOrders = async () => {
    const response = await fetch('/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (response.ok) setOrders(result);
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || 'Unable to create product');
      return;
    }
    setForm({ name: '', description: '', category: '', price: '', image: '', inStock: true });
    setMessage('Product created successfully');
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || 'Unable to delete product');
      return;
    }
    setMessage(result.message);
    loadProducts();
  };

  const handleChangeStatus = async (orderId, status) => {
    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || 'Unable to update order');
      return;
    }
    setMessage('Order updated');
    loadOrders();
  };

  if (!user) return <div className="empty-state">Please login as admin.</div>;
  if (!user.isAdmin) return <div className="empty-state">Admin access required.</div>;

  return (
    <section className="admin-page">
      <h2>Admin dashboard</h2>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Add product</h3>
          <form onSubmit={handleCreateProduct}>
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <label>Category</label>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <label>Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />

            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <label>
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              />
              In stock
            </label>

            <button type="submit">Create product</button>
          </form>
          {message && <p className="form-success">{message}</p>}
          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="admin-card">
          <h3>Products</h3>
          {products.length === 0 ? (
            <div className="empty-state">No products found</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <article key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 32 }}>
        <h3>Orders</h3>
        {orders.length === 0 ? (
          <div className="empty-state">No orders yet</div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <article key={order._id} className="order-card">
                <p><strong>Order:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <div className="order-meta">
                  <button onClick={() => handleChangeStatus(order._id, 'Pending')}>Pending</button>
                  <button onClick={() => handleChangeStatus(order._id, 'Shipped')}>Shipped</button>
                  <button onClick={() => handleChangeStatus(order._id, 'Completed')}>Completed</button>
                  <button onClick={() => handleChangeStatus(order._id, 'Cancelled')}>Cancel</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;