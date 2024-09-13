const { Connection, PublicKey, Transaction } = require('@solana/web3.js');
const config = require('../config/default.json');

const connection = new Connection(config.solanaRpcUrl);

exports.castVote = async (proposalId, vote, userPublicKey) => {
    try {
        // Implement vote casting logic using Solana program
        // This is a simplified example and needs to be expanded
        const transaction = new Transaction().add(
            // Add your vote instruction here
        );
        
        // Sign and send the transaction
        const signature = await connection.sendTransaction(transaction, [/* Add necessary signers */]);
        await connection.confirmTransaction(signature);
        
        return { success: true, signature };
    } catch (error) {
        console.error('Error casting vote:', error);
        throw error;
    }
};