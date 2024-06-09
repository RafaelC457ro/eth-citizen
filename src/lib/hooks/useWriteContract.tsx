import { useState } from 'react'
import { AbiItem } from 'web3-utils'
import { useAccount } from './useAccount'
import Web3 from 'web3'

type WriteContractParams = {
  address: string
  abi: AbiItem[]
  functionName: string
  args: any[]
}

type UseWriteContractReturn = {
  data: string | null
  error: string | null
  isLoading: boolean
  writeContract: (params: WriteContractParams) => Promise<void>
  reset: () => void
}

export const useWriteContract = (): UseWriteContractReturn => {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useAccount()

  const writeContract = async ({
    address,
    abi,
    functionName,
    args
  }: WriteContractParams) => {
    try {
      setIsLoading(true)
      const web3 = new Web3(window.ethereum)
      const contract = new web3.eth.Contract(abi, address)
      const transaction = contract.methods[functionName](...args)

      const gas = await transaction.estimateGas({ from: account! })

      const receipt = await transaction.send({
        from: account!,
        gas: gas.toString()
      })

      setData(receipt.transactionHash)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
  }

  return { data, error, isLoading, writeContract, reset }
}
