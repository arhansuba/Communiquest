import React from 'react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: number;
  // Add other proposal fields as needed
}

interface ProposalListProps {
  proposals: Proposal[];
  onVote: (proposalId: string, vote: boolean) => void;
  isVoting: boolean;
}

export const ProposalList: React.FC<ProposalListProps> = ({ proposals, onVote, isVoting }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Proposals</h2>
      <ul>
        {proposals.map(proposal => (
          <li key={proposal.id} className="border rounded p-4 mb-2">
            <h3 className="text-lg font-bold">{proposal.title}</h3>
            <p>{proposal.description}</p>
            <p>Votes: {proposal.votes}</p>
            <button
              onClick={() => onVote(proposal.id, true)}
              disabled={isVoting}
              className="bg-green-500 text-white py-1 px-2 rounded mr-2"
            >
              Vote Yes
            </button>
            <button
              onClick={() => onVote(proposal.id, false)}
              disabled={isVoting}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Vote No
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};