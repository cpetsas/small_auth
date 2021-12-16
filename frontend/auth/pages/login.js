import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function LogIn(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [status, setStatus] = useState('')

    useEffect(()=>{

    },[status])

    async function handleLogin(){
        await fetch(process.env.API_ENDPOINT+'/users/login',
        {method: 'POST',
         headers:{'Content-Type': 'application/json',},
         body: JSON.stringify({"email":email,
                               "password":password})})
        .then((response) => response.json().then((json)=>{
            setStatus(response.status)
            props.setName(json.name)
            props.setLogged(json.idToken)
            props.setLogged(response.status)
        }))  
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value)
    }

    const handlePassChange = (event) =>{
        setPassword(event.target.value)
    }

    const getRequestResult = () =>{
        if (status != ''){
            if (status === 200){
                return(
                    <>
                        <h3>Login successful</h3>
                    </>
                )
            } else{
                return(
                    <>
                        <h3>Login failed</h3>
                    </>
                )
            }
        }
    }

    return(
        <>
            <h1> Log In</h1>
            <form onSubmit={handleLogin}>
                <TextField label="Email" variant="filled" type="email" required value={email} onChange={handleEmailChange}/>
                <TextField label="Password" variant="filled" type="password" required value={password} onChange={handlePassChange}/>
                <Button color="primary" variant="contained" onClick={handleLogin}>
                    Submit
                </Button>
            </form>
            <div>
                {getRequestResult()}
            </div>
        </>

    )
}

export default (LogIn)