import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react'
import Web3 from 'web3'
import { set } from 'zod'

interface AccountProviderContextType {
  connect: () => Promise<void>
  disconnect: () => void
  account: string | null
  connected: boolean
  walletIsAvailable: boolean
  networkError: string | null
}

const MetaMaskContext = createContext<AccountProviderContextType | undefined>(
  undefined
)

interface MetaMaskProviderProps {
  chainId: bigint
  children: ReactNode
}

export function AccountProvider({ children, chainId }: MetaMaskProviderProps) {
  const [account, setAccount] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const walletIsAvailable = typeof window.ethereum !== 'undefined'

  useEffect(() => {
    const checkConnection = async () => {
      const provider = new Web3(window.ethereum)

      const accounts = await provider.eth.getAccounts()

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setConnected(true)
      }
    }
    if (walletIsAvailable) {
      checkConnection()
    }
  }, [walletIsAvailable, chainId])

  useEffect(() => {
    const getChainId = async () => {
      const provider = new Web3(window.ethereum)
      const currentChainId = await provider.eth.getChainId()

      if (BigInt(chainId) !== currentChainId) {
        setError('Wrong network')
        setConnected(false)
        setAccount(null)
      } else {
        setError(null)
        setConnected(true)
      }
    }

    if (walletIsAvailable) {
      getChainId()
    }

    const chainListener = () => {
      getChainId()
    }

    window.ethereum!.on('chainChanged', chainListener)

    return () => {
      window.ethereum!.removeListener('chainChanged', chainListener)
    }
  }, [walletIsAvailable, chainId])

  const connect = useCallback(async () => {
    if (window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const web3Provider = new Web3(window.ethereum)

        const accounts = await web3Provider.eth.getAccounts()
        setAccount(accounts[0])
        setConnected(true)
      } catch (error) {
        console.error('Failed to connect to MetaMask', error)
      }
    } else {
      console.error('MetaMask is not installed')
    }
  }, [])

  const disconnect = useCallback(() => {
    setConnected(false)
    setAccount(null)
  }, [])

  return (
    <MetaMaskContext.Provider
      value={{
        connect,
        disconnect,
        walletIsAvailable,
        account,
        connected,
        networkError: error
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useAccount = (): AccountProviderContextType => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider')
  }
  return context
}
