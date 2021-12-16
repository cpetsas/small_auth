import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Welcome(props){

    const handleLogout = () =>{
        props.setLoggedIn(false)
        props.jwt('')
        props.selected('signup')
    }

    return(
        <>
            <h1> Welcome {props.fullName}. To logout click here.</h1>
                <Button color="primary" variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
        </>

    )
}

export default (Welcome)