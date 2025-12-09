import React from 'react';
import Select from 'react-select';
import capitalizeFirstLetter from '../utils/capitalizeFL';

const SelectInput = ({
  label,
  options,
  onChange,
  error,
  placeholder,
  value,
  disable,
  containerStyles,
  labelStyle
}) => {
  return (
    <div className={`mb-5 ${containerStyles}`}>
      {label && (
        <label style={labelStyle} className="font-apercuBold text-label-secondary">
          {label}
        </label>
      )}
      <Select
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        isDisabled={disable}
        isSearchable={false}
        styles={{
          option: (styles, { data }) => {
            return {
              ...styles,
              backgroundColor: data.color ? `rgb(${data.color})` : 'white',
              color: data.color ? 'black' : '',
              fontWeight: data.color ? 'bold' : 'normal',
              fontSize: data.color ? '1.2rem' : '',
              textShadow: data.color
                ? `
              1px  1px     #fff, 
              -1px  1px     #fff, 
               1px -1px     #fff, 
              -1px -1px     #fff,
               1px  1px 5px #555`
                : ''
            };
          }
        }}
        closeMenuOnSelect
        className="mt-2 placeholder-gray-500 border border-gray-300 rounded-md text-label-secondary font-apercuRegular focus:outline-none focus:border-errand-primary focus:z-10 sm:text-sm"
      />
      {error && <p className="normal-case text-text-red ">{capitalizeFirstLetter(error)}</p>}
    </div>
  );
};

export default SelectInput;
