import { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'

import React from 'react'
import TweedCheckout from '../components/TweedCheckout'

const ShopPage: NextPage = () => {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { publicKey } = useWallet()

  const handlePurchase = async (questId: string, amount: number) => {
    if (!publicKey) return
    setIsPurchasing(true)
    try {
      await purchaseSpecialQuest(questId, publicKey.toString(), amount)
      // Handle successful purchase (e.g., show success message, update user's quests)
    } catch (error) {
      console.error('Failed to purchase quest:', error)
      // Handle error (show message to user)
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Quest Shop - CommuniQuest</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Special Quests Shop</h1>

      {/* List of special quests available for purchase */}
      {/* For each quest, show a TweedCheckout component */}
      <TweedCheckout
        questId="special-quest-1"
        amount={10} // Amount in USD
      />
      <TweedCheckout
        questId="special-quest-1"
        amount={10} // Amount in USD
      />
      <TweedCheckout
        questId="special-quest-1"
        amount={10} // Amount in USD
      />
      <TweedCheckout
        questId="special-quest-2"
        amount={15} // Amount in USD
      />
      {/* Add more TweedCheckout components for other special quests */}
    </div>
  )
}

export default ShopPage

function purchaseSpecialQuest(questId: string, arg1: string, amount: number) {
    throw new Error('Function not implemented.')
}
