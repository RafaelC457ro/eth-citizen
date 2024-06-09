import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'next-themes'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { AccountProvider } from '@/lib/hooks/useAccount.tsx'
import { Root } from '@/routes/root.tsx'
import { Home } from '@/routes/home.tsx'
import { NewCitizen } from '@/routes/new-citizen.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'new-citizen',
        element: <NewCitizen />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AccountProvider chainId={BigInt(import.meta.env.VITE_CHAIN_ID)}>
        <RouterProvider router={router} />
      </AccountProvider>
    </ThemeProvider>
  </React.StrictMode>
)
