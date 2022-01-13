import React,{useState,useContext,useEffect} from "react";
import TaskDetails from "../components/Tasks/TaskDetails";
 import { useParams} from "react-router-dom";
 import useHttpHook from "../hooks/use-http";
 import AuthContext from "../store/auth-context";
const TaskDetailsPage = () =>{
    const params=useParams();
    const {id}=params;
    const { isLoading, error, sendRequest, clearError } = useHttpHook();
    let [loadedData,setLoadedData]=useState(null);

    const auth=useContext(AuthContext);

    useEffect(()=>{
        const sendRequestMethod= async () =>{ 
            try {
                const responseData=await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/tasks/singleTask',
                    'POST',
                    JSON.stringify({
                        taskId: id
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }); 
                    setLoadedData(responseData);
              }catch(err){
                console.log(err);
              } 
        }
        sendRequestMethod();
    }
    ,[]);

    
  
    return <React.Fragment>
        <section className="container">
        <h1>Task Details</h1>
         {loadedData && <TaskDetails id={id} item={loadedData}/>}
        </section>
    </React.Fragment>
};

export default TaskDetailsPage;