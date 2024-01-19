import React, { useEffect, useState } from 'react';
import LoginPost from '../../../public/login-post.png';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import axios from 'axios';
import Alerts from '../Alert';
import { fetchDataFromApi } from '../../api/api';

const Signup = () => {

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


    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs(values=> ({...values,[name]:value}));
    }

const onSubmit=(event)=>{
    event.preventDefault();

    fetchDataFromApi("signup.php",inputs).then(res=>{
        if(res !== "success"){
            setError(true);
            setErrMsg(res);
        }else{
            setError(false);
            navigate("/user/login");
            alert("You are successfully signup");
            
        }
    })
   
}
    return (
        <div className='content'>
            {/* <Alerts see={true} variant={"success"} msg="You are successfully Signup"/> */}
            <div className="wrapper">
                <div className="left">
                    <img src={LoginPost} alt="" />
                </div>
                <div className="right">
                    <form action="">
                       <h1>Signup</h1>
                       <div className="form-contain">
                         {
                                error?(
                                    <p className='error-text'>{errMsg}</p>
                                ):""
                            }
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder='Enter Your Name' name='name' required onChange={handleInput}/>
                        </div>
                        <div className="form-contain">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='Enter Your Email' name='email' required onChange={handleInput}/>
                        </div>
                        <div className="form-contain">
                            <label htmlFor="">Password</label>
                            <div className="pass">
                            <input 
                           
                           type={show?"text":"password"} 
                            
                            placeholder='Enter Your Password' name='pass' required onChange={handleInput}/>
                            {
                            show?(
                                <FaEyeSlash className='eyeslash' onClick={()=>setShow(false)}/>
                            ):(
                                <FaEye className='eye' onClick={()=>setShow(true)}/>
                            )}
                            
                            </div>
                        </div>
                        <div className="form-contain">
                            <label htmlFor="">Re-Enter Password</label>
                            <input type="text" placeholder='Re-Enter Password' name='repass' required onChange={handleInput}/>
                        </div>
                        <input type="submit" value="Login" name='login' className='btn' onClick={onSubmit}/>
                        <p>Already Signup?<span onClick={()=>navigate("/user/login")}>Login</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
