import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddTodo() {
    const formStyle = { display: "flex", margin: "20px", padding: "10px", height: "10vh", justifyContent: "space-between" }

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate=useNavigate();
    console.log(title, description)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9005/api/v1/todo/addTodoItem", {
                title,
                description
            },
                {
                    withCredentials: true // include cookies
                }
            )
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout = async () => {
        try {
            const userConfirmed = window.confirm("Are you sure you want to logout?");
            if (userConfirmed) {
                const response = await axios.post("http://localhost:9005/api/v1/users/logout", null, {
                    withCredentials: true,
                });
                if (response.data.statusCode === 200) {
                    navigate("/login");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Grid>
            <Paper align="center">
                <form onSubmit={handleSubmit} style={formStyle}>
                    <Grid>
                        <TextField
                            required
                            id="filled-required-title"
                            placeholder="Enter title"
                            variant="filled"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            required
                            id="filled-required-description"
                            placeholder="Enter description"
                            variant="filled"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained">Add Note</Button>
                    </Grid>
                    <Grid>
                        <Button
                        variant="contained"
                        onClick={handleLogout}
                        >Logout</Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}
export default AddTodo