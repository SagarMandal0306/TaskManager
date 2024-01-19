import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDataFromApi } from '../../api/api';



const EditForm = ({Eid,handleClose,setTaskDataa}) => {

    const [inputs,setInputs]=useState({
       id:Eid,
    });
    const [taskItem,setItem]=useState(null);
    const [errorShow,setErrorShow]=useState(false);
    const [error,setError]=useState();
    


    const getData=()=>{
        const obj=JSON.parse(`{"id":"${Eid}"}`)
        fetchDataFromApi("fetchitem.php",obj).then(res=>{
          setInputs(res);
            setItem(res);
        })
       
    }
    useEffect(()=>{
        getData();
       
    },[])
   

    const handleSubmit=(e)=>{
        e.preventDefault();
        

        fetchDataFromApi("edittask.php",inputs).then(res=>{
          if(res != "success"){
            setErrorShow(true);
            setError(res);
           

        }else{
            handleClose();
            setTaskDataa((prevData) =>
            prevData.map((item) =>
              item.id === Eid ? { ...item, ...inputs } : item
            )
          );
        }
        })
        
        

        
    }

   

    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setItem(e.target.value);
        
        
        setInputs(values=>({...values,[name]:value}));
    }


    return (
        <Form >

        {
            errorShow?(
                <p className='error-text'>{error}</p>
            ):""
        }
        
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter task name" name='name' onChange={handleInput}  value={taskItem?.name} readOnly={false} />
       
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" name='desc' onChange={handleInput} value={taskItem?.desc} />
        {/* <input type="text" placeholder="Description" name='desc' onChange={handleInput} value="hii"/> */}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date"  name='date' onChange={handleInput} value={taskItem?.due_date} />
      </Form.Group>

      <Form.Group className="mb-3" >
      <Form.Label>Priority</Form.Label>
      <Form.Select aria-label="Default select example" name='priority' onChange={handleInput} value={taskItem?.priority} >
        <option>Select Priority</option>
        <option value="1">High</option>
        <option value="0">Low</option>
       
    </Form.Select>
    </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    );
}

export default EditForm;
