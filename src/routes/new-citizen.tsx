import { Separator } from '@/components/ui/separator'
import { CitzenForm } from '../components/citzen-form'
import { PleaseConnectYourWallet } from '../components/please-connect'
import { useAccount } from '@/lib/hooks/useAccount'

export function NewCitizen() {
  const { account } = useAccount()
  return (
    <main className="container mx-auto px-4 flex items-center justify-center py-8">
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className="text-lg font-medium">New Citizen</h3>
          <p className="text-sm text-muted-foreground">
            Register a new citizen
          </p>
        </div>
        <Separator />

        {account ? (
          <CitzenForm />
        ) : (
          <div className="py-8">
            <PleaseConnectYourWallet />
          </div>
        )}
      </div>
    </main>
  )
}
