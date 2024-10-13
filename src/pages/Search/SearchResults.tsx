import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../types/Product';
import Navigationbar from '../../components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import ProductModal from '../../components/ProductInformation/ProductInformation';
import { useLocation } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);

  // The search results passed via location.state from the navigation
  const products = location.state?.products || [];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isInCart = (id: number) => cart.some(item => item.id === id);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

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

      <div className="container">
        <h2 className='m-3'>Search Results</h2>

        {products.length === 0 ? (
          <div className="alert alert-warning text-center">
            No products found for your search.
          </div>
        ) : (
          <div className="row">
            {products.map((product: Product) => (
              <div className="col-lg-3 col-sm-6" key={product.id}>
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
        )}
      </div>

      {/* Product Modal */}
      <ProductModal show={showModal} product={selectedProduct} onClose={handleCloseModal} />

      <footer className="bg-light p-3 text-center">
        <p>&copy; 2024 Web Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SearchResults;
