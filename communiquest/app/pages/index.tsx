import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { QuestCard } from '../components/QuestCard'
import { fetchFeaturedQuests } from '../utils/api'
import React from 'react'

const Home = () => {
  const [featuredQuests, setFeaturedQuests] = useState([])
  const { connected } = useWallet()

  useEffect(() => {
    const loadFeaturedQuests = async () => {
      const quests = await fetchFeaturedQuests()
      setFeaturedQuests(quests)
    }
    loadFeaturedQuests()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>CommuniQuest - Web3 Community Challenges</title>
        <meta name="description" content="Engage in community-driven quests and earn unique NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-20">
        <h1 className="text-4xl font-bold text-center mb-10">Welcome to CommuniQuest</h1>
        
        {!connected && (
          <div className="text-center mb-10">
            <p className="mb-4">Connect your wallet to start your journey!</p>
            {/* Wallet connection button component goes here */}
          </div>
        )}

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">Featured Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </section>

        <section className="text-center">
          <Link href="/quests">
            <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Explore All Quests
            </a>
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Home