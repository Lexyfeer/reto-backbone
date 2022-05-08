import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Contact = ({ }) => {
  const history = useNavigate();
  const params = useParams();
  let idContact: any = params.id;

  const { handleSubmit, formState: { errors } } = useForm();
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');

  useEffect(() => {
    const setDefaultData = async () => {
      if (idContact) {
        await axios.get('https://bkbnchallenge.herokuapp.com/contacts/'+idContact)
          .then((response: any) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setPhone(response.data.phone)
          })
      }
    }
    setDefaultData();
  }, []);

  const updateAPIData = async () => {
    if (idContact) {
      await axios.put('https://bkbnchallenge.herokuapp.com/contacts/'+idContact, { firstName, lastName, email, phone })
      .then(() => {
        history('/')
      })
    }
    else{
      await axios.post('https://bkbnchallenge.herokuapp.com/contacts', { firstName, lastName, email, phone })
      .then(() => {
        history('/')
      })
    }
  }

  return (
    <>
      <h1>Formulario para { idContact ? <span>actualizar</span> : <span>agregar</span> } contacto</h1>

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
          onChange={(e) => {
            setEmail(e.target.value);
            // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
          }}
        />
        <TextField
          value={phone}
          
          label="Phone"
          margin="dense"
          color="secondary"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" variant="outlined" >
          { idContact ? <>Actualizar <EditIcon /></> : <>Agregar <AddIcon /></> }
        </Button>
      </form>
    </>
  )
}

export default Contact;