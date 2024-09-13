use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use mpl_token_metadata::state::DataV2;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod quest_nft {
    use super::*;

    pub fn initialize_quest(ctx: Context<InitializeQuest>, quest_id: u64, name: String, description: String) -> Result<()> {
        // ... (existing code)
    }

    pub fn mint_nft(ctx: Context<MintNFT>, uri: String, name: String, symbol: String) -> Result<()> {
        let quest = &mut ctx.accounts.quest;
        require!(!quest.completed, QuestError::AlreadyCompleted);

        // Use Metaplex CORE for NFT minting
        let cpi_accounts = mpl_token_metadata::cpi::accounts::CreateMetadataAccountsV3 {
            metadata: ctx.accounts.metadata.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            mint_authority: ctx.accounts.payer.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            update_authority: ctx.accounts.payer.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_metadata_program.to_account_info();

        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        mpl_token_metadata::cpi::create_metadata_accounts_v3(
            cpi_ctx,
            name,
            symbol,
            uri,
            None,
            0,
            true,
            true,
            None,
            None,
            None,
        )?;

        quest.completed = true;
        Ok(())
    }
#[program]
pub mod quest_nft {
    use super::*;

    pub fn initialize_quest(ctx: Context<InitializeQuest>, quest_id: u64, name: String, description: String) -> Result<()> {
        let quest = &mut ctx.accounts.quest;
        quest.authority = *ctx.accounts.authority.key;
        quest.quest_id = quest_id;
        quest.name = name;
        quest.description = description;
        quest.completed = false;
        Ok(())
    }

    pub fn mint_nft(ctx: Context<MintNFT>, uri: String) -> Result<()> {
        let quest = &mut ctx.accounts.quest;
        require!(!quest.completed, QuestError::AlreadyCompleted);

        // Mint NFT logic here (simplified for brevity)
        // In a real implementation, you'd use Metaplex or a custom NFT minting logic

        quest.completed = true;
        Ok(())
    }

    pub fn upgrade_nft(ctx: Context<UpgradeNFT>, new_level: u8) -> Result<()> {
        let nft = &mut ctx.accounts.nft;
        require!(new_level > nft.level, QuestError::InvalidUpgrade);

        nft.level = new_level;
        // Additional upgrade logic here

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeQuest<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8 + 50 + 200 + 1)]
    pub quest: Account<'info, Quest>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut)]
    pub quest: Account<'info, Quest>,
    #[account(mut)]
    pub user: Signer<'info>,
    // Additional accounts for NFT minting
}

#[derive(Accounts)]
pub struct UpgradeNFT<'info> {
    #[account(mut)]
    pub nft: Account<'info, NFT>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Quest {
    pub authority: Pubkey,
    pub quest_id: u64,
    pub name: String,
    pub description: String,
    pub completed: bool,
}

#[account]
pub struct NFT {
    pub owner: Pubkey,
    pub level: u8,
}

#[error_code]
pub enum QuestError {
    #[msg("Quest already completed")]
    AlreadyCompleted,
    #[msg("Invalid NFT upgrade")]
    InvalidUpgrade,
}