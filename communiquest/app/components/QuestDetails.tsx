import React from 'react';

interface QuestDetailsProps {
  quest: {
    title: string;
    description: string;
    completed: boolean;
    // Add other quest fields as needed
  };
}

export const QuestDetails: React.FC<QuestDetailsProps> = ({ quest }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{quest.title}</h2>
      <p>{quest.description}</p>
      <p>Status: {quest.completed ? 'Completed' : 'In Progress'}</p>
      {/* Render other quest information */}
    </div>
  );
};