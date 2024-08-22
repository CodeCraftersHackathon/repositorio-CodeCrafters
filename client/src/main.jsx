import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from "./routes/AppRouter.jsx"
import { PageContextProvider } from "./context/App.context.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

const clientId = import.meta.env.VITE_0AUTH_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <PageContextProvider>
    <GoogleOAuthProvider clientId={clientId}>
      <AppRouter />
    </GoogleOAuthProvider>
  </PageContextProvider>,
)
