import React from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../../../models/IMenu';
import { RootState } from '../../../redux/store';
import {
  addToCart,
  getCartItems,
  getTotalPrice,
  removeFromCart,
} from '../../../slices/cart.slice';
import { formatCurrency } from '../../../utils/formatUtil';
import './Cart.css';
interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const items = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalPrice);
  const venueState = useSelector((state: RootState) => state.venue);
  const dispatch = useDispatch();

  const addToCartHandler = (item: Item) => dispatch(addToCart(item));
  const removeFromCartHandler = (item: Item) =>
    dispatch(removeFromCart(item.id));

  return (
    <div className="cart">
      <div className="cart-title">
        <h3>Carrinho</h3>
      </div>
      <div className="cart-body">
        {items.length > 0 ? (
          <div className="items-list">
            <>
              {items.map((item) => (
                <div>
                  <div className="item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <div className="buttons">
                    <IoIosRemoveCircle
                      style={{
                        color:
                          venueState.venue?.webSettings.navBackgroundColour,
                        cursor: 'pointer',
                      }}
                      onClick={() => removeFromCartHandler(item)}
                    />
                    <span className="amount">{item.amount}</span>
                    <IoIosAddCircle
                      style={{
                        color:
                          venueState.venue?.webSettings.navBackgroundColour,
                        cursor: 'pointer',
                      }}
                      onClick={() => addToCartHandler(item)}
                    />
                  </div>
                </div>
              ))}
              <div className="total">
                <span className="total-text">Total:</span>
                <span className="total-price">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </>
          </div>
        ) : (
          <div className="cart-empty">
            <h6>Seu carrinho está vazio</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
