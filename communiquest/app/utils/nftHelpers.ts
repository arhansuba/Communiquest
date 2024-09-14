import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js'; // Ensure this package is installed
import { SOLANA_RPC_URL } from '../config/constants';

const connection = new Connection(SOLANA_RPC_URL);
const metaplex = new Metaplex(connection);

export const fetchNFTMetadata = async (mintAddress: string) => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const nft = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey });
    return nft;
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    throw error;
  }
};

export const mintNFT = async (uri: string, name: string, sellerFeeBasisPoints: number) => {
  try {
    const { nft } = await metaplex.nfts().create({
      uri,
      name,
      sellerFeeBasisPoints,
    });
    return nft;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};