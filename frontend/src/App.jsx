import React from 'react'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import  {useThemeStore} from './store/useThemeStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
    const{theme}=useThemeStore();

  return (
    <BrowserRouter>
    <div className='min-h-screen  bg-base-200 transition-colors duration-300' data-theme={theme}>

      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
      </Routes>

        <Toaster/>
      </div>
     </BrowserRouter>
  )
}

export default App