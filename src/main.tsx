import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import QueryProviders from './provider/query-provider.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { ErrorBoundary } from './utils/ErrorBoundary .tsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}


createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">

      <Toaster toastOptions={{
        classNames: {
          description: "!text-black !text-[14px]",
        }
      }} />

      <QueryProviders>
        <App />
      </QueryProviders>
    </ClerkProvider>
  </ErrorBoundary>
)
