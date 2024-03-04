import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Update() {
    const paperStyle = { padding: "20px", height: "40vh", width: "400px", margin: "20px auto" }
    const { id } = useParams();

    const navigate=useNavigate();
    const [data, setData] = useState({
        title: '',
        description: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:9005/api/v1/todo/updateTodo/${id}`, {
                title: data.title,
            },
                {
                    withCredentials: true,
                }
            )
            console.log(response.data.statusCode)
            if(response.data.statusCode===200){
                navigate("/")
            }else{
                alert("Record updation failed")
                navigate("/")
            }
        } catch (error) {

        }
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <h2>Update value</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <TextField
                            id="standard-title-input"
                            label="title"
                            type="text"
                            autoComplete="current-title"
                            variant="standard"
                            fullWidth
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="standard-description-input"
                            label="description"
                            type="text"
                            autoComplete="current-description"
                            variant="standard"
                            fullWidth
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </Grid>
                    <Grid marginTop="10px" marginBottom="10px">
                        <Button type="submit" variant="contained" fullWidth>Update</Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}
export default Update