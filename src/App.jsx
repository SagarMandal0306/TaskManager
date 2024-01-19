import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './components/login-signup/login'
import Signup from './components/login-signup/signup'
import Home from './page/Home/Home'
import Header from './components/header/Header'
import PageNotFound from './page/PageNotFound'


function App() {
  
// window.addEventListener('beforeunload', function () {
  
  
//   localStorage.clear();
// });
const [authenticated, setAuthenticated] = useState(false);
  

  return (
    <>

    <BrowserRouter>
    <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
         <Route path='/user/login'  element={<Login setAuthenticated={setAuthenticated}/>} />
         <Route path='/user/signup'  element={<Signup/>} />
         <Route path='*'  element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
