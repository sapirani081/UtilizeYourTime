import {useState} from "react";

const useInput = (validateFunction) =>
{
    const [valueEntered, setValueEntered]= useState('');
    const [valueIsTouched, setValueIsTouched]= useState(false);

    const changeValueHandler = (event)=>{
        setValueEntered(event.target.value);
    }
    const valueBlurHandler = ()=>{
        setValueIsTouched(true);
    }

    const isValidValue= validateFunction(valueEntered);
    const hasError= !isValidValue && valueIsTouched;

    // const resetHandler= () =>{
    //     setValueEntered('');
    //     setValueIsTouched(false);
    // }

    //instead of it - make route

    return ({
        valueEntered,
        changeValueHandler,
        valueBlurHandler,
        isValidValue,
        hasError,
        resetHandler
    });
}

export default useInput;