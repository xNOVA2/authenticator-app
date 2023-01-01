import React from 'react'
import { useState } from 'react';
import './Login.css';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
const [error , seterror] = useState('')
const [errorr , seterrorr] = useState('')
const navi = useNavigate()

const HandleSubmit = async () =>{
  const res = await axios.post('http://localhost:5000/login',{
   username:username,
    password:password
  })
  if(username.length>=4 && password.length >= 6){
    seterror(res.data.message)
  }
else{
  seterror(res.data.details[0].message)
}
if(res.data.message == "SUCCESSFULLY LOGIN"){
  navi('/post')
}
props.username(username)
}


  return (
 <>
        <form >
            <fieldset>
                <legend>LOGIN</legend>

                <label>Username</label>
                <input type="text" onChange={(e)=>setusername(e.target.value)}/>


                <label>Password</label>
                <input type="text"  onChange={(e)=>setpassword(e.target.value)}/>

              <p><Link to="/">dont have a  Account?</Link> </p>
              <p>{errorr}</p>
              <p>{error}</p>
            </fieldset>
        </form>
                    <button className='btn btn-login' onClick={HandleSubmit}>Submit</button>
 </>
  )
}

export default Login