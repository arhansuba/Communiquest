import React from 'react';

interface NFTGalleryProps {
  nfts: Array<{
    id: string;
    imageUrl: string;
    title: string;
  }>;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {nfts.map(nft => (
        <div key={nft.id} className="border rounded p-2">
          <img src={nft.imageUrl} alt={nft.title} className="w-full h-auto" />
          <h3 className="text-lg">{nft.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;