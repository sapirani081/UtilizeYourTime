import classes from './MainNavigation.module.css';
import { useContext,Link } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavBarElements";

const MainNavigation = () =>{
    const authCtx=useContext(AuthContext);
    const isLoggedIn=authCtx.isLoggedin;
    const history=useHistory();
  
    const logoutHandler=(event)=>{
      event.preventDefault();
      authCtx.logout();
      history.push('/');
    };
    return (

/*{
     <Nav>
          <div className={classes.logo}>Utilize Your Times</div>
         <NavMenu className={classes.nav}>
            {!isLoggedIn &&  }
        //         <NavBtn>
        //         <NavBtnLink to="/auth" >Sign-In</NavBtnLink>
        //         </NavBtn>}
        //     {isLoggedIn && 
        //     <ul>
        //         <NavLink to="/" >HOME</NavLink> 
        //         <NavLink to="/tasks" >MY TASKS</NavLink> 
        //         <NavLink to="/addnewtask" >ADD TASK</NavLink>

        //          <NavBtn>
        //         <NavBtnLink to='/' onClick={logoutHandler}>Logout</NavBtnLink>
        //     </NavBtn> 
        //      </ul> 

        //     }
        // </NavMenu>
        // </Nav>
        // </>*/

        <nav className={classes.nav}>
            <div className={classes.logo}>Utilize Your Times</div>
            {!isLoggedIn &&
            <ul>
              <li><a href="/auth">Sign-In</a></li> 
            </ul>}
            {isLoggedIn && 
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/tasks">My Tasks</a></li>
              <li><a href="/addnewtask">New Task</a></li>
              <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul> }




        </nav>
    )};


export default MainNavigation;