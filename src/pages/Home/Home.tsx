import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/product';
import Navigationbar from '../../components/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addToCart } from '../../store/slices/cartSlice';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);

  // Check if a product is already in the cart
  const isInCart = (id: number) => cart.some(item => item.id === id);

  // Log the cart content to the console
  const handleTestClick = () => {
    console.log('Cart Products:', cart);
  };

  // Add to cart function
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-4">
      {/* Navbar */}
      <Navigationbar />

      {/* Hero Section */}
      <div className="container my-4">
        <div className="jumbotron bg-light p-5 text-center">
          <h1 className="display-4">Welcome to Our Store!</h1>
          <p className="lead">Get the best products at amazing prices.</p>
          <a href="/shop" className="btn btn-primary btn-lg">Shop Now</a>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Featured Products */}
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row">
          {products.slice(0, 6).map(product => (
            <div className="col-md-4 col-sm-6" key={product.id}>
              <div className="card mb-4">
                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Test Button */}
        <div className="text-center my-4">
          <button className="btn btn-secondary" onClick={handleTestClick}>
            Test: Show Cart in Console
          </button>
        </div>
      </div>
      <footer className="bg-light p-3 text-center">
        <p>&copy; 2024 Web Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;