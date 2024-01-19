import React from 'react';
import './style.scss';
import axios from 'axios';
import { fetchDataFromApi } from '../../api/api';

const Sorting = ({setTaskDataa}) => {

    const handleSelct=(e)=>{
       const value=e.target.value;
       const name=e.target.name;
       const user_id=localStorage.getItem("session");

       const data=`{"${name}":"${value}","user_id":"${user_id}"}`;
       fetchDataFromApi("sorting.php",data).then(res=>{
        setTaskDataa(res);
       })
    //    axios.post("http://localhost/task_manager/api/sorting.php",data).then(res=>{
    //     setTaskDataa(res?.data);
    //    });
    }



    return (
        <div>
            <select name="sort" id="" onChange={handleSelct}>
                <option value="0" selected>All Task List</option>
                <option value="1">Sort by Complete Task</option>
                <option value="2">Sort by Unomplete Task</option>
                <option value="3">Sort by High Priority</option>
                <option value="4">Sort by Low Priority</option>
            </select>
        </div>
    );
}

export default Sorting;
