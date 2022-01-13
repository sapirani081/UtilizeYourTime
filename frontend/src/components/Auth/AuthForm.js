import { useRef, useState, useContext } from 'react';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import useHttpHook from '../../hooks/use-http';
const AuthForm = ()=> {
    const [isLogin,setIsLogin]=useState(true);
    const emailRef=useRef();
    const passwordRef=useRef();
    const history=useHistory();
    const authCtx=useContext(AuthContext);
    const {error,sendRequest,clearError}=useHttpHook();

    const switchAuthModeHandler=()=>{
        setIsLogin((prevState) => !prevState);
    }
    const submitHandler = async (event)=>{
        event.preventDefault();
        clearError();
        //add validation
        let responseData;
        if(isLogin){
            try{
                responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/login',
                'POST',
                JSON.stringify({
                  email: emailRef.current.value,
                  password:passwordRef.current.value,
                }),
                {
                  'Content-Type': 'application/json'
                }
              );
                authCtx.login(responseData.token);
                history.push('/');
            } catch (err) {
            }
           
        }else{
            try{
                responseData=await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/signup',
                'POST',
                 JSON.stringify({
                    email: emailRef.current.value,
                     password: passwordRef.current.value,
                 }),
                 {'Content-type':'application/json'});
                 setIsLogin(false);
                 authCtx.login(responseData.token);
                 history.push('/');
            }catch (err){
            };
        };
    }
 
    return (
        <section className={classes.container}>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' ref={emailRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordRef} required/>
                </div>
                <div>
                    <button className='btn'>{isLogin ? 'Login' : 'Create Account'}</button>
                </div>
                <button className='btn' type='button' onClick={switchAuthModeHandler} >
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button> 
                <div>{error && <p className={classes.error}>{error}</p>} </div>
            </form>
        </section>
    )
};

export default AuthForm;