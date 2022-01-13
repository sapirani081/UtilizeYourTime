import classes from './TaskItem.module.css';
import Card from '../../UI/Card';
import React, { useState, useContext } from 'react';
import useHttpHook from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';



const TaskItem=(props)=>{
    const {id,title,date,description,urgency,checked}=props.tasks;
    const auth=useContext(AuthContext);
    const history=useHistory();
    const {errorMessage,sendRequest,clearError}=useHttpHook();


    const deletedHandler= async()=>{
      props.deleteItem(props.tasks.id);
        // dispatch(tasksAction.removeTask(id));
        // try {
        //   await sendRequest(
        //   'http://localhost:5000/api/tasks/delete-task',
        //   'POST',
        //   JSON.stringify({
        //     taskId: props.tasks.id
        //   }),
        //   {
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer ' + auth.token
        //   }); 

        // }catch(err){
        //   console.log(err);
        // }
      }
    
    const showDetailsHandler=()=>{
      history.push(`/tasks/${props.tasks.id}`);
    }
    

    return (
      <React.Fragment>
        <Card>
          <div>
            {checked && <h3 className={classes.checked}>{title}</h3> }
            {!checked && <h3>{title}</h3> }
            <button className='btn' onClick={showDetailsHandler}>View Fullscreen</button>
            <button className='btn' onClick={deletedHandler}>Delete</button>
            </div>
       </Card>
       </React.Fragment>
    );   
}
export default TaskItem;