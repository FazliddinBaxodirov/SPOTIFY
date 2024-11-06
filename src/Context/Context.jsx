import { createContext, useContext, useState } from "react";

export const Context = createContext()

export const SpoContext = ({children}) => {
    const [token,setToken] = useState('')
    const [play,setPlay] = useState([])
    const [playing,setPlaying] = useState(false)
    return(
        <Context.Provider value={{token,setToken,play,setPlay,playing,setPlaying}}>{children}</Context.Provider>
    )
}