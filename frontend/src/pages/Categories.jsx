import React from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {
    const cat = [
        {
            name: "comedy",
            color: "bg-purple-200",
            to: "/categories/Comedy",
            img: "https://img.freepik.com/free-vector/hand-drawn-bussiness-innovation_23-2149153450.jpg",
        },
        {
            name: "Business",
            color: "bg-green-200",
            to: "/categories/Bussiness",
            img: "https://img.freepik.com/free-vector/hand-drawn-bussiness-innovation_23-2149153450.jpg",
        },
        {
            name: "Education",
            color: "bg-red-200",
            to: "/categories/Education",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPhUBK1c59nkN1XHQu410qHhoC2vX4e37CA&s",
        },
        {
            name: "Hobbies",
            color: "bg-zinc-200",
            to: "/categories/Hobby",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6abnsHmeFbWujFSzvsH_ngeFxw-crjDCS4A&S",
        },  
    ];
  return (
    <div className='h-screen lg:h-[70vh] ' >
       <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cat.map((items, i) => (
            <Link to={items.to} key={i} className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 shadow-xl transition-all duration-300 relative h-[22vh] overflow-hidden `} >
                <div>{items.name}</div>
                <div className='w-[100%] flex items-center justify-end absolute -bottom-2 -right-2 '>
                    <img src={items.img} alt="categoryPoster" 
                        className='rounded rotate-12 h-[15vh] md:h[17vh] lg:h[20vh] ' />
                </div>
            </Link>
        )) }
       </div>
    </div>
  )
}

export default Categories