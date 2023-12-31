import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import TopPlayers from './pages/TopPlayers/TopPlayers'
import Login_SignUp from './pages/Login_SignUp/Login_SignUp'
import Registration from './pages/Registration/registration'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar state="none" login=""/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/TopPlayers" element={<TopPlayers />} />
          <Route path="/auth" element={<Login_SignUp />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
