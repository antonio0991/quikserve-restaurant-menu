// Modal.tsx

import { IoMdCloseCircle } from 'react-icons/io';
import { Item, Modifier } from '../../../models/IMenu';
import './Modal.css';
import { Button, ToggleButton } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatUtil';
import { addToCart } from '../../../slices/cart.slice';
import { useDispatch } from 'react-redux';
interface ModalProps {
  item: Item | null;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, isOpen, toggle }) => {

  let quantity = 0

  const dispatch = useDispatch();

  const addToCartHandler = (item: any) => { 
    if (item){
      dispatch(addToCart(item));
      toggle();
    }
  };

  function addItem(){
    quantity++;
    console.log(item)

    updateValue();
  }

  function removeItem(){
    quantity--;
    updateValue();
  }

  function updateValue(){
    const formText = document.getElementById("quantity-value");
    if (formText){
      formText.textContent = quantity.toString();
    }
  }

  function getModifierText(modifier: Modifier){
    return modifier.maxChoices == modifier.minChoices ? 
      "Select " + modifier.maxChoices + " option" :
      "Select " + modifier.minChoices + " or " + modifier.maxChoices + " option"
  }

  function getListModifiers(){
    const mod = item?.modifiers ? item.modifiers : []
    mod.forEach((mods) => console.log(mods))
    return mod;
  }

  return (
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
                  }}
                  onClick={toggle}
                />
                {item?.images ? (
                  <img className="modal-image" src={item.images[0].image}></img>
                ) : (
                  <></>
                )}
              </div>
              <div className="item-details">
                <h3 className="item-name">{item?.name}</h3>
                <span className="item-description">{item?.description}</span>
              </div>
              <div className="modifiers">
                <> 
                  {(getListModifiers().forEach((modifier) => {
                      <div className="modifier">
                        <div>
                          <h5>{modifier.name}</h5>
                          <span>{getModifierText(modifier)}</span>
                        </div>
                        <>
                          { modifier.items.forEach((item) => {
                              <div style={{display: 'flex'}}> 
                                <div>
                                  <h5>{item.name}</h5>
                                  <span>{formatCurrency(item.price)}</span>
                                </div>
                                <div>
                                  <ToggleButton value={item.id} id={item.name}></ToggleButton>
                                </div>
                              </div>
                          }) }
                        </>
                      </div>;
                    })
                  )}
                </>
              </div>
              <div>
                <div className='itens'>
                  <Button className='btn-minus' onClick={() => removeItem()}>
                    <span>-</span>
                  </Button>
                    <h4 id="quantity-value" style={{alignContent: "center"}}>{quantity}</h4>
                  <Button className='btn-plus' onClick={() => addItem()}>
                    <span>+</span>  
                  </Button>
                </div>
                <div className='order'>
                  <Button className='btn-order' onClick={() => addToCartHandler(item)}>Add to Order - {formatCurrency(item ? item?.price : 0)}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
