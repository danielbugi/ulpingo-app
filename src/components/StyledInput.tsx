import React from 'react';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  isRequired?: boolean;
}

export function StyledInput({
  startContent,
  isRequired,
  className = '',
  ...props
}: StyledInputProps) {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {startContent && (
          <div className="absolute left-3 pointer-events-none">
            {startContent}
          </div>
        )}
        <input
          {...props}
          required={isRequired}
          className={`w-full px-3 py-3 ${
            startContent ? 'pl-10' : ''
          } bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-700 hover:border-gray-700 transition-colors ${className}`}
        />
      </div>
    </div>
  );
}
