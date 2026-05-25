import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [status, setStatus] = useState('loading');
  const { addToCart } = useCart();

  const categories = useMemo(() => ['all', ...new Set(products.map((product) => product.category))], [products]);

  const loadProducts = async () => {
    setStatus('loading');
    const query = new URLSearchParams();
    if (searchText) query.set('search', searchText);
    if (category && category !== 'all') query.set('category', category);
    const response = await fetch(`/api/products?${query.toString()}`);
    const data = await response.json();
    setProducts(data);
    setStatus('ready');
  };

  useEffect(() => {
    loadProducts();
  }, [searchText, category]);

  useEffect(() => {
    const params = {};
    if (searchText) params.search = searchText;
    if (category) params.category = category;
    setSearchParams(params);
  }, [searchText, category, setSearchParams]);

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <h2>Food menu</h2>
          <p>Search for your favorite dish and choose from fresh options.</p>
        </div>
        <div className="filters-row">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      {status === 'loading' ? (
        <div className="empty-state">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">No products found.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id || product.name} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
