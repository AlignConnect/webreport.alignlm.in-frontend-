import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/route'
import { Suspense } from 'react';
function App() {



  return (
    <div>
      <Suspense fallback={<div>Loading route...</div>}>
        <RouterProvider router={router} />
      </Suspense >
    </div>
  )
}

export default App
