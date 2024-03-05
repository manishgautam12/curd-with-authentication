import React, { useState } from "react";
import AddTodo from "./AddTodo";
import CustomizedTables from "./CustomizedTables";
import { Grid } from "@mui/material";
import { TodoProvider } from "../contexts/todo";
function Home() {
 const [apiStatus,setStatus]=useState(true)

 const setapiStatusTrue=()=>{
   setStatus(true)
 }
 const setapiStatusFalse=()=>{
     setStatus(false)
 }
  return (
    <TodoProvider value={{apiStatus,setapiStatusTrue,setapiStatusFalse}}>
      <Grid margin="20px">
        <AddTodo />
        <CustomizedTables />
      </Grid>
    </TodoProvider>
  )
}
export default Home