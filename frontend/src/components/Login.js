import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
function Login() {
    const paperStyle = { padding: "20px", margin: "auto", marginTop: "30px", height: "70vh", width: "270px" }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle} >
                    <Grid align="center">
                        <h2>
                            Login Here
                        </h2>
                        <Avatar sx={{ bgcolor: green[500] }}>N</Avatar>
                    </Grid>
                    <Grid margin="10px" >
                        <form >
                            <TextField
                                required
                                id="filled-required"
                                label="username"
                                variant="filled"
                                fullWidth
                            />
                            <TextField
                                required
                                id="filled-required"
                                label="password"
                                variant="filled"
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                >
                                Login
                            </Button>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default Login