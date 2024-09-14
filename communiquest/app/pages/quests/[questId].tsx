import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchQuestDetails, submitQuestCompletion } from '../../utils/api'
import { QuestDetails } from '../../components/QuestDetails'
import { NFTReward } from '../../components/NFTReward'
import React from 'react'

interface QuestPageProps {
  initialQuestData: any // Replace with proper type
}

const QuestPage: NextPage<QuestPageProps> = ({ initialQuestData }) => {
  const [quest, setQuest] = useState(initialQuestData)
  const [isCompleting, setIsCompleting] = useState(false)
  const router = useRouter()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (router.query.questId) {
      fetchQuestDetails(router.query.questId as string).then(setQuest)
    }
  }, [router.query.questId])

  const handleCompleteQuest = async () => {
    if (!publicKey) return
    setIsCompleting(true)
    try {
      const result = await submitQuestCompletion(quest.id, publicKey.toString())
      setQuest({ ...quest, completed: true, nftReward: result.nftReward })
    } catch (error) {
      console.error('Failed to complete quest:', error)
      // Handle error (show message to user)
    } finally {
      setIsCompleting(false)
    }
  }

  if (!quest) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{quest.title} - CommuniQuest</title>
      </Head>

      <QuestDetails quest={quest} />

      {quest.completed ? (
        <NFTReward nft={quest.nftReward} />
      ) : (
        <button
          onClick={handleCompleteQuest}
          disabled={isCompleting || !publicKey}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isCompleting ? 'Completing...' : 'Complete Quest'}
        </button>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const questId = context.params?.questId as string
  const initialQuestData = await fetchQuestDetails(questId)
  return { props: { initialQuestData } }
}

export default QuestPage