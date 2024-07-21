import React from 'react';
import { Button } from 'react-bootstrap';
import {
  IoIosAddCircle,
  IoIosRemoveCircle,
  IoMdCloseCircle,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../../hooks/useModal';
import { Item } from '../../../models/IMenu';
import { RootState } from '../../../redux/store';
import {
  addToCart,
  getCartItems,
  getTotalPrice,
  removeFromCart,
} from '../../../slices/cart.slice';
import { formatCurrency } from '../../../utils/formatUtil';
import './Basket.css';
interface BasketProps {}

const Basket: React.FC<BasketProps> = () => {
  const { isOpen, toggle } = useModal();

  const items = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalPrice);
  const venueState = useSelector((state: RootState) => state.venue);
  const dispatch = useDispatch();

  const addToCartHandler = (item: Item) => dispatch(addToCart(item));
  const removeFromCartHandler = (item: Item) =>
    dispatch(removeFromCart(item.id));

  return (
    <div>
      <>
        {!isOpen && (
          <div>
            <h4 className="allergy-text"> View allergy information</h4>
            <div className="basket">
              <Button className="btn-basket" onClick={toggle}>
                Your Basket - {items.length}
              </Button>
            </div>
          </div>
        )}
      </>
      <div>
        <>
          {isOpen && (
            <div className="modal-overlay" onClick={toggle}>
              <div onClick={(e) => e.stopPropagation()} className="modal-box">
                <div className="modal-body">
                  <div className="modal-top">
                    <IoMdCloseCircle
                      style={{
                        boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.12)',
                        color: 'white',
                        position: 'absolute',
                        top: '18px',
                        right: '16px',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        backgroundColor: 'lightgray',
                      }}
                      onClick={toggle}
                    />
                  </div>
                  <div className="cart">
                    <div className="cart-title">
                      <h3>Basket</h3>
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
                                    className="button-modal"
                                    style={{
                                      color:
                                        venueState.venue?.webSettings
                                          .navBackgroundColour,
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => removeFromCartHandler(item)}
                                  />
                                  <span className="amount">{item.amount}</span>
                                  <IoIosAddCircle
                                    className="button-modal"
                                    style={{
                                      color:
                                        venueState.venue?.webSettings
                                          .navBackgroundColour,
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
                          <div className="checkout">
                            <Button className="btn-checkout" onClick={toggle}>
                              Checkout now
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="cart-empty">
                          <h6>Seu carrinho está vazio</h6>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Basket;
