import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { createQuest } from '../../utils/api'
import { QuestCreationForm } from '../../components/QuestCreationForm'
import React from 'react'

const CreateQuestPage: NextPage = () => {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const { publicKey } = useWallet()

  const handleCreateQuest = async (questData: any) => { // Replace 'any' with proper type
    if (!publicKey) return
    setIsCreating(true)
    try {
      const newQuest = await createQuest({ ...questData, creator: publicKey.toString() })
      router.push(`/quests/${newQuest.id}`)
    } catch (error) {
      console.error('Failed to create quest:', error)
      // Handle error (show message to user)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Create a New Quest - CommuniQuest</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Create a New Quest</h1>

      {!publicKey ? (
        <p className="text-red-500">Please connect your wallet to create a quest.</p>
      ) : (
        <QuestCreationForm onSubmit={handleCreateQuest} isSubmitting={isCreating} />
      )}
    </div>
  )
}

export default CreateQuestPage