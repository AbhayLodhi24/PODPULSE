import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import PodcastCard from '../components/PodcastCard/PodcastCard';


const AllPodcasts = () => {
    const [podcasts , setPodcasts] = useState();
    useEffect(()=>{
        const fetch = async()=>{
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/get-podcasts`);
                setPodcasts(response.data.data);
        }
        fetch();
    },[]);
   

  return (
    <div>
        <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            { podcasts && podcasts.map((items,i)=>(
                <div key={i}> 
                    <PodcastCard items={items} />
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllPodcasts