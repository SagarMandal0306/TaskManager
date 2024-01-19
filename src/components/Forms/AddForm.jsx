import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchDataFromApi } from '../../api/api';

function AddForm({handleClose,updateTaskData}) {

    const [inputs,setInputs]=useState({
        user_id:localStorage.getItem("session"),
        status:"uncomplete"
    });
    const [errorShow,setErrorShow]=useState(false);
    const [error,setError]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();

        fetchDataFromApi("addtask.php",inputs).then(res=>{
          if(res != "success"){
            setErrorShow(true);
            setError(res);
           

        }else{
            
            handleClose();
            updateTaskData(inputs);
            // location.reload()
        }
        })
        

        
    }

   

    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        // const user_id=localStorage.getItem("session")
        setInputs(values=>({...values,[name]:value}));
    }


  return (
    <Form >

        {
            errorShow?(
                <p className='error-text'>{error}</p>
            ):""
        }
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter task name" name='name' onChange={handleInput}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" name='desc' onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date"  name='date' onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Priority</Form.Label>
      <Form.Select aria-label="Default select example" name='priority' onChange={handleInput}>
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

export default AddForm;