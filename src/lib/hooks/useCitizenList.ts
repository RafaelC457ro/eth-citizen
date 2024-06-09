import { Citizen } from '@/types'
import { useEffect, useState } from 'react'
import Web3 from 'web3'

interface UseListCitizensResult {
  citizens: Citizen[]
  loading: boolean
  error: Error | null
}

const useListCitizens = (
  contractAddress: string,
  contractAbi: any
): UseListCitizensResult => {
  const [citizens, setCitizens] = useState<Citizen[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const web3 = new Web3(window.ethereum)
          const contract = new web3.eth.Contract(contractAbi, contractAddress)

          const events = await contract.getPastEvents('Citizen', {
            fromBlock: 0,
            toBlock: 'latest'
          })

          const citizensList = await Promise.all(
            events.map(async (event: any) => {
              const { id, age, name, city } = event.returnValues

              const note: string = await contract.methods
                .getNoteByCitizenId(id)
                .call()

              return {
                id: id.toString(),
                age: age.toString(),
                city, // city is a indexed string which is not possible to parse to a readable string more here: https://github.com/ethers-io/ethers.js/discussions/2171#discussioncomment-1481119
                name,
                someNote: note
              }
            })
          )

          setCitizens(citizensList)
        } else {
          throw new Error('MetaMask is not installed')
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [contractAddress, contractAbi])

  return { citizens, loading, error }
}

export default useListCitizens
