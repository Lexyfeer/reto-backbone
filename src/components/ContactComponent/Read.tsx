import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAME } from '../../global/constant';

const Read = () => {
  const history = useNavigate();

  const [APIData, setAPIData] = useState([]);
  const dataCopy = [...APIData];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data } = await axios.get('https://bkbnchallenge.herokuapp.com/contacts?perPage=100');
        // https://bkbnchallenge.herokuapp.com/contacts?perPage=100
        setAPIData(data?.results);
      } catch (e) {
        console.log('Error: ', (e as Error).message);
      }
    }
    getAllContacts();
  }, [])

  const onDelete = (id: string, index: number) => {
    axios.delete('https://bkbnchallenge.herokuapp.com/contacts/' + id)
      .then(() => {
        dataCopy.splice(index, 1);
        setAPIData(dataCopy)
      })
  }
  interface Column {
    id: 'firstName' | 'lastName' | 'email' | 'phone' | 'update' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  const columns: readonly Column[] = [
    { id: 'firstName', label: 'First Name', minWidth: 140 },
    { id: 'lastName', label: 'Last Name', minWidth: 140 },
    { id: 'email', label: 'Email', minWidth: 140 },
    { id: 'phone', label: 'Phone', minWidth: 140 },
    { id: 'update', label: 'Update', minWidth: 50 },
    { id: 'delete', label: 'Delete', minWidth: 50 },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h1>Lista de contactos</h1>
      <div className='addBtn'>
        <Link href={`/${ROUTES_NAME.CONTACTS}/${ROUTES_NAME.CREATE}`} underline='none'>
          <Button variant="contained" endIcon={<AddIcon fontSize='large' />}>
            Add
          </Button>
        </Link>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCopy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        <Tooltip title="Update contact">
                          <IconButton color="primary" aria-label="Update" onClick={() => history(`/${ROUTES_NAME.CONTACTS}/${row.id}/${ROUTES_NAME.UPDATE}`)}> <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete contact">
                          <IconButton color="error" aria-label="delete" onClick={() => onDelete(row.id, index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataCopy.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Read;

