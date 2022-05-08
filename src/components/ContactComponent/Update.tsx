import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = ({ }) => {
  let history = useNavigate();

  const params = useParams();

  const { handleSubmit } = useForm();
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');

  useEffect(() => {
    const setDefaultData = async () => {
      await axios.get(`https://bkbnchallenge.herokuapp.com/contacts/${params.id}`)
        .then((response: any) => {
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
          setPhone(response.data.phone)
        })
    }
    setDefaultData();
  }, []);


  const updateAPIData = async () => {
    await axios.put(`https://bkbnchallenge.herokuapp.com/contacts/${params.id}`, { firstName, lastName, email, phone })
      .then(() => {
        history('/')
      })
  }


  return (
    <>
      <h1>Formulario para actualizar contacto</h1>

      <form className='formContainer' onSubmit={handleSubmit(updateAPIData)}>
        <TextField
          value={firstName}
          label="First Name"
          margin="dense"
          color="secondary"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          value={lastName}
          label="Last Name"
          margin="dense"
          color="secondary"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          value={email}
          label="Email"
          margin="dense"
          color="secondary"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          value={phone}
          label="Phone"
          margin="dense"
          color="secondary"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" variant="outlined" endIcon={<EditIcon />}>
          Update contact
        </Button>
      </form>
    </>
  )
}

export default Update;