import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        (isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {isLoading ? 'Yükleniyor...' : children}
    </button>
  );
}; 