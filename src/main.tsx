import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.scss'
import { BrowserRouter } from 'react-router-dom'
import { EnglishDynastyApp } from './EnglishDynastyApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnglishDynastyApp />
    </BrowserRouter>
  </React.StrictMode>,
)
