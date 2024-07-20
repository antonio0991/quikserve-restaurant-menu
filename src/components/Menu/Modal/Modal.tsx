// Modal.tsx

import { IoMdCloseCircle } from 'react-icons/io';
import { Item } from '../../../models/IMenu';
import './Modal.css';
interface ModalProps {
  item: Item | null;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, isOpen, toggle }) => {
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
                  {item?.modifiers ? (
                    item.modifiers.map((modifier) => {
                      <div className="modifier">
                        <>
                          <h5>{modifier.name}</h5>
                          {modifier.items.map((modifierItem) => {
                            <div className="modifier-item">
                              <span>{modifierItem.name}</span>
                            </div>;
                          })}
                        </>
                      </div>;
                    })
                  ) : (
                    <></>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
