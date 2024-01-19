import React, { useEffect, useState } from 'react';
import LoginPost from '../../../public/login-post.png';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './style.scss';
import { fetchDataFromApi } from '../../api/api';

const Login = ({setAuthenticated}) => {

    
    const [show,setShow]=useState(false);
    const [inputs,setInputs]=useState({});
    const [error,setError]=useState(false);
    const [errMsg,setErrMsg]=useState("");
    const navigate=useNavigate();
  


    useEffect(()=>{
        const session=localStorage.getItem("session");
        if(session !== null){
           navigate("/")
        }
    },[])
   

const onSubmit=(event)=>{
    event.preventDefault();
    fetchDataFromApi("login.php",inputs).then(res=>{
        if(res?.respons !== "success"){
            setError(true);
            setErrMsg(res.respons);
            
        }else{
            window.localStorage.setItem("session",res.session);
            window.localStorage.setItem("name",res.name);
            setError(false);
            alert("You are successfull Login");
            setAuthenticated(true);
            navigate("/");
            
        }
    })

   
    
}


    const  handleValue=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=> ({...values,[name]:value}));
    }



    return (
        <div className='content'>
            <div className="wrapper">
                <div className="left">
                    <img src={LoginPost} alt="" />
                </div>
                <div className="right">
                    <form action="">
                       <h1>Login</h1>
                        <div className="form-contain">
                            {
                                error?(
                                    <p className='error-text'>{errMsg}</p>
                                ):""
                            }
                            
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='Enter Your Email' name='email' required onChange={handleValue}/>
                        </div>
                        <div className="form-contain">
                            <label htmlFor="">Password</label>
                            <div className="pass">
                            <input 
                           
                           type={show?"text":"password"} 
                            
                            placeholder='Enter Your Password' name='pass' required  onChange={handleValue}/>
                            {
                            show?(
                                <FaEyeSlash className='eyeslash' onClick={()=>setShow(false)}/>
                            ):(
                                <FaEye className='eye' onClick={()=>setShow(true)}/>
                            )}
                            
                           
                            </div>
                        </div>
                        <input type="submit" value="Login" name='login' className='btn' onClick={onSubmit}/>
                        <p>Didn't Signup Yet?<span onClick={()=>navigate("/user/signup")}>Signup</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
