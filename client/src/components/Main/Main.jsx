import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import s from './Main.module.css'




function Main() {

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  function hendlClick(e) { 
    const isInvalid = !name || !room
    if (isInvalid) {
      e.preventDefault()
    }

  }
  return (
    <div className={s.container}>
      <h1 className={s.header}>Join</h1>
      <form className={s.form}>
        <input
          className={s.input}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)} 
          autoComplete="off"
          value={name}
          required
        />
        <input
          className={s.input}
          type="text"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          autoComplete="off"
          value={room}
          required
        />
        <Link
          onClick={hendlClick}
          to={`/chat?name=${name}&room=${room}`}>
        <button
          className={s.button}
          type="submit"
        >
          Sign In
        </button>
        </Link>
        

      </form>
   </div>
  )
}

export default Main