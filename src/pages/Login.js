import React, { useState } from 'react'

import styles from './login.module.css'

import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()
    if (data.token) {
      console.log(data)
      localStorage.setItem('token', data.token)
      navigate('/')
    } else {
      alert('Login credentials wrong')
    }
  }

  return (
    <div>
      <h1 className={styles.heading}>Log in</h1>
      <form className={styles.form__container} onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={emailChangeHandler}
          className={styles.form__input}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={passwordChangeHandler}
          className={styles.form__input}
        />
        <br />
        <input className={styles.form__btn} type="submit" value="Submit" />
      </form>
      <Link className={styles.confirm} to="/register">
        New User? Register Here
      </Link>
    </div>
  )
}

export default Login
