import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import SignUp from './signUp'
import LogIn from './login';
import Button from '@mui/material/Button';
import Welcome from './welcome'

export default function Home() {
  const [selected, setSelected] = useState('signup')
  const [jwt, setJWT] = useState('')
  const [loggedin, setLoggedIn] = useState(false)
  const [name, setName] = useState('')

  useEffect(()=>{

  },[selected])

  useEffect(()=>{

  },[jwt])

  useEffect(()=>{

  },[loggedin])

  useEffect(() =>{
    console.log(name)
  },[name])

  const handleClick = (event) =>{
    setSelected(event.target.value)
  }

  const saveJWT = (jwt) =>{
    console.log(jwt)
    setJWT(jwt)
  }

  const checkLoggedIn = (logged) => {
    if (logged == 200){
      setLoggedIn(true)
    }
  }

  const renderOptions = () => {
    if (loggedin == false){
      return(
        <>
          <Button color="primary" variant="contained" value='signup' onClick={handleClick}>
            Sign Up
          </Button>
          <Button color="primary" variant="contained" value='login' onClick={handleClick}>
              Login
          </Button>
        </>
      )
    } else {
      return(
        <>
        <Welcome fullName={name} setLoggedIn={setLoggedIn} jwt={setJWT} selected={setSelected}>

        </Welcome>
        </>
      )
    }
  }

  const renderForm = () => {
    if (loggedin == false){
      if (selected == 'signup'){
        return(
          <>
          <SignUp>

          </SignUp>
          </>
        )
      } else {
        return(
          <>
          <LogIn saveToken={saveJWT} setLogged={checkLoggedIn} setName={setName}>

          </LogIn>
          </>
        )
      }
    }
  }

  return (
    <div className={styles.container}>
      {renderOptions()}
      {renderForm()}
    </div>
  )
}
