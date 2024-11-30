import React from 'react'
import {io} from 'socket.io-client'

const App = () => {
  const socket = io(import.meta.env.VITE_BACKEND_URL)

  return (
    <div>App</div>
  )
}
export default App