import React from 'react'
import ReactDOM from 'react-dom/client'
import EnglishDynastyApp from './EnglishDynastyApp.tsx'
import './styles/styles.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnglishDynastyApp />
    </BrowserRouter>
  </React.StrictMode>,
)
