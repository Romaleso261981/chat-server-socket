import React from 'react'
import io from 'socket.io-client'

import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import s from'./Chat.module.css'

const socket = io.connect('http://localhost:3000')

function Chat() {

	const { search } = useLocation()
   const [params, setParams] = useState(null)
   const [message, setMessage] = useState([])

   useEffect(() => {
      const searchParams = Object.fromEntries(new URLSearchParams(search))
      setParams(searchParams)
      socket.emit('join', searchParams)
   }, [search]);

   useEffect(() => {
      socket.on('message', ({ data }) => {
         console.log(data)
         setMessage([...message, data])
      })
   }, [message])
   

   console.log(params)
   console.log(message)

  return (
     <div className={s.container}>
        <Link to={`/`}>
        go back
        </Link>
        <h1>Chat</h1>
        <span>{ message}</span>
    </div>
  )
}

export default Chat