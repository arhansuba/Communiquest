import { useState, useEffect } from 'react';
import { HELIUS_API_KEY } from '../../config/constants';

export const useHelius = (walletAddress: string) => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!walletAddress) return;

      try {
        const response = await fetch(`https://api.helius.xyz/v0/addresses/${walletAddress}/nfts?api-key=${HELIUS_API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch NFTs');
        const data = await response.json();
        setNFTs(data.nfts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  return { nfts, loading, error };
};
