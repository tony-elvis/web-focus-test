import React, { useState } from 'react';
//import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import capitalizeFL from '../utils/capitalizeFL';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const TextInput = ({
  name,
  rightIcon,
  leftIcon,
  value,
  borderError,
  label,
  onTextChange,
  disabled,
  placeholder,
  secure,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  tooltip,
  Checkbox
}) => {
  const [fieldValue, setFieldValue] = useState('');
  //const [showPassword] = useState(false);

  const onHandleChangeText = (event) => {
    setFieldValue(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <div className="mb-5" style={containerStyle}>
      <div>
        {label && (
          <div className="flex">
            <label
              className="font-apercuBold text-label-secondary"
              htmlFor={name}
              style={labelStyle}>
              {label}
            </label>
            {tooltip && (
              <>
                <Tippy content={tooltip}>
                  <a
                    data-tip
                    data-for="toolTip"
                    className="ml-3 text-xl text-yellow-500 cursor-pointer">
                    &#9888;
                  </a>
                </Tippy>
              </>
            )}
            {Checkbox && <Checkbox />}
          </div>
        )}
        <div className="relative block mt-2">
          {/*  {secure &&
              (showPassword ? (
                <div>
                  <div className="mt-2 pointer-events-none">
                    <AiFillEye className="w-6 h-6" />
                  </div>
                </div>
              ) : (
                <div className="mt-2 pointer-events-none">
                  <AiFillEyeInvisible className="w-6 h-6" />
                </div>
              ))} */}

          {/*in parent component you must add className="w-6 h-6" to the icon to have correct center in input
           */}
          {rightIcon && (
            <div className="absolute mt-2 pointer-events-none right-2">{rightIcon}</div>
          )}
          {leftIcon && <div className="absolute mt-2 pointer-events-none left-2">{leftIcon}</div>}
          <input
            onChange={onHandleChangeText}
            id={name}
            type={secure ? 'password' : 'text'}
            name={name}
            disabled={disabled}
            autoComplete="off"
            className={`block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md text-label-secondary font-apercuRegular focus:outline-none focus:border-errand-primary focus:z-10 sm:text-sm ${
              error && borderError ? 'border-text-red' : ''
            }`}
            placeholder={placeholder}
            value={value ?? fieldValue}
            style={Object.assign({}, inputStyle, {
              paddingRight: rightIcon ? 40 : '0.75rem',
              paddingLeft: leftIcon ? 40 : '0.75rem',
              backgroundColor: disabled && '#FCFCFD',
              color: disabled && 'rgba(53, 53, 53, 0.8)'
            })}
          />
        </div>
        {error && <p className="normal-case text-text-red ">{capitalizeFL(error)}</p>}
      </div>
    </div>
  );
};

export default TextInput;
