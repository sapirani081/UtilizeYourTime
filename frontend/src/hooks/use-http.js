// import { useState,useCallback } from "react";

// const useHttpHook = () =>
// {
//     const [errorMessage,setErrorMessage]=useState(null);
//     const clearError = ()=>{
//         setErrorMessage(null);
//     }
//     const sendRequest= useCallback(
//         async (url, method = 'GET',body = null, headers) =>
//         {
//         try {
//             const response=await fetch(url,{
//                 method,
//                 body,
//                 headers
//                         });
//             const responseData=await response.json();
//             if(!response.ok){
//                 throw new Error(response.message);
//             }
//             return responseData;
//         }catch (err){
//             setErrorMessage(err);
//             throw err;
//         }
//     });

//     return ({
//         errorMessage,
//         sendRequest,
//         clearError
//     });
// }

// export default useHttpHook;

import { useContext, useState, useCallback, useRef, useEffect } from 'react';
import AuthContext from '../store/auth-context';

const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, 
    headers = { Authorization: 'Bearer ' + auth.token}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

 export default useHttpHook;
