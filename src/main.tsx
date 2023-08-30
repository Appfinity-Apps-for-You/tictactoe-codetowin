import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import ReactGA from "react-ga4"
import { HelmetProvider } from 'react-helmet-async'

ReactGA.initialize('G-XXX')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
