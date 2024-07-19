import React, { useCallback, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Item } from '../../../models/IMenu';
import { addToCart } from '../../../slices/cart.slice';
import { formatCurrency } from '../../../utils/formatUtil';
interface AccordionItemProps {
  title: string;
  items: Item[];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = (
  props: AccordionItemProps
) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const addToCartHandler = (item: Item) => dispatch(addToCart(item));

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = props.isOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [props.isOpen]);

  const handleClick = useCallback(() => {
    props.onClick();
  }, [props.onClick]);

  return (
    <div className="wrapper">
      <button
        className={`question-container ${props.isOpen ? 'active' : ''}`}
        onClick={handleClick}
      >
        <p className="question-content">{props.title}</p>
        <RiArrowDropDownLine
          className={`arrow ${props.isOpen ? 'active' : ''}`}
        />
      </button>
      <div ref={contentRef} className="answer-container">
        {props.items.map((item) => (
          <div>
            {item.visible ? (
              <div className="item">
                <div className="item-text">
                  <button onClick={() => addToCartHandler(item)}>
                    Add to cart
                  </button>
                  <p className="item-name">{item.name}</p>
                  {item.description ? (
                    <span className="item-description">{item.description}</span>
                  ) : (
                    <></>
                  )}

                  <p className="item-price">
                    R$
                    {formatCurrency(item.price)}
                  </p>
                </div>
                {item.images ? (
                  <img src={item.images[0].image} className="item-image"></img>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionItem;
