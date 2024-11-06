import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { BackIcon, NextIcon } from '../../assets/icon'
import { useNavigate } from 'react-router-dom'
import Loading from '../../assets/loading.png'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT } from '../../hook/useEnv'
import { Context } from '../../Context/Context'

const MusicList = lazy(() => new Promise((resolve) => {
  return setTimeout(() => resolve(import('../../components/MusicList')), 1000);
}))

function Home() {
  const navigate = useNavigate()
  const {token} = useContext(Context)

const [trendList,setTrendList] = useState([])

const spotifyApi = new SpotifyWebApi({
  clientId:CLIENT
})
useEffect(() => {
  if (!token) return;
  spotifyApi.setAccessToken(token)
}, [token])
useEffect(() => {
  if(token){
    spotifyApi.searchAlbums('Xamdam Sobirov').then(res => {
      setTrendList(res.body.albums.items.splice(0,6).map(item => {
        const data = {
          id:item.id,
          img:item.images[0].url,
          name:item.name,
          uri:item.uri
        }
        return data
      }))
    }
    )

  }
},[token])



  return (
    <Suspense fallback={<div className='w-full h-screen bg-gradient-to-b from-[#3333A3] to-[#121212] flex justify-center items-center'><img src={Loading} width={100} height={100}/></div>}>
      <div className='bg-gradient-to-b from-[#3333A3] to-[#121212] w-[66%] h-[90vh] p-[20px] overflow-y-auto'>
        <div className='pt-[21px]  pb-[20px] space-x-[22px]'>
          <button onClick={() => navigate(-1)}><BackIcon /></button>
          <button onClick={() => navigate(+1)}><NextIcon /></button>
        </div>
        <h2 className='font-bold mb-[29px] text-white text-[39px]'>Good Afternoon</h2>
        <div className='flex mb-[50px] flex-wrap justify-between gap-[16px]'>
          {trendList?.map(item => (
            <div key={item.id} className='flex rounded-md overflow-hidden trends w-[48%] space-x-[21px]  items-center'>
              <img  src={item.img} alt="album" width={82} height={82}/>
              <p className='font-bold text-[20px] text-white'>{item.name}</p>
            </div>
          ))}
        </div>
        <div className='space-y-[50px]'>
        <MusicList title={"Sherali Jo'rayev"} />
        <MusicList title={"Yulduz Usmonova"} />
        <MusicList title={"Munisa Rizayeva"} />
        <MusicList title={"Jahongir Otajonov"} />
        </div>
      </div>
    </Suspense>
  )
}

export default Home
