import React from 'react';
import { classNames } from "../Utils/className"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  error,
  className,
  ...props
}) => {
  const baseStyles = 'block w-full px-4 py-2 bg-transparent border-2 border-black rounded-sm shadow-sm focus:outline-none transition-colors';

  // const variantStyles = {
  //   default: error ? 'bg-gray-100 border border-red-500 text-red-500' : 'bg-gray-100 border-none focus:bg-white',
  //   gradient: error
  //     ? 'bg-gray-100 border border-red-500 text-red-500'
  //     : 'bg-gray-100 border-none focus:bg-white focus:border-transparent',
  // };

  // const wrapperStyles = variant === 'gradient' && !error ? 'relative rounded p-[1px] bg-transparent' : '';

  // const inputWrapperStyles = variant === 'gradient' && !error ? 'relative bg-white rounded main-wrap-gradient' : '';

  return (
    <div className={classNames(className)}>
      <div>
        <input className={classNames(baseStyles, 'relative z-10')} {...props} />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default TextInput;
