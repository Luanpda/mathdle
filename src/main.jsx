import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Mathdle from './Mathdle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mathdle />
  </StrictMode>,
)
