import z from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Loading } from './loading'

import { useWriteContract } from '@/lib/hooks/useWriteContract'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import ABI from '@/abi/citzen-contract.json'
import { CONTRACT_ADDRESS } from '@/constants'

const citizenSchema = z.object({
  age: z.number().int().positive().min(18).max(150),
  city: z.string().min(1),
  name: z.string().min(1),
  someNote: z.string().min(1)
})

export function CitzenForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof citizenSchema>>({
    resolver: zodResolver(citizenSchema),
    defaultValues: {
      age: 18,
      city: '',
      name: '',
      someNote: ''
    }
  })

  const {
    data: hash,
    error,
    isLoading,
    writeContract,
    reset
  } = useWriteContract()

  function onSubmit(values: z.infer<typeof citizenSchema>) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'addCitizen',
      args: [values.age, values.city, values.name, values.someNote]
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div>
        {error}
        <Button
          onClick={() => {
            reset()
          }}
        >
          Reset
        </Button>
      </div>
    )
  }

  if (hash) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-medium"> You created a new citizen</h3>
        <p> Transaction Hash: {hash}</p>
        <div className="space-x-4 mt-4 flex justify-center items-center">
          <Button
            onClick={() => {
              reset()
            }}
          >
            Register another citizen
          </Button>
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            Go to Citizen List
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" {...field} />
              </FormControl>
              <FormDescription>Please enter your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Please enter your name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="New York" {...field} />
              </FormControl>
              <FormDescription>Please enter your city.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="someNote"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Some Note</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Some note..." {...field} />
              </FormControl>
              <FormDescription>Please enter some note.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={() => {
            console.log('clicked')
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
