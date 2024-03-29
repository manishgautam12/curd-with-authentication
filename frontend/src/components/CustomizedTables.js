import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useTodo from '../contexts/todo';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CustomizedTables() {
  const { apiStatus, setapiStatusTrue, setapiStatusFalse } = useTodo();
  const [data, setData] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9005/api/v1/todo/fetchAllTodo", {
          withCredentials: true,
        })
        // console.log(response.data)
        setData(response.data.data.todo)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    setapiStatusFalse()
  }, [apiStatus, setapiStatusFalse])



  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9005/api/v1/todo/deleteTodo/${todoId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setapiStatusTrue()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/update/${row._id}`}>
                  <EditIcon />
                </Link>
                <DeleteIcon onClick={() => handleDelete(row._id)} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}