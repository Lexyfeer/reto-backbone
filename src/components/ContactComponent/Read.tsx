import React, { ReactElement, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const Read = () => {
  const [APIData, setAPIData] = useState([]);
  let results: any = APIData;
  useEffect(() => {
    axios.get('https://bkbnchallenge.herokuapp.com/contacts?perPage=100')
      .then((response: any) => {
        setAPIData(response.data.results);
        console.log(response.data.results);
      })
  }, [])

  const rows = results;

  const setData = (data: any) => {
    let { id, firstName, lastName, email, phone } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Email', email);
    localStorage.setItem('Phone', phone)

    console.log(data);
  }

  const onDelete = (id: string) => {
    axios.delete(`https://bkbnchallenge.herokuapp.com/contacts/${id}`)
  }


  return (
    <>
      <h1>Lista de contactos</h1>
      <Link to='/create'>
      <Tooltip title="Add New Contact">
        <IconButton color="error" aria-label="create">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>firstName</TableCell>
              <TableCell align="right">lastName</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">phone</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell>
                  <Link to='/update'>
                    <Tooltip title="Update contact">
                      <IconButton color="primary" aria-label="Update" onClick={() => setData(row)}>
                        <UpdateIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete contact">
                    <IconButton color="error" aria-label="delete" onClick={() => onDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Read;

