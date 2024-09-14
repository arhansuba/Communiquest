import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchProposals, voteOnProposal } from '../utils/api'
import { ProposalList } from '../components/ProposalList'
import { CreateProposalForm } from '../components/CreateProposalForm'
import React from 'react'

interface GovernancePageProps {
  initialProposals: any[] // Replace with proper type
}

const GovernancePage: NextPage<GovernancePageProps> = ({ initialProposals }) => {
  const [proposals, setProposals] = useState(initialProposals)
  const [isVoting, setIsVoting] = useState(false)
  const { publicKey } = useWallet()

  const handleVote = async (proposalId: string, vote: boolean) => {
    if (!publicKey) return
    setIsVoting(true)
    try {
      await voteOnProposal(proposalId, vote, publicKey.toString())
      const updatedProposals = await fetchProposals()
      setProposals(updatedProposals)
    } catch (error) {
      console.error('Failed to submit vote:', error)
      // Handle error (show message to user)
    } finally {
      setIsVoting(false)
    }
  }

  const handleCreateProposal = async (proposalData: any) => { // Replace 'any' with proper type
    // Implement proposal creation logic
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Governance - CommuniQuest</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">CommuniQuest Governance</h1>

      {publicKey ? (
        <>
          <CreateProposalForm onSubmit={handleCreateProposal} />
          <ProposalList proposals={proposals} onVote={handleVote} isVoting={isVoting} />
        </>
      ) : (
        <p className="text-red-500">Please connect your wallet to participate in governance.</p>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialProposals = await fetchProposals()
  return { props: { initialProposals } }
}

export default GovernancePage