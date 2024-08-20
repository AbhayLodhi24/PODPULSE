import React, { useEffect, useRef, useState } from "react";
import { IoPlayBackOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../strore/player";

const AudioPlayer = () => {
    const [isSongPlaying , setIsSongPlaying] = useState(false);
    const [duration , setDuration] = useState(0);
    const [currentTime , setCurrentTime] = useState();
    const dispatch = useDispatch();
    const playerDivState = useSelector((state)=>state.player.isPlayerDiv);
    const songPath = useSelector((state)=>state.player.songPath);
    const img = useSelector((state)=>state.player.img);

    const closeAudioPlayerDiv = (e)=>{
        e.preventDefault();
        dispatch(playerActions.closeDiv());
        dispatch(playerActions.changeImage(""));
        dispatch(playerActions.changeSong(""));
    
    };
    const audioRef = useRef();
    // const duration = audioRef.current.duration;
    const formatTime = (time)=>{
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    const handlePlayPodcast = (e)=>{
            setIsSongPlaying(!isSongPlaying);
            if(isSongPlaying){
                audioRef.current.pause();
            }else{
                audioRef.current.play();
            }
        };

    const handleTimeUpdate = ()=>{
        if(audioRef.current){
            setCurrentTime(audioRef.current.currentTime);
        }
    }
    const handleLoadMetaData = ()=>{
        if(audioRef.current){
            setDuration(audioRef.current.duration);
        }
    }

    const backward = ()=>{
        if(audioRef.current){
            let newTime = Math.max(0 , currentTime-10);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }

    const forward = ()=>{
        if(audioRef.current){
            let newTime = Math.min(duration , currentTime+10);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleSeek = (e)=>{
        if(audioRef.current){
            let newTime = (e.target.value / 100) * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    useEffect(()=>{
        handlePlayPodcast();
        const currentAudio = audioRef.current ;
        if(currentAudio){
            currentAudio.addEventListener("timeupdate", handleTimeUpdate);
            currentAudio.addEventListener("loadedmetadata" , handleLoadMetaData);
        }
    }, [songPath]);

  return (
    <div 
        className={`${playerDivState ?"fixed" : "hidden" }  bottom-0 left-0 w-[100%] bg-zinc-900 text-white px-4 rounded py-4 flex items-center gap-4 `}
    >
      <div className="hidden md:block w-1/3">
        <img src={img} 
            alt="coverImage" 
            className={`size-12 rounded-full object-cover`}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
            <button onClick={backward}><IoPlayBackOutline /></button>
            <button onClick={handlePlayPodcast}>
                { isSongPlaying ? <FaRegPauseCircle /> :  <FaRegPlayCircle /> }
            </button>
            <button onClick={forward} ><IoPlayForwardOutline /></button>
        </div>
        <div className="w-full flex items-center justify-center mt-3">
            <input 
                type="range" 
                min='0' 
                max='100' 
                value={(currentTime / duration ) * 100 || 0}
                className="w-full hover:cursor-pointer"
                onChange={handleSeek}
            />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end">
       <button onClick={closeAudioPlayerDiv}> <ImCross /> </button>
      </div>
      <audio ref={audioRef} src={songPath}></audio>
    </div>
  );
};

export default AudioPlayer;
