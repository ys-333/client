import React, { useEffect, useState } from 'react'

import { useJwt, decodeToken } from 'react-jwt'

import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const [loggedOut, setLoggedOut] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
  }
  const myDecodedToken = decodeToken(token)

  useEffect(() => {
    // setFirstName(user.firstName)
    console.log(myDecodedToken)
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/login')
    setLoggedOut(true)
  }
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#">Collabo</a>
        {/* <p>{`Some random boy`}</p> */}
        <p>{`${myDecodedToken.firstName}`}</p>
        {loggedOut == false && <button onClick={logoutHandler}>Log out</button>}
      </nav>
    </header>
  )
}

export default Header

// .form{
//     margin-bottom: 12px;
//     display: flex;
//     flex-direction: column;
//     width: 50%;
//     margin: 0 auto;
//     /* justify-content: center; */
//     /* align-items: center; */
//     background: aliceblue;
//     padding: 68px;
//     marign-left: 15px;
// }

// .input{
//     border: 1px solid cadetblue;
//     padding: 8px 12px;
// }
