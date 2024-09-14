import React, { ReactNode } from 'react';

interface GameWrapperProps {
  children: ReactNode;
  title: string;
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ children, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};
