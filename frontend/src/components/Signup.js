import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const paperStyle = { padding: "20px", margin: "auto", marginTop: "30px", height: "80vh", width: "270px" }

    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    // console.log(fullName, username, email, password)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:9005/api/v1/users/register", {
                fullName,
                username,
                email,
                password
            })
            // console.log(response)
            if (response.data.statusCode === 200) {
                toast.success('Signup successful! Redirecting to login page.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle} >
                    <Grid align="center">
                        <h2>
                            Signup Here
                        </h2>
                        <Avatar sx={{ bgcolor: green[500] }}><AccountCircleIcon /></Avatar>
                    </Grid>
                    <Grid marginTop="10px" >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="text"
                                required
                                id="filled-required-fullName"
                                label="fullName"
                                variant="filled"
                                fullWidth
                                style={{ marginBottom: '10px' }}
                                value={fullName}
                                onChange={(e) => { setFullName(e.target.value) }}
                            />
                            <TextField
                                type="text"
                                required
                                id="filled-required-username"
                                label="username"
                                variant="filled"
                                fullWidth
                                style={{ marginBottom: '10px' }}
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                            <TextField
                                type="email"
                                required
                                id="filled-required-email"
                                label="email"
                                variant="filled"
                                fullWidth
                                style={{ marginBottom: '10px' }}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <TextField
                                type="password"
                                required
                                id="filled-required-password"
                                label="password"
                                variant="filled"
                                fullWidth
                                style={{ marginBottom: '10px' }}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Signup
                            </Button>
                        </form>
                        <Typography>
                            Do you have an account?
                            <Link to="/login">Login</Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default Signup