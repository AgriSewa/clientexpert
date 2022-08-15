import React from 'react'
import Login from './components/Login'
import VerifyLogin from './components/VerifyLogin'
import NavBar from './components/Navbar'
import Home from './components/Home'
import Results from './components/Results' 
import './App.css'
import './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import SolutionUpload from './components/SolutionUpload';
import AudioMeet from './components/AudioMeet';


const App=()=>{
  return (
    <>
      <BrowserRouter>       
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/expert/ViewResults' element={<Results />}></Route>
          <Route exact path='/api/auth/loginExpert' element={<Login />}></Route>
          <Route exact path='/api/auth/verifyLoginExpert/:phone' element={<VerifyLogin />}></Route>
          <Route exact path='/upload/solution/:id' element={<SolutionUpload />}></Route>
          <Route exact path='/meet/audio/:link' element={<AudioMeet />}></Route>
        </Routes>
      </BrowserRouter> 
    </>           
  )
}

export default App;