import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setProducts([]));

    fetch('/api/recipes')
      .then((r) => r.json())
      .then((data) => setRecipes(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setRecipes([]));
  }, []);

  return (
    <section className="home-page">
      <div className="hero-panel">
        <div>
          <h1>Delicious food delivered fast</h1>
          <p>Browse our menu, order your favorites, and try cooking recipes at home.</p>
          <div className="hero-actions">
            <Link className="button" to="/products">Order Now</Link>
            <Link className="button button-secondary" to="/recipes">Explore Recipes</Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.length
            ? products.map((p) => <ProductCard key={p._id || p.name} product={p} onAdd={() => {}} />)
            : <div className="empty-state">No products to show right now.</div>}
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <h2>Featured Recipes</h2>
        <div className="recipe-grid">
          {recipes.length ? recipes.map((r) => (
            <article className="recipe-card" key={r._id || r.title}>
              <img src={r.image} alt={r.title} />
              <div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <div style={{ marginTop: 8 }}>
                  <Link to={`/recipes/${r._id || ''}`}>View recipe</Link>
                </div>
              </div>
            </article>
          )) : <div className="empty-state">No recipes available.</div>}
        </div>
      </div>
    </section>
  );
};

export default Home;