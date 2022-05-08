import { useState } from 'react';
import { useForm } from "react-hook-form";
import { FormControl, Input, InputLabel, Button } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  let history = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const onSubmit = async (data: any) => {
    await axios.post('https://bkbnchallenge.herokuapp.com/contacts', { firstName, lastName, email, phone })
      .then(() => {
        history('/')
      })
  }

  return (
    <>
      <h2>Formulario Agrega un nuevo contacto</h2>

      <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
        <FormControl color="secondary" >
          <InputLabel htmlFor="first-name">Firs Name</InputLabel>
          <Input aria-describedby="my-helper-text" className='inputLine ' {...register('firstName')} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl color="secondary">
          <InputLabel htmlFor="last-name">Last Name</InputLabel>
          <Input aria-describedby="my-helper-text" className='inputLine' {...register('lastName')} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl color="secondary">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input type='text' id="my-input" aria-describedby="my-helper-text" className='inputLine' {...register('email', {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
          })} onChange={(e) => setEmail(e.target.value)} />
          {errors.email?.type === 'pattern' && <p>Introduce un formato de Email que sea valido</p>}
        </FormControl>
        <FormControl color="secondary">
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input type='tel' aria-describedby="my-helper-text" className='inputLine' {...register('phone')} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <Button type="submit" variant="outlined" endIcon={<AddIcon />}>
          Add
        </Button>
      </form>
    </>
  )
}

export default Create;