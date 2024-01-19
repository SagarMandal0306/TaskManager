import React, { useEffect, useState } from 'react';
import TodoLogo from "../../../public/todo-logo.png";
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Header = ({authenticated,setAuthenticated}) => {


    const navigate=useNavigate();
    const [name,setName]=useState('');
    

    useEffect(()=>{
        const storedName = localStorage.getItem('name');
        if (storedName) {
          setAuthenticated(true);
          setName(storedName);
        }
    },[authenticated])
    const Logout=()=>{
        localStorage.clear();
        navigate('/user/login')
        setName('');
        setAuthenticated(false)
        
    }
    return (
       <nav>
        <div className="nav-logo">
            <img src={TodoLogo} alt="" />
        </div>
        <div className="right">
            {
                authenticated &&
                    <>
                        <p onClick={Logout}>Logout</p>
                        <p><strong>Name: </strong>{name}</p>
                    </>
                
            }
        </div>
       </nav>
    );
}

export default Header;
