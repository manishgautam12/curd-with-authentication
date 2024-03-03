import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
function AddTodo() {
    const formStyle = { display: "flex", margin: "20px", padding: "10px", height: "10vh", justifyContent: "space-between" }

    return (
        <Grid>
            <Paper align="center">
                <form style={formStyle}>
                    <Grid>
                        <TextField
                            required
                            id="filled-required"
                            placeholder="Enter title"
                            variant="filled"

                        />
                    </Grid>
                    <Grid>
                        <TextField
                            required
                            id="filled-required"
                            placeholder="Enter description"
                            variant="filled"

                        />
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained">Add Note</Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}
export default AddTodo