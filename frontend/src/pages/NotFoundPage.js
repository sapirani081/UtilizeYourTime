import { Link } from 'react-router-dom';
import Card from "../UI/Card";
const NotFoundPage = () =>{
   return(
       <Card>
           <h2> Oops! Page Not Found</h2> 
           <h1>404</h1>
           <Link className='btn' to='/'>Go Back Home</Link>
       </Card>
   )
};

export default NotFoundPage;