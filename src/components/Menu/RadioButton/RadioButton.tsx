import React from 'react';
import { ModifierItem } from '../../../models/IMenu';
import { formatCurrency } from '../../../utils/formatUtil';
import './RadioButton.css';

interface RadioButtonProps {
  name?: string;
  item: ModifierItem;
  checked: boolean;
  onChange: (item: ModifierItem) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  item,
  checked,
  onChange,
}) => {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name ? name : ''}
        value={item.id}
        checked={checked}
        onChange={() => onChange(item)}
      />
      <span className="radio-custom"></span>
      <div className="modifier-info">
        <h6 className="modifier-name">{item.name}</h6>
        <span className="modifier-price">{formatCurrency(item.price)}</span>
      </div>
    </label>
  );
};

export default RadioButton;
