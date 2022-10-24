import React, { useRef, useEffect, useState } from 'react'

import { useJwt } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

import Container from './container/Container'
import Header from './Header/Header'
import Login from '../pages/Login'

const Paint = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const { decodedToken: user, isExpired } = useJwt(token)
  if (!user) {
    return <Login />
  }

  return (
    <div>
      <Header />
      <Container />
    </div>
  )
}
export default Paint
