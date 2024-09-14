import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

export const fetchUserProfile = async (publicKey: string) => {
  // Simulate an API call to fetch user profile data
  const response = await fetch(`/api/user/${publicKey}`);
  if (!response.ok) throw new Error('Failed to fetch user profile');
  return response.json();
};
export const fetchQuestDetails = async (questId: string) => {
  // Simulate an API call to fetch quest details
  const response = await fetch(`/api/quests/${questId}`);
  if (!response.ok) throw new Error('Failed to fetch quest details');
  return response.json();
};

export const submitQuestCompletion = async (questId: string, userId: string) => {
  // Simulate an API call to submit quest completion
  const response = await fetch(`/api/quests/${questId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to submit quest completion');
  return response.json();
};
export const fetchUserNFTs = async (publicKey: string) => {
  // Simulate an API call to fetch user NFTs
  const response = await fetch(`/api/nfts/${publicKey}`);
  if (!response.ok) throw new Error('Failed to fetch user NFTs');
  return response.json();
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchQuests = async () => {
  const response = await api.get('/quests');
  return response.data;
};

export const fetchQuestById = async (id: string) => {
  const response = await api.get(`/quests/${id}`);
  return response.data;
};

export const createQuest = async (questData: any) => {
  const response = await api.post('/quests', questData);
  return response.data;
};

export const completeQuest = async (questId: string, userId: string) => {
  const response = await api.post(`/quests/${questId}/complete`, { userId });
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await api.get('/leaderboard');
  return response.data;
};

export const fetchProposals = async () => {
  const response = await api.get('/governance/proposals');
  return response.data;
};

export const voteOnProposal = async (proposalId: string, vote: boolean, userId: string) => {
  const response = await api.post(`/governance/proposals/${proposalId}/vote`, { vote, userId });
  return response.data;
};
