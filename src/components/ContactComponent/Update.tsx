import React, { ReactElement } from "react";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FormControl, Input, InputLabel, Button, TextField } from '@mui/material/';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';

// interface Inputs {
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string,
// }

const Update = (): ReactElement => {
  const { handleSubmit, formState: { errors } } = useForm();
  const [id, setID] = useState<string | null>('');
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setEmail(localStorage.getItem('Email'));
    setPhone(localStorage.getItem('Phone'));

  }, []);


  const updateAPIData = async () => {
    await axios.put(`https://bkbnchallenge.herokuapp.com/contacts/${id}`, { firstName, lastName, email, phone })

    console.log('aqui hshshshs', firstName);
  }


  return (
    <>
      <h1>Formulario para actualizar contacto</h1>

      <form className='formContainer' onSubmit={handleSubmit(updateAPIData)}>
        <TextField
          // required
          // id="first-name"
          value={firstName}
          label="First Name"
          margin="dense"
          color="secondary"
          // {...register('firstName')}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          // required
          // id="last-name"
          value={lastName}
          label="Last Name"
          margin="dense"
          color="secondary"
          // {...register('lastName')}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          // required
          // id="email"
          value={email}
          label="Email"
          margin="dense"
          color="secondary"
          // {...register('email')}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          // required
          // id="phone"
          value={phone}
          label="Phone"
          margin="dense"
          color="secondary"
          // {...register('phone')}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" variant="outlined" endIcon={<UpdateIcon />}>
          Update contact
        </Button>
      </form>
    </>
  )
}

export default Update;