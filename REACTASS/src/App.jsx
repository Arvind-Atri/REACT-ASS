import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import './App.css'
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    // routing for the application using Routes and Route components
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App
