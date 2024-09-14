import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchUserProfile, fetchUserNFTs } from '../utils/api' // Ensure these functions are correctly exported from the api module
import ProfileInfo from '../components/ProfileInfo' // Ensure the component is correctly exported
import NFTGallery from '../components/NFTGallery' // Ensure the component is correctly exported
import QuestHistory from '../components/QuestHistory' // Ensure the component is correctly exported
import React from 'react'

interface ProfilePageProps {
  initialProfileData: any // Replace with proper type
  initialNFTs: any[] // Replace with proper type
}

const ProfilePage: NextPage<ProfilePageProps> = ({ initialProfileData, initialNFTs }) => {
  const [profile, setProfile] = useState(initialProfileData)
  const [nfts, setNFTs] = useState(initialNFTs)
  const { publicKey } = useWallet()

  useEffect(() => {
    if (publicKey) {
      fetchUserProfile(publicKey.toString()).then(setProfile)
      fetchUserNFTs(publicKey.toString()).then(setNFTs)
    }
  }, [publicKey])

  if (!publicKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Your Profile - CommuniQuest</title>
        </Head>
        <p className="text-red-500">Please connect your wallet to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{profile.username}'s Profile - CommuniQuest</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Your CommuniQuest Profile</h1>

      <ProfileInfo profile={profile} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your NFT Collection</h2>
      <NFTGallery nfts={nfts} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Quest History</h2>
      <QuestHistory quests={profile.completedQuests} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Note: In a real app, you'd get the user's public key from the session or a secure cookie
  const mockPublicKey = 'mock_public_key' // Replace this with actual auth logic
  const initialProfileData = await fetchUserProfile(mockPublicKey)
  const initialNFTs = await fetchUserNFTs(mockPublicKey)
  return { props: { initialProfileData, initialNFTs } }
}

export default ProfilePage