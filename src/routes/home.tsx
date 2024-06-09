import { CitizenList } from '@/components/citizen-list'
import { useAccount } from '@/lib/hooks/useAccount'
import { PleaseConnectYourWallet } from '../components/please-connect'

export function Home() {
  const { account } = useAccount()
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Eth Citzien</h1>
      <div className="flex items-center justify-center">
        <p className="text-center mt-4 w-[800px]">
          Dive into the future of citizen registries with our blockchain-powered
          platform. Easily browse, add, and manage citizen data with the
          security and transparency of the Ethereum blockchain. Join us in
          revolutionizing how we store and access vital information, ensuring
          integrity and trust every step of the way. Let's build a decentralized
          future together!
        </p>
      </div>

      <div className="flex items-center justify-center mt-8">
        {!account ? <PleaseConnectYourWallet /> : <CitizenList />}
      </div>
    </main>
  )
}
