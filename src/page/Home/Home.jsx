
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.scss";

import Addtask from '../../components/modal/Modal';
import TaskData from '../../components/Data/TaskData';



const Home = () => {


    const [taskData, setTaskDataa] = useState([]);

    const updateTaskData = (newTask) => {
        setTaskDataa((prevData) => [...prevData, newTask]);
    };
    const navigate = useNavigate();
    useEffect(() => {
        
        const session = localStorage.getItem("session");
        if (session == null) {
            navigate("/user/login");
        }
    }, [])
    return (
        <div className='Home'>
            <Addtask  updateTaskData={updateTaskData}/>
            <TaskData taskData={taskData} setTaskDataa={setTaskDataa}/>
        </div>
    );
}

export default Home;
