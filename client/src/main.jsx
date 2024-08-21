import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from "./routes/AppRouter.jsx"
import { PageContextProvider } from "./context/App.context.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PageContextProvider>
    <AppRouter />
  </PageContextProvider>,
)
