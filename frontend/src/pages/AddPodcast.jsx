import React from 'react'
import { useSelector } from 'react-redux';
import PodcastData from '../components/AddPodcast/PodcastData';
import ErrorPage from './ErrorPage';

const AddPodcast = () => {
    const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
  return (
    <div>
        {isLoggedIn ? <PodcastData/> : <ErrorPage/>}
    </div>
  )
}

export default AddPodcast