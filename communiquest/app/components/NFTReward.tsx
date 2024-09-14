import React from 'react';

interface NFTRewardProps {
  nft: {
    id: string;
    imageUrl: string;
    title: string;
  };
}

export const NFTReward: React.FC<NFTRewardProps> = ({ nft }) => {
  return (
    <div className="border rounded p-4">
      <h3 className="text-lg font-semibold">Congratulations!</h3>
      <p>You have earned the following NFT reward:</p>
      <img src={nft.imageUrl} alt={nft.title} className="w-full h-auto" />
      <h4 className="text-md">{nft.title}</h4>
    </div>
  );
};