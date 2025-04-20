import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} 
          shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
          py-2 px-3 text-sm bg-white
          ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;