import './App.css'
import Register from './Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Post from './Post'
import { useState } from 'react'
function App() {
const [username, setusername] = useState("please go back and register your self")
  return (
    <Router>
   
    <Routes>
      <Route path='/login' element={<Login  username={setusername} />}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/post' element={<Post username={username}/>}/>

    </Routes>
    </Router>
 
  )
}

export default App
