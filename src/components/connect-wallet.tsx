import { CaretDownIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAccount } from '@/lib/hooks/useAccount'

import { shortenAddress } from '@/lib/utils'

export function ConnectWallet() {
  const { walletIsAvailable, account, connect, disconnect, networkError } =
    useAccount()

  if (!walletIsAvailable) {
    return null
  }

  if (account && !networkError) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="space-x-1">
            <span>{shortenAddress(account)} </span>
            <CaretDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => disconnect()}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const buttonText = networkError ? networkError : 'Connect Wallet'

  return (
    <Button onClick={() => connect()} disabled={!!networkError}>
      {buttonText}
    </Button>
  )
}
