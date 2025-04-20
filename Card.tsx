import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  footer,
  icon,
  hover = false
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${hover ? 'transition-transform hover:scale-[1.01] hover:shadow-lg' : ''} ${className}`}>
      {(title || icon) && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center">
          {icon && <div className="mr-3 text-gray-500">{icon}</div>}
          {title && <h3 className="font-medium text-gray-800">{title}</h3>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;