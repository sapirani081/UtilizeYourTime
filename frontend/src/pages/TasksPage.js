import Tasks from "../components/Tasks/Tasks";
import React,{ useEffect,useState } from "react";
import useHttpHook from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { useContext } from "react";


const TasksPage = () =>{
    let [loadedData,setLoadedData]=useState(null);
    const { isLoading, error, sendRequest, clearError } = useHttpHook();
    const auth=useContext(AuthContext);

    useEffect(()=>{
        sendRequestMethod();
    }
    ,[]);

    const sendRequestMethod= async () =>{ 
        try {
            const responseData=await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/tasks/tasks');
            setLoadedData(responseData);
        }catch (err){
        }
    };

    const sortByUrgencyHandler =async ()=>{
        try {
            const responseData=await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/tasks/soryByUrgency');
            setLoadedData(responseData);
        }catch (err){
            console.log(err);
        }

    };
    
  const deleteHandler= async(tasksID)=>{
    // dispatch(tasksAction.removeTask(id));
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+'/tasks/delete-task',
      'POST',
      JSON.stringify({
        taskId: tasksID
      }),
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }); 
      sendRequestMethod();
    }catch(err){
      console.log(err);
    }
  }
   return(
       <div className="container" >
           <h2>Your Tasks</h2>
           <button className='btn' onClick={sortByUrgencyHandler}>Sort By Urgency</button>
           <section>
           {loadedData && <Tasks deleteItem={deleteHandler} items={loadedData}/>}
           {error && <div> {error}</div>}
           </section>


       </div>
   )
};

export default TasksPage;