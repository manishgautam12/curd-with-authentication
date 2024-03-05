import React, { useState } from "react";
import AddTodo from "./AddTodo";
import CustomizedTables from "./CustomizedTables";
import { Grid } from "@mui/material";
function Home(){
    const [updateData,setUpdateData]=useState(true);

    const changeUpdateData=(value)=>{
      setUpdateData(value);
    }
    return (
       <Grid  margin="20px">
       <AddTodo changeUpdateData={changeUpdateData} />
       <CustomizedTables updateData={updateData} changeUpdateData={changeUpdateData} />
       </Grid>
    )
}
export default Home