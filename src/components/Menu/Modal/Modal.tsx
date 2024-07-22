//modal.tsx
import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  IoIosAddCircle,
  IoIosRemoveCircle,
  IoMdCloseCircle,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Item, Modifier, ModifierItem } from '../../../models/IMenu';
import { RootState } from '../../../redux/store';
import { addToCart, getCartItems } from '../../../slices/cart.slice';
import { formatCurrency } from '../../../utils/formatUtil';
import RadioButton from '../RadioButton/RadioButton';
import './Modal.css';

interface ModalProps {
  item: Item | null;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, isOpen, toggle }) => {
  const [amount, setAmount] = useState(1);
  const venueState = useSelector((state: RootState) => state.venue);
  const items = useSelector(getCartItems);

  const dispatch = useDispatch();
  const [selectedModifiers, setSelectedModifiers] = useState<Modifier[]>([]);
  useEffect(() => {
    if (item) {
      const cartItem = items.find((i) => item && i.id === item.id);
      if (cartItem) {
        item = { ...cartItem };
        setAmount(cartItem.amount);
        setSelectedModifiers(cartItem.modifiers ?? []);
      } else {
        setAmount(1);

        setSelectedModifiers([]);
      }
    }
  }, [items, item]);

  const handleModifierChange = (
    modifier: Modifier,
    modifierItem: ModifierItem
  ) => {
    setSelectedModifiers((prevModifiers) =>
      produce(prevModifiers, (draft) => {
        const modifierIndex = draft.findIndex((mod) => mod.id === modifier.id);
        if (modifierIndex !== -1) {
          draft[modifierIndex].items = [modifierItem];
        } else {
          draft.push({ ...modifier, items: [modifierItem] });
        }
      })
    );
  };

  const addToCartHandler = () => {
    if (!item) return;

    const finalItemPrice =
      item.price +
      selectedModifiers.reduce((total, mod) => {
        return total + (mod.items[0]?.price || 0);
      }, 0);

    const cartItem = {
      ...item,
      price: finalItemPrice,
      modifiers: selectedModifiers,
      amount: amount,
    };

    dispatch(addToCart(cartItem));
    toggle();
  };

  function addItem() {
    setAmount(amount + 1);
  }

  function removeItem() {
    if (amount > 1) setAmount(amount - 1);
  }

  const getModifierText = (modifier: Modifier) =>
    modifier.maxChoices === modifier.minChoices
      ? `Select ${modifier.maxChoices} option`
      : `Select ${modifier.minChoices} to ${modifier.maxChoices} options`;

  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay" onClick={toggle}>
      <div onClick={(e) => e.stopPropagation()} className="modal-box">
        <div className="modal-body">
          <div className="modal-top">
            <IoMdCloseCircle className="modal-close-icon" onClick={toggle} />
            {item.images && (
              <img
                className="modal-image"
                src={item.images[0].image}
                alt="Item"
              />
            )}
          </div>
          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <span className="item-description">{item.description}</span>
          </div>
          <div className="modifiers">
            {item.modifiers && (
              <>
                {item.modifiers.map((modifier) => (
                  <div className="modifier" key={modifier.id}>
                    <div>
                      <h5>{modifier.name}</h5>
                      <span>{getModifierText(modifier)}</span>
                    </div>
                    {modifier.items.map((modifierItem, index) => (
                      <div className="modifier-item" key={modifierItem.id}>
                        <RadioButton
                          name={`modifier-${modifier.id}`}
                          item={modifierItem}
                          checked={selectedModifiers.some(
                            (mod) =>
                              mod.id === modifier.id &&
                              mod.items.some(
                                (item) => item.id === modifierItem.id
                              )
                          )}
                          onChange={() =>
                            handleModifierChange(modifier, modifierItem)
                          }
                        ></RadioButton>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="items">
            <IoIosRemoveCircle
              style={{
                color: venueState.venue?.webSettings.navBackgroundColour,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
              }}
              onClick={() => removeItem()}
            />
            <h4 id="amount-value">{amount}</h4>
            <IoIosAddCircle
              style={{
                color: venueState.venue?.webSettings.navBackgroundColour,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
              }}
              onClick={() => addItem()}
            />
          </div>
          <div className="order">
            <Button className="btn-order" onClick={addToCartHandler}>
              Add to Order •{' '}
              {formatCurrency(
                (item.price +
                  selectedModifiers.reduce((total, mod) => {
                    return total + (mod.items[0]?.price || 0);
                  }, 0)) *
                  amount
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
