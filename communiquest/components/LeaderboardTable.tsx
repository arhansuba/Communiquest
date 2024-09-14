import React from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  questsCompleted: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left">Score</th>
            <th className="py-2 px-4 text-left">Quests Completed</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.rank} className="border-b">
              <td className="py-2 px-4">{entry.rank}</td>
              <td className="py-2 px-4">{entry.username}</td>
              <td className="py-2 px-4">{entry.score}</td>
              <td className="py-2 px-4">{entry.questsCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};