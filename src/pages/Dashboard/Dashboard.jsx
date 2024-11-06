import React, { useContext, useEffect } from 'react'
import { useAuth } from '../../hook/useAuth'
import CustomRoutes from '../../routes/CustomRoutes'
import Navbar from '../../components/Navbar'
import Activity from '../../components/Activity'
import { Context } from '../../Context/Context'
import SpotifyWebPlayer from 'react-spotify-web-playback'

function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const { token,setToken,setPlaying,play,playing } = useContext(Context)
  useEffect(() => {
    setToken(accessToken)
  }, [accessToken])
  return (
    <>
      <div className={`flex justify-between`}>
        <Navbar />
        <CustomRoutes />
        <Activity />
      </div>
      <div className='absolute bottom-0 w-full'>
        <SpotifyWebPlayer
        token={token}
        uris={play ? [play] : []}
        play={playing}
        callback={e => {
          if(e.isPlaying){
            setPlaying(false)
          }
        }}/>
      </div>
    </>
  )
}

export default Dashboard
