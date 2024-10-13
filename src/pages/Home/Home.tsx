import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/product';
import Navigationbar from '../../components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import ProductModal from '../../components/ProductInformation/ProductInformation';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);

  const isInCart = (id: number) => cart.some(item => item.id === id);

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

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container my-4">
      <Navigationbar />

      <div className="container my-4">
        <div className="jumbotron bg-light p-5 text-center">
          <h1 className="display-4">Welcome to Our Store!</h1>
          <p className="lead">Get the best products at amazing prices.</p>
          <a href="/shop" className="btn btn-primary btn-lg">Shop Now</a>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

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
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => handleShowModal(product)}
                  >
                    View Details
                  </button>
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
      </div>

      {/* Product Modal */}
      <ProductModal show={showModal} product={selectedProduct} onClose={handleCloseModal} />

      <footer className="bg-light p-3 text-center">
        <p>&copy; 2024 Web Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
