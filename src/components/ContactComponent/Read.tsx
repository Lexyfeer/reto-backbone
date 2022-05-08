import { useEffect, useState } from "react";
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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ContactsPagination from './ContactsPagination';
import TablePagination from '@mui/material/TablePagination';

const Read = () => {
  const history = useNavigate();

  const [APIData, setAPIData] = useState([]);
  const dataCopy = [...APIData];
  const [page, setPage] = useState(1);
  const [numberOfPages, setnumberOfPages] = useState(10);
  // https://bkbnchallenge.herokuapp.com/contacts?perPage=100

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data } = await axios.get(`https://bkbnchallenge.herokuapp.com/contacts?page=${page}`);
        setAPIData(data?.results);
        setnumberOfPages(data?.totalPages);
      } catch (e) {
        console.log('Error: ', (e as Error).message);
      }
    }  
    getAllContacts();
  }, [page])

  const onDelete = (id: string, index: number) => {
    axios.delete(`https://bkbnchallenge.herokuapp.com/contacts/${id}`)
      .then(() => {
        dataCopy.splice(index, 1);
        setAPIData(dataCopy)
      })
  }

  return (
    <>
      <h1>Lista de contactos</h1>
      <Link to='/create'>
        <Tooltip title="Add New Contact">
          <IconButton color="primary" aria-label="create">
            <AddIcon fontSize='large' />
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
            {dataCopy.map((row: any, index: number) => (
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
                  <Tooltip title="Update contact">
                    <IconButton color="primary" aria-label="Update" onClick={() => history(`/update/${row.id}`)}> <EditIcon />
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ContactsPagination setPage={setPage} pageNumber={numberOfPages} />
    </>
  );
}

export default Read;

