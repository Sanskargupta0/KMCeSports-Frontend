import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from './store/auth'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import TopPlayers from './pages/TopPlayers/TopPlayers'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/registration'
import Legal from './pages/Legal/legal'
import Logout from './pages/Logout/Logout'
import Error from './pages/Error/Error'
import OtpVerfication from './pages/OtpVerfication/OtpVerfication'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {islogedIn ,userdata } = useAuth();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar islogedIn={islogedIn} avatarURL={userdata.avatarURL} firstName={userdata.firstName}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/TopPlayers" element={<TopPlayers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/OtpVerfication" element={<OtpVerfication />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
