import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <p>{product.product_name}</p>
              <p>{product.regular_price}</p>
              <img src={`https://ecom.bicharachar.com/${product?.photo[0]?.file_path}`} alt={product.product_name} />
              <button onClick={() => dispatch(removeFromCart(product.id))}>
                Remove
              </button>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default Cart;
