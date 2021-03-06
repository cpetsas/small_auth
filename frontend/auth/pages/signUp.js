import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SignUp(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [status, setStatus] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{

    },[status])

    useEffect(()=>{

    },[errorMsg])

    async function handleSignUp(){
        await fetch(process.env.API_ENDPOINT+'/users/signup',
        {method: 'POST',
         headers:{'Content-Type': 'application/json',},
         body: JSON.stringify({"email":email,
                               "name":fullName,
                               "password":password})})
        .then((response) => response.json().then((json)=>{
            console.log(json)
            if (response.status != 200){
                setErrorMsg(json)
            }
            console.log(response)
            setStatus(response.status)
        })) 
        //     console.log(response))
        // .then(console.log(response))
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

    const getRequestResult = () =>{
        if (status != ''){
            if (status === 200){
                return(
                    <>
                        <h3>User created successfully</h3>
                    </>
                )
            } else{
                return(
                    <>
                        <h3>User failed to be created
                            because: {errorMsg}
                        </h3>
                    </>
                )
            }
        }
    }

    return(
        <>
            <h1> Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <TextField label="Email" variant="filled" type="email" required value={email} onChange={handleEmailChange}/>
                <TextField label="Full name" variant="filled" type="text" required value={fullName} onChange={handleNameChange}/>
                <TextField label="Password" variant="filled" type="password" required value={password} onChange={handlePassChange}/>
                <Button color="primary" variant="contained" onClick={handleSignUp}>
                    Submit
                </Button>
            </form>
            <div>
                {getRequestResult()}
            </div>
        </>

    )
}

export default (SignUp)