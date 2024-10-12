import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks/hooks';
import { removeFromCart, clearCart } from '../../store/slices/cartSlice';
import Navigationbar from '../../components/Navbar';

const CartPage: React.FC = () => {
  const cart = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();


  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleTestClick = () => {
    console.log('Cart Products:', cart);
  };

  return (
    <div className="container my-4">
      <Navigationbar/>
      <div className="text-center my-4">
        <button className="btn btn-secondary" onClick={handleTestClick}>
          Test: Show Cart in Console
        </button>
      </div>
      <h1>Your Cart</h1>

      {/* Cart is empty */}
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty. <Link to="/shop">Go to shop</Link>
        </div>
      ) : (
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total price */}
          <div className="text-right">
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
          </div>

          {/* Clear cart button */}
          <div className="text-right">
            <button className="btn btn-warning" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="btn btn-primary ml-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;