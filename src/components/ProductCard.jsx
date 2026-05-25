const ProductCard = ({ product, onAdd }) => {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <div>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
        </div>
        <p>{product.description}</p>
        <div className="card-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <button onClick={() => onAdd(product)}>Add</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
