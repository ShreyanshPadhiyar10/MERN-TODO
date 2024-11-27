'use client';
import { classNames } from '../Utils/className';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  className,
  ...props
}) => {

  const baseStyles =
    'block w-full px-4 py-2 bg-transparent border-2 border-black rounded-sm shadow-sm focus:outline-none transition-colors';

  return (
    <div>
      <div className={classNames(className)}>
        <div>
          <input
            type="password"
            className={classNames(baseStyles, error ? 'text-red-500' : '', 'relative z-10')}
            {...props}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
