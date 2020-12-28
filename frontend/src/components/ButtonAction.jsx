import React from 'react'
import './styles/ButtonAction.css'
const ButtonAction = (props) =>{
    return(
        <button className="button-action">
            {props.text}
        </button>
    )
};

export default ButtonAction
