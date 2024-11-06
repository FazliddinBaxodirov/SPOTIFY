import React from 'react'

function Login() {
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=cfc135cdcb364697ac50f9e21dab2e5f&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

  return (
    <div className='bg-gradient-to-b from-blue-500 to-black h-screen w-full flex justify-center items-center'>
      <a href={AUTH_URL} className='w-[170px] py-[10px] text-green-500 bg-white text-center rounded-xl duration-300 hover:scale-105 font-semibold border-[3px] border-green-700'>Login to Spotify</a>
    </div>
  )
}

export default Login
