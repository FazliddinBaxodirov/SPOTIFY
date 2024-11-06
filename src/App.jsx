
import './App.css'

import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  console.log(code);
  return code ? <Dashboard code={code}/> : <Login/>
}

export default App
