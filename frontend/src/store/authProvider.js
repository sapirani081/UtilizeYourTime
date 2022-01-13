import { useState } from 'react';
import AuthContext from './auth-context';

const AuthProvider = (props) => {
   
    const initialToken=localStorage.getItem('token');
    const [tokenState,setTokenState]=useState(initialToken);
    const userLogginin=!!tokenState;

    const logoutHandler= () =>{
        setTokenState(null);
        localStorage.removeItem('token');
    };
    const loginHanler =(tokenUser)=>{
        setTokenState(tokenUser);
        localStorage.setItem('token', tokenUser)
      };

    const authContext = {
        token: tokenState,
        isLoggedin: userLogginin,
        login: loginHanler,
        logout: logoutHandler,
      };
    
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
