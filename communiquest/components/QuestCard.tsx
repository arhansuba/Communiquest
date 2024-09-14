import React from 'react';
import Link from 'next/link';

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface QuestCardProps {
  quest: Quest;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{quest.title}</h3>
      <p className="text-gray-600 mb-4">{quest.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-sm ${
          quest.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
          quest.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {quest.difficulty}
        </span>
        <span className="text-blue-600 font-semibold">{quest.reward}</span>
      </div>
      <Link href={`/quests/${quest.id}`}>
        <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          View Quest
        </a>
      </Link>
    </div>
  );
};