import React, { useContext,useRef ,useState} from 'react';
import { useHistory } from 'react-router-dom';
import useHttpHook from "../hooks/use-http";
import AuthContext from '../store/auth-context';
import classes from '../components/Tasks/AddTask.module.css';
import "react-datepicker/dist/react-datepicker.css";


const AddNewTask = ()=>{
   const auth = useContext(AuthContext);
   const { isLoading, error, sendRequest, clearError } = useHttpHook();
  //  const [endDate, setEndDate] = useState(new Date());
   const history = useHistory();
   const titleRef=useRef();
   const dateRef=useRef();
   const descriptionRef=useRef();
   const urgencyRef=useRef();

   const AddNewTaskHandler = async event => {
         event.preventDefault();
         try {
          await sendRequest(
            process.env.REACT_APP_BACKEND_URL+'/tasks/addNewTask',
          'POST',
          JSON.stringify({
            title: titleRef.current.value,
            description:descriptionRef.current.value,
            date:dateRef.current.value,
            urgency:urgencyRef.current.value
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
          });
           history.replace('/tasks');
         } catch (err) {
           console.log(err);
         }
       };    
    return (
      <section className={classes.container}>
      <form onSubmit={AddNewTaskHandler}>
          <div >
              <input placeholder="Title" type='text' id='title' ref={titleRef} required/>
          </div>
          <div >
              <input placeholder="Date" type='date' id='date' ref={dateRef} required/>
              {/* <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> */}
          </div>
          <div>
              <input placeholder="Description" type='text' id='description' ref={descriptionRef} required/>
          </div>
          <div>
              <select placeholder="Urdency" className={classes.dropdown} id='urgency' ref={urgencyRef} required>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </select>
          </div>
          <div>
              <button className='btn'>Add Task</button>
          </div>
         
      </form>
      {error &&
      <div>{error && <p>{error}</p>} </div> }

  </section>   
    )

}
export default AddNewTask;