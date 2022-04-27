import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, allValue, onSelect }) => {
  return (
    <>
    Show routes on
    <select onSelect={onSelect}>
        <option value={allValue}>{allTitle}</option>
      {options.map(airline => (
        <option
          key={airline[valueKey]}
          value={airline[titleKey]}
        >
          {airline[titleKey]}
        </option>
      ))}
    </select>
    </>
  )
};

export default Select;