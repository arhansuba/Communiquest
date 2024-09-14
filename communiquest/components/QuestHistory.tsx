import React from 'react';

interface QuestHistoryProps {
  quests: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

const QuestHistory: React.FC<QuestHistoryProps> = ({ quests }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Quest History</h3>
      <ul>
        {quests.map(quest => (
          <li key={quest.id} className={quest.completed ? 'line-through' : ''}>
            {quest.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestHistory;