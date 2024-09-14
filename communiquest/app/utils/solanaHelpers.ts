import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { SOLANA_RPC_URL } from '../config/constants';

const connection = new Connection(SOLANA_RPC_URL);

export const sendSolanaTransaction = async (transaction: Transaction, signers: any[]) => {
  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, signers);
    console.log('Transaction sent:', signature);
    return signature;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
};

export const getAccountBalance = async (publicKey: PublicKey) => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};