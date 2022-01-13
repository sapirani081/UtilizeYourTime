import TaskItem from './TaskItem';
import useHttpHook from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import React, { useState, useContext } from 'react';


const Tasks = (props) => {
  const auth=useContext(AuthContext);
  const {errorMessage,sendRequest,clearError}=useHttpHook();

  const deletedHandler= async(taskID)=>{
      // dispatch(tasksAction.removeTask(id));
      // try {
      //   await sendRequest(
      //   'http://localhost:5000/api/tasks/delete-task',
      //   'POST',
      //   JSON.stringify({
      //     taskId: tasksID
      //   }),
      //   {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + auth.token
      //   }); 
      //   setloadedData(props.items);

      // }catch(err){
      //   console.log(err);
      // }
      props.deleteItem(taskID);
    }
  
  // const tasks=useSelector(State=> State.tasks.tasks);
  return (
    <section className='container'>
      <ul>
          {props.items.map((task)=>(
          <TaskItem deleteItem={deletedHandler} key={task._id}
            tasks={{
              id:task._id,
               title: task.title,
               date: task.date,
               description: task.description,
               urgency: task.urgency,
               checked: task.checked}}
          />
        ))}
      </ul>
    </section>
  );
};

export default Tasks;
