import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SignUp(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    async function handleSignUp(){
        await fetch(process.env.API_ENDPOINT+'/users/signup',
        {method: 'POST',
         headers:{'Content-Type': 'application/json',},
         body: JSON.stringify({"email":email,
                               "name":fullName,
                               "password":password})})
    }

    const handleNameChange = (event) =>{
        setFullName(event.target.value)
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value)
    }

    const handlePassChange = (event) =>{
        setPassword(event.target.value)
    }

    return(
        <>
            <h1> Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <TextField label="Email" variant="filled" type="email" required value={email} onChange={handleEmailChange}/>
                <TextField label="Full name" variant="filled" type="text" required value={fullName} onChange={handleNameChange}/>
                <TextField label="Password" variant="filled" type="password" required value={password} onChange={handlePassChange}/>
            <Button color="primary" variant="contained" onClick={handleSignUp}>
                Sign Up
            </Button>
            </form>
        </>

    )
}

export default (SignUp)