import React from "react";
import classes from "./Card.module.css";

const Card = props =>{
    return (
        //check it
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    )
}

export default Card;