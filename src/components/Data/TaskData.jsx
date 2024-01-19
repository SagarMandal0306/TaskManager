import React, { useEffect, useState } from 'react';
import "./style.scss";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { PiFlagPennantFill } from "react-icons/pi";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import EditForm from '../Forms/EditForm';
import Sorting from '../sorting/sorting';
import { fetchDataFromApi } from '../../api/api';


const TaskData = ({taskData,setTaskDataa}) => {

    
    // const [task_data, setTaskData] = useState(null);
    const [show, setShow] = useState(false);
    const [uid,setId]=useState();
    const [eid,setEId]=useState();
    const [editShow,setEditShow]=useState();

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  const handleCloseEdit=()=>setEditShow(false);



    const getdata= async () =>{
        const user_id = localStorage.getItem("session");
        const data = JSON.parse(`{"session":"${user_id}"}`)


        fetchDataFromApi("tasklist.php",data).then(res=>{
            setTaskDataa(res)
        })
        // axios.post("http://localhost/Task_Manager/api/tasklist.php", data).then(res => {
            
        //     setTaskDataa(res?.data)
            
        // });
    }

    const handleCkeckbox=(id)=>(e)=>{
        
        // console.log(id)
        let status='';
      let val='';
        if(e.target.checked){
            val=JSON.parse(`{"id":"${id}","status":"true"}`);
            status="complete";
            
        }else{
            val=JSON.parse(`{"id":"${id}","status":"false"}`);
            status="uncomplete";
        }
        fetchDataFromApi("statusupdate.php",val).then(()=>getdata())
        // axios.post("http://localhost/Task_Manager/api/statusupdate.php",val).then(()=>getdata());
    }

    const deleteBtn=(id)=>{
        setShow(true);
        setId(id)
    }

    const handleEdit=(editid)=>{
        setEId(editid);
        setEditShow(true);
    }

    const handleDelete=()=>{
        setShow(false);
        alert("Successfuly Delete")
        const data=JSON.parse(`{"id":"${uid}"}`)
        fetchDataFromApi("deletetask.php",data).then(()=>getdata())
       
        
    }
    useEffect(() => {
        getdata();
       
        
    }, [])
   

    return (
        <>
        <div className='task-data'>
            <div className="header">
               <Sorting setTaskDataa={setTaskDataa}/>
            </div>
            <div className="body">
                <div className="wrapper">

                    {
                        Array.isArray(taskData)?(

                        taskData?.length >0 ? (
                            taskData.map((item)=>(
                                <div className="data-box" key={item.id}>
                                <div className="left">
                                    <p>{item.name}</p>
                                    <h2>{item.desc}</h2>
                                    <p>{dayjs(item.due_date).format("MMM DD,YYYY")}</p>
                                    <span style={item.status == "complete"? {backgroundColor:'green'}:{backgroundColor:'red'}}>{
                                        
                                    item.status}</span>

                                    {
                                        item?.priority == 1?(
                                            <span className='flag' style={{ color: 'red' }}><PiFlagPennantFill /> <strong>High</strong></span>
                                        ):(
                                            <span className='flag' style={{ color: 'green' }}><PiFlagPennantFill /> <strong>Low</strong></span>
                                        )
                                    }
                                    
                                </div>
                                <div className="right">
                                    
                                     {
                                        item.status == "complete"?(
                                            <input type="checkbox" name="" id="" onChange={handleCkeckbox(item.id)}  checked={true}/>
                                        ):(  
                                            <input type="checkbox" name="" id="" onChange={handleCkeckbox(item.id)} checked={false}
                                   
                                    
                                     />
                                       )
                                     } 
                                    
                                    <div className="action">
                                        <CiEdit className='icon' size={25} style={{ color: 'blue' }} onClick={()=>handleEdit(item.id)}/>
                                        <MdDelete className='icon' size={25} style={{ color: 'red' }} onClick={()=>deleteBtn(item.id)}/>
                                    </div>
                                </div>
                            </div>
                            ))
                        ):""
                        ):(
                            <h1>There Is No Any Task .. </h1>
                        )
                    }
                    


                </div>
            </div>


            
        </div>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{backgroundColor:'red'}}>
          <Modal.Title><p style={{color:'white'}}>Alert</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are You Sure To Delete This Item?
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>


        <Modal show={editShow} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton style={{backgroundColor:'blue'}}>
          <Modal.Title><p style={{color:'white'}}>Edit Item</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm Eid={eid} handleClose={handleCloseEdit}  setTaskDataa={setTaskDataa}/>
        </Modal.Body> 
       
      </Modal>

      
      <div className="" style={{height:'100px'}}></div>
        </>
    );
}

export default TaskData;
