import React from 'react'
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Coin from './Pages/Coin/Coin'
import Footer from './Components/Footer/Footer'



const App = () => {
  return (
    <div className="app">
    <Navbar/>
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/coin/:coinId' element = {<Coin/>}/>
      <Route path = '*' element = {<h1 className='text-3xl text-center mt-10'>Page Not Found</h1>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
