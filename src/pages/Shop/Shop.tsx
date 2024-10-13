import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../types/Product';
import { getProductsPaginated } from '../../services/product';
import Navigationbar from '../../components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import ProductModal from '../../components/ProductInformation/ProductInformation';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(false);  // Loading state
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  const productsPerPage = 12;

  const isInCart = (id: number) => cart.some(item => item.id === id);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const { products, total } = await getProductsPaginated(productsPerPage, skip); 
        setProducts(products);
        setTotalPages(Math.ceil(total / productsPerPage));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container my-4">
      <Navigationbar />

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="container">
        <h2 className='m-3'>Products</h2>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {products.map(product => (
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

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </li>
        </ul>
      </nav>

      {/* Product Modal */}
      <ProductModal show={showModal} product={selectedProduct} onClose={handleCloseModal} />

      <footer className="bg-light p-3 text-center">
        <p>&copy; 2024 Web Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Shop;
