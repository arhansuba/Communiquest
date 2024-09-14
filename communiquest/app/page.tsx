import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to CommuniQuest</h1>
      <nav>
        <Link href="/quests">Quests</Link>
        <Link href="/governance">Governance</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/shop">Shop</Link>
      </nav>
    </main>
  )
}