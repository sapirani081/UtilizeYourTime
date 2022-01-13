import classes from './TaskDetails.module.css';
import Card from '../../UI/Card';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useHttpHook from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';

const TaskDetails=(props)=>{
     let {title,date,description,urgency,checked}=props.item;
     const id=props.id;
     const [taskDetailes,setTaskDetailes]=useState({title,date,description,urgency,checked});
     const auth = useContext(AuthContext);
     const { isLoading, error, sendRequest, clearError } = useHttpHook();
     const history = useHistory();
     const [isEditing, setEditing] = useState(false);

     let dateTask=new Date(date);
     const dd = String(dateTask.getDate()).padStart(2, '0');
     const mm = String(dateTask.getMonth()+1).padStart(2, '0'); //January is 0!
     const yyyy = dateTask.getFullYear();
     dateTask = dd + '/' + mm + '/' + yyyy;
     const dateEditTask = yyyy + '-' + mm + '-' + dd;
     const [dateEditTaskState,setdateEditTask]=useState(dateEditTask);

     
     const editHandler = () => {
         setEditing(true);
     }

     const saveHandler = async event => {
        event.preventDefault();
        try {
         await sendRequest(
          process.env.REACT_APP_BACKEND_URL+'/tasks/edit-task',
         'POST',
         JSON.stringify({
           id: id,
           title: taskDetailes.title,
           description:taskDetailes.description,
           date:taskDetailes.date,
           urgency:taskDetailes.urgency,
           checked: taskDetailes.checked
         }),
         {
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + auth.token
         });
         history.goBack();
        } catch (err) {
          console.log(err);
        }
      };    
    return (
        <React.Fragment>
            <Card>
                {!isEditing && 
                    <div> 
                       <h2 className={classes.title}>{title}</h2>
                       <div>
                           <div>
                               <h3 className={classes.headline}>Until Date: </h3>
                               <div className={classes.data}>{dateTask}</div>
                           </div>
                           <div>
                               <h3 className={classes.headline} >Description: </h3>
                               <p className={classes.data}>{description}</p>
                           </div>
                           <div>
                               <h3 className={classes.headline} >Urgency: </h3>
                               <div className={classes.data}>{urgency}</div>
                           </div>
                           <div>
                               <h3 className={classes.headline} >Checked: </h3>
                               <div className={classes.data}>{taskDetailes.checked?'V' : 'X'}</div>
                           </div>
                      </div> 
                      <button className='btn' onClick={editHandler}>Edit</button>
                    </div>
                }
                {isEditing && 
                    <div> 
                        <div className="form-control">
                            <label htmlFor="title">Title: </label>
                            <input type="text" name="title" id="title" value={taskDetailes.title} 
                            onChange={(e)=>{ setTaskDetailes({...taskDetailes,title: e.target.value})}}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="description" id="description" value={taskDetailes.description} 
                            onChange={(e)=>{setTaskDetailes({...taskDetailes,description: e.target.value})}}/>  
                        </div>    
                        <div> 
                            <label htmlFor="date">Date: </label>
                            <input type="date" name="date" id="date" value={dateEditTaskState}
                            onChange={(e)=>{ setdateEditTask(e.target.value); setTaskDetailes({...taskDetailes,date: e.target.value})}}/>
                        </div>
                        <div>
                            <label htmlFor="urgency">Urgency: </label>
                            <input type="number" name="urgency" id="urgency" value={taskDetailes.urgency} max='5'
                            onChange={(e)=>{ setTaskDetailes({...taskDetailes,urgency: e.target.value})}}/>
                        </div>       
                        <div>
                            <label htmlFor="checked">checked: </label>
                            <select name="checked" id="checked" onChange={(e)=>{
                                setTaskDetailes({...taskDetailes,checked: e.target.value});
                                console.log(taskDetailes);}}
                             value={taskDetailes.checked}>
                                  <option value={taskDetailes.checked===true? true : false}>{taskDetailes.checked===true?'YES' : 'NO'}</option>
                                  <option value={taskDetailes.checked===true? false : true}>{taskDetailes.checked===true?'NO' : 'YES'}</option>
                            </select>
                        </div>
                        <button className='btn' onClick={saveHandler}>Save</button>
                    </div>
                }
            </Card>
       </React.Fragment>

    );   
}
export default TaskDetails;