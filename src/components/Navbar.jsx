import React from 'react'
import { NavLink } from 'react-router-dom'
import {HomeIcon,LibraryIcon,PlaylistIcon,SearchIcon,LikedIcon} from '../assets/icon'

function Navbar() {
  const navListTop = [
    {
      id:1,
      icon:<HomeIcon/>,
      title:"Home",
      path:'/'
    },
    {
      id:2,
      icon:<SearchIcon/>,
      title:"Search",
      path:'/search'
    },
    {
      id:3,
      icon:<LibraryIcon/>,
      title:"Your Library",
      path:'/#'
    },
  ] 
  const navListBottom = [
    {
      id:1,
      icon:<PlaylistIcon/>,
      title:"Create Playlist",
      path:'/#'
    },
    {
      id:2,
      icon:<LikedIcon/>,
      title:"Liked Songs",
      path:'/liked'
    },
  ] 

  const list = ['Chill Mix','Insta Hits','Your Top Songs 2021','Mellow Songs','Anime Lofi & Chillhop Music','BG Afro “Select” Vibes','Afro “Select” Vibes','Happy Hits!','Deep Focus','Instrumental Study','OST Compilations','Mixed Feelings']
  return (
    <div className='w-[20%] bg-black h-[90vh] pt-[70px] pr-[48px] pl-[30px] overflow-y-auto'>
      <ul className='flex flex-col gap-5 mb-[54px]'>
        {navListTop.map(item => <NavLink className={`text-white flex items-center gap-5 font-bold text-[18px] opacity-[70%]`} key={item.id} to={item.path}>{item.icon}{item.title}</NavLink>)}
      </ul>
      <ul className='flex flex-col gap-5 pb-[20px] border-b-[3px] border-b-[#282828]'>
        {navListBottom.map(item => <NavLink className={`text-white flex items-center gap-5 font-bold text-[18px] opacity-[70%]`} key={item.id} to={item.path}>{item.icon}{item.title}</NavLink>)}
      </ul>
      <ul className='space-y-[20px] mt-[21px] mb-[400px]'>
        {list.map((item,index) => <li className='text-white opacity-[70%] text-[18px] font-normal' key={index}>{item}</li>)}
      </ul>
    </div>
  )
}

export default Navbar
