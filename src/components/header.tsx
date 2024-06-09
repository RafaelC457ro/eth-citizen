import { Link } from 'react-router-dom'
import { ConnectWallet } from './connect-wallet'
import { Menu } from './menu'
import { Separator } from '@/components/ui/separator'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b shrink-0 bg-background">
      <div className="w-full flex flex-col">
        <div className="container flex items-center justify-between mx-auto p-4">
          <div className="flex lg:space-x-10">
            <div className="text-lg font-bold text-foreground">
              <Link to="/">ETH Citizen</Link>
            </div>
            <div className="hidden lg:flex items-center justify-end space-x-5">
              <Menu />
            </div>
          </div>
          <ConnectWallet />
        </div>
        <Separator className="lg:hidden" />
        <div className="lg:hidden p-4">
          <Menu />
        </div>
      </div>
    </header>
  )
}
