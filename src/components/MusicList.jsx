import React, { useContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT } from '../hook/useEnv'
import { Context } from '../Context/Context'
import { useNavigate } from 'react-router-dom'

function MusicList({title}) {
  const navigate = useNavigate()
  const { token, setPlay, setPlaying } = useContext(Context)
  const [tracks, setTracks] = useState([])
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT
  })
  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])
  useEffect(() => {
    if (token) {
      spotifyApi.searchTracks(title).then(res => {
        setTracks(res.body.tracks.items.map(item => {
          const data = {
            id: item.id,
            img: item.album.images[0].url,
            artistName: item.album.artists[0].name,
            uri: item.uri,
            trackName: item.name
          }
          return data
        }))
      }
      )
    }
  }, [token])
  function handlePlay(item) {
    setPlay(item.uri)
    setPlaying(true)
    navigate(`/music/${item.id}`)
  }
  return (
    <div>
      <h2 className='font-bold text-[28px] mb-[26px] text-white'>{title}</h2>
      <div className='flex overflow-x-auto justify-between gap-5'>
        {tracks?.map(item => (
          <div onClick={() => handlePlay(item)} key={item.id} className='min-w-[225px] item cursor-pointer p-[21px] rounded-md'>
            <img src={item.img} alt="track" width={'100%'} className='h-[182px] mb-[25px] rounded-md' />
            <h2 className='text-white mb-2 fot-bold text-[20px]'>{item.trackName}</h2>
            <p className='font-normal text-[18px] text-white opacity-60'>{item.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicList
