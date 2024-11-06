import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home, Liked, Playlist, Search } from '../pages'


function CustomRoutes() {
    const routeList = [
        {
            id:1,
            path:'/',
            element:<Home/>
        },
        {
            id:2,
            path:'/liked',
            element:<Liked/>
        },
        {
            id:3,
            path:'/music/:id',
            element:<Playlist/>
        },
        {
            id:4,
            path:'/search',
            element:<Search/>
        },
    ]
  return (
    <Routes>
        {routeList.map(item => <Route key={item.id} path={item.path} element={item.element}/>)}
    </Routes>
  )
}

export default CustomRoutes
