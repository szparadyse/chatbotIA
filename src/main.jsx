import Layout  from '@/pages/Layout'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Page from './app/dashboard/page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Page/>}>
          <Route path='/' element={<p>hello</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
