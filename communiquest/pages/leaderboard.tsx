import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { fetchLeaderboard } from '../utils/api';
import { LeaderboardTable } from '../components/LeaderboardTable';
import React from 'react';

// Updated LeaderboardEntry interface
interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  questsCompleted: number;
}

interface LeaderboardPageProps {
  initialLeaderboardData: LeaderboardEntry[];
}

const LeaderboardPage: NextPage<LeaderboardPageProps> = ({ initialLeaderboardData }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(initialLeaderboardData);
  const [isLoading, setIsLoading] = useState(false);

  const refreshLeaderboard = async () => {
    setIsLoading(true);
    try {
      const freshData = await fetchLeaderboard();
      setLeaderboardData(freshData);
    } catch (error) {
      console.error('Failed to refresh leaderboard:', error);
      // Optionally, you can add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Leaderboard - CommuniQuest</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">CommuniQuest Leaderboard</h1>

      <button
        onClick={refreshLeaderboard}
        disabled={isLoading}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Refreshing...' : 'Refresh Leaderboard'}
      </button>

      <LeaderboardTable entries={leaderboardData} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialLeaderboardData = await fetchLeaderboard();
  return { props: { initialLeaderboardData } };
};

export default LeaderboardPage;