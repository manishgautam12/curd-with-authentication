import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const paperStyle = { padding: "20px", margin: "auto", marginTop: "30px", height: "60vh", width: "270px" }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()
    console.log(email, password)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9005/api/v1/users/login", {
                email,
                password
            },
            {
                withCredentials: true // include cookies
            }
            )
            // console.log(response)
            if(response.data.statusCode===200){
                navigate("/")
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
                            Login Here
                        </h2>
                        <Avatar sx={{ bgcolor: green[500] }}><LoginIcon /></Avatar>
                    </Grid>
                    <Grid margin="10px" >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="text"
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
                                Login
                            </Button>
                        </form>
                        <Typography>
                            Do you have an account?
                            <Link to="/signup">Signup</Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default Login