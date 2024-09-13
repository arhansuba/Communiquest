use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod governance {
    use super::*;

    pub fn create_proposal(ctx: Context<CreateProposal>, title: String, description: String, quest_params: QuestParams) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        proposal.proposer = *ctx.accounts.proposer.key;
        proposal.title = title;
        proposal.description = description;
        proposal.quest_params = quest_params;
        proposal.yes_votes = 0;
        proposal.no_votes = 0;
        proposal.status = ProposalStatus::Active;
        Ok(())
    }

    pub fn cast_vote(ctx: Context<CastVote>, vote: bool) -> Result<()> {
        // ... (existing voting logic)
    }

    pub fn finalize_proposal(ctx: Context<FinalizeProposal>) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        require!(proposal.status == ProposalStatus::Active, GovernanceError::ProposalNotActive);

        if proposal.yes_votes > proposal.no_votes {
            proposal.status = ProposalStatus::Approved;
            // Create new quest based on approved proposal
            let quest_cpi_program = ctx.accounts.quest_program.to_account_info();
            let quest_cpi_accounts = quest_nft::cpi::accounts::InitializeQuest {
                quest: ctx.accounts.new_quest.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
            };
            let quest_cpi_ctx = CpiContext::new(quest_cpi_program, quest_cpi_accounts);

            quest_nft::cpi::initialize_quest(
                quest_cpi_ctx,
                proposal.quest_params.quest_id,
                proposal.quest_params.name,
                proposal.quest_params.description,
            )?;
        } else {
            proposal.status = ProposalStatus::Rejected;
        }

        Ok(())
    }
}

#[program]
pub mod governance {
    use super::*;

    pub fn create_proposal(ctx: Context<CreateProposal>, title: String, description: String) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        proposal.proposer = *ctx.accounts.proposer.key;
        proposal.title = title;
        proposal.description = description;
        proposal.yes_votes = 0;
        proposal.no_votes = 0;
        proposal.status = ProposalStatus::Active;
        Ok(())
    }

    pub fn cast_vote(ctx: Context<CastVote>, vote: bool) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        let voter = &ctx.accounts.voter;

        require!(proposal.status == ProposalStatus::Active, GovernanceError::ProposalNotActive);

        // In a real implementation, check if the voter has already voted and their voting power

        if vote {
            proposal.yes_votes += 1;
        } else {
            proposal.no_votes += 1;
        }

        Ok(())
    }

    pub fn finalize_proposal(ctx: Context<FinalizeProposal>) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        require!(proposal.status == ProposalStatus::Active, GovernanceError::ProposalNotActive);

        if proposal.yes_votes > proposal.no_votes {
            proposal.status = ProposalStatus::Approved;
        } else {
            proposal.status = ProposalStatus::Rejected;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(init, payer = proposer, space = 8 + 32 + 100 + 1000 + 8 + 8 + 1)]
    pub proposal: Account<'info, Proposal>,
    #[account(mut)]
    pub proposer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    pub voter: Signer<'info>,
}

#[derive(Accounts)]
pub struct FinalizeProposal<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Proposal {
    pub proposer: Pubkey,
    pub title: String,
    pub description: String,
    pub yes_votes: u64,
    pub no_votes: u64,
    pub status: ProposalStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum ProposalStatus {
    Active,
    Approved,
    Rejected,
}

#[error_code]
pub enum GovernanceError {
    #[msg("Proposal is not active")]
    ProposalNotActive,
}
