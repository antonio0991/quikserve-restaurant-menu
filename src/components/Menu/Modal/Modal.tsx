import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  IoIosAddCircle,
  IoIosRemoveCircle,
  IoMdCloseCircle,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Item, Modifier } from '../../../models/IMenu';
import { RootState } from '../../../redux/store';
import { addToCart } from '../../../slices/cart.slice';
import { formatCurrency } from '../../../utils/formatUtil';
import RadioButton from '../RadioButton/RadioButton';
import './Modal.css';
interface ModalProps {
  item: Item | null;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, isOpen, toggle }) => {
  const [amount, setAmount] = useState(0);
  const venueState = useSelector((state: RootState) => state.venue);

  const dispatch = useDispatch();
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [key: number]: number;
  }>({});

  const handleModifierChange = (modifierId: number, value: number) => {
    setSelectedModifiers({ ...selectedModifiers, [modifierId]: value });
    console.log(selectedModifiers);
  };

  const addToCartHandler = (item: any) => {
    if (item) {
      dispatch(addToCart(item));
      toggle();
    }
  };

  function addItem() {
    setAmount(amount + 1);
  }

  function removeItem() {
    if (amount > 0) setAmount(amount - 1);
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
                    {modifier.items.map((item) => (
                      <div className="modifier-item" key={item.id}>
                        <RadioButton
                          key={item.id}
                          name={`modifier-${modifier.id}`}
                          item={item}
                          checked={selectedModifiers[modifier.id] === item.id}
                          onChange={() =>
                            handleModifierChange(modifier.id, item.id)
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
              Add to Order • {formatCurrency(item.price * amount)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
