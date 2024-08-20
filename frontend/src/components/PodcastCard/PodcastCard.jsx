import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,  useNavigate } from 'react-router-dom'
import Login from '../../pages/Login';
import { playerActions } from '../../strore/player';

const PodcastCard = ({items}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const handlePlay = (e)=>{
    if(isLoggedIn){
        e.preventDefault();
        dispatch(playerActions.setDiv());
        dispatch(playerActions.changeImage(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${items.frontImage}`));
        dispatch(playerActions.changeSong(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${items.audioFile}`));
    }else{
        navigate('/login');
    }
  };
  return (
    <div>
        <Link 
            to={`/description/${items._id}`}
            className='border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-200'
        >
            <div className=''>
               <img 
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${items.frontImage}`} 
                    alt="thumbnail" 
                    className='rounded size-[32vh] object-cover'
                /> 
            </div>
            <div className='mt-2 text-xl font-semibold'>
                {items.title.slice(0,20)}
            </div>
            <div className='mt-2  leading-5 text-slate-500 '>
                {items.description.slice(0,50)}
            </div>
            <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
                {items.category.categoryName}
            </div>
            <div className="mt-2">
                <button
                    className='bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-700 transition-all duration-300  '
                    onClick={handlePlay}
                >Play Now</button>
            </div>
        </Link>
    </div>
  )
}

export default PodcastCard