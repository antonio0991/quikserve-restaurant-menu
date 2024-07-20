import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import useModal from '../../../../hooks/useModal';
import { Item } from '../../../../models/IMenu';
import { formatCurrency } from '../../../../utils/formatUtil';
import Modal from '../../Modal/Modal';
import './AccordionItemComponent.css';

interface AccordionItemProps {
  title: string;
  items: Item[];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = (
  props: AccordionItemProps
) => {
  const { isOpen, toggle } = useModal();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const getSectionHeight = (items: Item[]): number => {
    let totalHeight = 0;
    items.forEach((item) => {
      if (item.images) totalHeight += 117;
      else totalHeight += 75;
    });
    return totalHeight;
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = props.isOpen
        ? `${getSectionHeight(props.items)}px`
        : '0px';
    }
  }, [props.isOpen, props.items]);

  const handleClick = useCallback(() => {
    props.onClick();
  }, [props.onClick]);

  const handleOpenModal = (item: Item): void => {
    setSelectedItem(item);
    toggle();
  };
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
          <div onClick={() => handleOpenModal(item)} className="item">
            <div className="item-text">
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
        ))}
      </div>
      <Modal isOpen={isOpen} toggle={toggle} item={selectedItem}></Modal>
    </div>
  );
};

export default AccordionItem;
