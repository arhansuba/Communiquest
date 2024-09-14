import React from 'react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  yesVotes: number;
  noVotes: number;
  status: 'Active' | 'Passed' | 'Rejected';
}

interface GovernanceProposalProps {
  proposal: Proposal;
  onVote: (id: string, vote: boolean) => void;
  isVoting: boolean;
}

export const GovernanceProposal: React.FC<GovernanceProposalProps> = ({ proposal, onVote, isVoting }) => {
  const totalVotes = proposal.yesVotes + proposal.noVotes;
  const yesPercentage = totalVotes > 0 ? (proposal.yesVotes / totalVotes) * 100 : 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
      <p className="text-gray-600 mb-4">{proposal.description}</p>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${yesPercentage}%` }}></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Yes: {proposal.yesVotes}</span>
          <span>No: {proposal.noVotes}</span>
        </div>
      </div>
      {proposal.status === 'Active' && (
        <div className="flex space-x-4">
          <button
            onClick={() => onVote(proposal.id, true)}
            disabled={isVoting}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            Vote Yes
          </button>
          <button
            onClick={() => onVote(proposal.id, false)}
            disabled={isVoting}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            Vote No
          </button>
        </div>
      )}
      {proposal.status !== 'Active' && (
        <div className={`text-center py-2 rounded ${
          proposal.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {proposal.status}
        </div>
      )}
    </div>
  );
};
