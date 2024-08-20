import React from 'react'
import {BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from './strore/auth'
import AddPodcast from './pages/AddPodcast'
import AllPodcasts from './pages/AllPodcasts'
import CategoriesPage from './pages/CategoriesPage'
import DescriptionPage from './pages/DescriptionPage'

const App = () => {
  const dispatch =  useDispatch();
  useEffect(()=>{
    const fetch = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/check-cookie` ,
          {withCredentials: true });
          if(response.data.message){
            dispatch(authActions.login());
          }
      } catch (error) {
        
      }
    };
    fetch();
  },[]);
  return (
    <div>
    <Router>
      <Routes >
        <Route path='/' element={<MainLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='/categories' element={<Categories/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/add-podcast' element={<AddPodcast/>} />
          <Route path='/all-podcasts' element={<AllPodcasts/>} />
          <Route path='/categories/:cat' element={<CategoriesPage/>} />
          <Route path='/description/:id' element={<DescriptionPage/>} />
        </Route>
        <Route path='/' element={<AuthLayout/>} >
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App