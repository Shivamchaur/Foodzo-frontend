import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const loadRecipes = async () => {
      const response = await fetch('/api/recipes');
      const result = await response.json();
      setRecipes(result);
      setStatus('ready');
    };
    loadRecipes();
  }, []);

  return (
    <section className="recipes-page">
      <h2>Cooking recipes</h2>
      {status === 'loading' ? (
        <div className="empty-state">Loading recipes...</div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <article className="recipe-card" key={recipe._id || recipe.title}>
              <img src={recipe.image} alt={recipe.title} />
              <div>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <Link className="button button-secondary" to={`/recipes/${recipe._id || recipe.title.toLowerCase().replace(/\s+/g, '-')}`}>Read recipe</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Recipes;
