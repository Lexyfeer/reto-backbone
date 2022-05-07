import React, { ReactElement } from "react";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FormControl, Input, InputLabel, Button, TextField } from '@mui/material/';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const Update = ({  }) => {
  const params = useParams();
  const [dataUser, setDataUser] = useState<any>();
  
  const { handleSubmit, formState: { errors } } = useForm();
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');

  useEffect(() => {
    const setDefaultData = async () =>{
      await axios.get(`https://bkbnchallenge.herokuapp.com/contacts/${params.id}`)
      .then((response: any) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        console.log(response);
     })
    }
    setDefaultData();
  }, []);


  const updateAPIData = async () => {
    await axios.put(`https://bkbnchallenge.herokuapp.com/contacts/${params.id}`, { firstName, lastName, email, phone })
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