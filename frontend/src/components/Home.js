import React from "react";
import AddTodo from "./AddTodo";
import CustomizedTables from "./CustomizedTables";
import { Grid } from "@mui/material";
function Home(){
    return (
       <Grid  margin="20px">
       <AddTodo />
       <CustomizedTables />
       </Grid>
    )
}
export default Home