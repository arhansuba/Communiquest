exports.generateNFTMetadata = (quest, user) => {
    return {
        name: `${quest.title} Completion NFT`,
        description: `This NFT certifies that ${user.username} has completed the "${quest.title}" quest.`,
        image: `https://your-nft-image-url.com/${quest.id}.png`,
        attributes: [
            { trait_type: 'Quest', value: quest.title },
            { trait_type: 'Completed By', value: user.username },
            { trait_type: 'Completion Date', value: new Date().toISOString() },
        ],
    };
};