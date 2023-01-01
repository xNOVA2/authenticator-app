import React from 'react'
import { useState } from 'react';
import './Register.css';
import {Link, useNavigate} from 'react-router-dom'

import axios from 'axios'
const Register = () => {
const naviagte = useNavigate()
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
const [errorr, seterror] = useState('')

const HandleSubmit = async () =>{
  try {
    const res = await  axios.post("http://localhost:5000/register",{
  username:username,
  email:email,
  password:password
 })

 if(res.status>=400 && res.status <=500){
  seterror(res.data.details[0].message);
  
 }
 else{
  seterror(res.data)
 }

 if(res.data == "sucessfully register"){
  naviagte('/login')
 }
  } catch (error) {
    console.log(error);
  }
 

 
}
  return (
 <>
        <form>
            <fieldset>
                <legend>Register Info</legend>

                <label>Username</label>
                <input type="text" onChange={(e)=>setusername(e.target.value)}/>

                <label>Email</label>
                <input type="text"  onChange={(e)=>setemail(e.target.value)} />

                <label>Password</label>
                <input type="text"  onChange={(e)=>setpassword(e.target.value)}/>

              <p><Link to="/login">Already have a Account ?</Link></p>
            <p>{errorr}</p>

            </fieldset>

        </form>
                    <button className='btn' onClick={HandleSubmit}> Submit</button>
 </>
  )
}

export default Register