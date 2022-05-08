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
  const [exist, setExist] = useState<boolean>(false);
  const [existPhone, setExistPhone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorPhoneMessage, setErrorPhoneMessage] = useState<string>('');

  useEffect(() => {
    const setDefaultData = async () => {
      if (idContact) {
        await axios.get('https://bkbnchallenge.herokuapp.com/contacts/' + idContact)
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

  const modifyContact = async () => {
    if (idContact) {
      await axios.put('https://bkbnchallenge.herokuapp.com/contacts/' + idContact, { firstName, lastName, email, phone })
        .then(() => {
          history('/')
        })
    }
    else {
      await axios.post('https://bkbnchallenge.herokuapp.com/contacts', { firstName, lastName, email, phone })
        .then(() => {
          history('/')
        })
        .catch((error) => {
          console.log(error)
          if(error.response.data.message.includes('email')){
            setExist(true);
            setErrorMessage(error.response.data.message)
          }
          else{
            setExistPhone(true);
            setErrorPhoneMessage(error.response.data.message)
          }
        })
    }
  }

  return (
    <>
      <h1>Formulario para {idContact ? <span>actualizar</span> : <span>agregar</span>} contacto</h1>

      <form className='formContainer' onSubmit={handleSubmit(modifyContact)}>
        <TextField
          id='firstName'
          required
          value={firstName}
          label="First Name"
          margin="dense"
          color="secondary"
          onChange={(e) => setFirstName(e.target.value)} />
        <TextField
          id='lastName'
          required
          value={lastName}
          label="Last Name"
          margin="dense"
          color="secondary"
          onChange={(e) => setLastName(e.target.value)} />
        <TextField
          id='email'
          type='email'
          required
          error={exist}
          value={email}
          label="Email"
          margin="dense"
          color="secondary"
          onChange={(e) => setEmail(e.target.value)}
          helperText={errorMessage} />
        <TextField
          id='phone'
          required
          error={existPhone}
          value={phone}
          label="Phone"
          margin="dense"
          color="secondary"
          onChange={(e) => {setPhone(e.target.value)}}
          helperText={errorPhoneMessage} />
        <Button type="submit" variant="outlined" >
          {idContact ? <>Actualizar <EditIcon /></> : <>Agregar <AddIcon /></>}
        </Button>
      </form>
    </>
  )
}

export default Contact;