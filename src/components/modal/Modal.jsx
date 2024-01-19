import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa6";
import AddForm from '../Forms/AddForm';

function Addtask({updateTaskData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className='m-btn'>
        <FaPlus size={30}/><span>Add Task</span> 
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddForm handleClose={handleClose} updateTaskData={updateTaskData}/>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Addtask;