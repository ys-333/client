import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import styles from './Register.module.css'

function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value)
  }
  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value)
  }
  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })

    const data = await response.json()
    if (data.status === 'Ok') {
      navigate('/login')
    }
  }

  return (
    <div>
      <h1 className={styles.heading}>Register</h1>
      <form className={styles.form__container} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={firstNameChangeHandler}
          className={styles.form__input}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={lastNameChangeHandler}
          className={styles.form__input}
        />
        <br />
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
        <input type="submit" value="Submit" className={styles.form__btn} />
      </form>
      <Link className={styles.confirm} to="/login">
        Existing user? Sign In
      </Link>
    </div>
  )
}

export default Register
