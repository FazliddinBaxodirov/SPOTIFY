import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CLIENT } from '../../hook/useEnv'
import SpotifyWebApi from 'spotify-web-api-node'
import { Context } from '../../Context/Context'
import { BackIcon, FavoriteIcon, LikeIcon, MediaIcon, MoreIcon, NextIcon, SaveIcon, SearchedIcon, SelectIcon, } from '../../assets/icon'
import LoadingChart from '../../components/LoadingChart/LoadingChart'

function Playlist() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token,setPlay,setPlaying } = useContext(Context)
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT
  })
  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])

  const [info, setInfo] = useState({})
  const [artistTracks,setArtistTracks] =useState([])
  useEffect(() => {
    if (token) {
      spotifyApi.getTrack(id).then(res => {
        const data = {
          artistName: res.body.artists[0].name,
          trackName: res.body.name,
          img: res.body.album.images[0].url,
          time: String(((res.body.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
        }
        setInfo(data)
        spotifyApi.searchTracks(res.body.artists[0].name).then(res => {
          setArtistTracks(res.body.tracks.items.map(item => {
            const data = {
              id:item.id,
              img:item.album.images[1].url,
              album:item.album.name,
              trackName:item.name,
              artistName:item.artists[0].name,
              uri:item.uri,
              isLiked:false,
              isPlaying:false
            }
            return data
          }))
        })
      }
      )
    }
  }, [token])

  function handleTrackClick(item,evt){
    if(evt.target.id === 'like'){
      item.isLiked = !item.isLiked
      setArtistTracks([...artistTracks])
    }
    else{
    artistTracks.filter(item => item.isPlaying = false)
    setPlay(item.uri)
    setPlaying(true)
    item.isPlaying = !item.isPlaying
    setArtistTracks([...artistTracks])
  }}
  return (
    <div className='w-full h-[90vh] bg-gradient-to-b from-[#9ecc0a] via-[#161f03] to-[#121212] overflow-y-auto   p-5'>

      <div className='pt-[21px]  pb-[20px] space-x-[22px]'>
        <button onClick={() => navigate(-1)}><BackIcon /></button>
        <button onClick={() => navigate(+1)}><NextIcon /></button>
      </div>

      <div className='flex items-end shadow-2xl rounded-md space-x-[32px]'>
        <img src={info.img} alt="img" className='w-[297px] rounded-md h-[297px] ' />
        <div className='flex flex-col'>
          <p className='text-[95px] text-white font-black mb-[24px]'>{info.trackName}</p>
          <div className='flex justify-between items-center w-[570px]'>
            <span className='font-medium text-[30px] text-white mb-[33px]'>{info.artistName}</span>
            <span className='font-medium text-[20px] text-white mb-[33px]'>{info.time}</span>
          </div>
        </div>
      </div>

      <div className='mt-[60px] flex justify-between mb-[30px]'>
        <div className='flex space-x-[21px] items-center'>
          <div className='w-[72px] h-[72px] bg-[#65D36E] mr-[16px] rounded-[50%] flex justify-center items-center'>
            <MediaIcon/>
          </div>
          <LikeIcon/>
          <SaveIcon/>
          <MoreIcon/>
        </div>
        <div className='flex space-x-[32px] items-center'>
          <SearchedIcon/>
          <SelectIcon/>
        </div>
      </div>

      <table className='w-full'>
        <thead className='border-b-[2px] border-[#B3B3B3]'>
          <tr >
            <th className='font-medium text-[16px] text-[#B3B3B3] pb-[14px]'>#</th>
            <th className='font-medium text-[16px] text-[#B3B3B3] pb-[14px] text-start'>TITLE</th>
            <th className='font-medium text-[16px] text-[#B3B3B3] pb-[14px] text-start'>ALBUM</th>
            <th className='font-medium text-[16px] text-[#B3B3B3] pb-[14px] text-start'>DATA ADDED</th>
            <th className='font-medium text-[16px] text-[#B3B3B3] pb-[14px] text-center'>TIME</th>
          </tr>
        </thead>
        <tbody>
          {artistTracks?.map((item,index) => (
            <tr key={index} onClick={(evt) => handleTrackClick(item,evt)} className='cursor-pointer'>
              <td className='text-[18px] text-[#B3B3B3] '>{item.isPlaying ? <LoadingChart/> : index + 1}</td>
              <td className='py-[10px]  '>
                <div className='flex space-x-[21px]'>
                  <img src={item.img} alt="img" width={52} height={52} className='w-[52px] h-[52px]' />
                  <div>
                    <p className={`${item.isPlaying ? 'text-[#0cb61a]' :'text-[#B3B3B3]'} font-semibold text-[20px]`}>{item.trackName}</p>
                    <span className='text-[18px] text-[#B3B3B3]'>{item.artistName}</span>
                  </div>
                </div>
              </td>
              <td className='py-[10px] text-[#B3B3B3] text-[18px]'>
                {item.album}
              </td>
              <td className='py-[10px] text-[18px] text-[#B3B3B3]'>

              </td>
              <td className={`py-[10px] text-[18px]  flex space-x-[34px]`}>
                <button id='like' className={`${item.isLiked ? 'text-[#0cb61a]' : 'text-white'}`}>
                <FavoriteIcon/>
                </button>
                <p className='text-white'>3:29</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Playlist
