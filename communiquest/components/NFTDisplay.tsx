import React from 'react';

interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface NFTDisplayProps {
  nft: NFT;
}

export const NFTDisplay: React.FC<NFTDisplayProps> = ({ nft }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
        <p className="text-gray-600 text-sm">{nft.description}</p>
      </div>
    </div>
  );
};