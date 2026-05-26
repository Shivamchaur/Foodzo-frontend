import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const loadRecipe = async () => {
      const response = await fetch(`api/recipes/${id}`);
      const result = await response.json();
      setRecipe(result);
      setStatus('ready');
    };
    loadRecipe();
  }, [id]);

  if (status === 'loading') return <div className="empty-state">Loading recipe...</div>;
  if (!recipe || recipe.message) return <div className="empty-state">Recipe not found.</div>;

  return (
    <section className="recipe-detail-page">
      <div className="recipe-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
      </div>
      <div className="recipe-body">
        <div>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetail;
