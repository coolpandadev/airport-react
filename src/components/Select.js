import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, allValue, onSelect }) => {
  return (
    <>
    <select onChange={onSelect}>
        <option value={allValue}>{allTitle}</option>
      {options.map(option => (
        <option
          key={option[valueKey]}
          value={option[titleKey]}
          disabled={option.disabled}
        >
          {option[titleKey]}
        </option>
      ))}
    </select>
    </>
  )
};

export default Select;