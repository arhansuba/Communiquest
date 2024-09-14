export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
export const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || 'your_helius_api_key_here';

export const QUEST_DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;
export const PROPOSAL_STATUSES = ['Active', 'Passed', 'Rejected'] as const;

export const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || 'your_nft_storage_api_key_here';
