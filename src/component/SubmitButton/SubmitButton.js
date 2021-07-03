import React from 'react';
import './SubmitButton.css';

const Button = ({text, ...props}) => {
    return ( 
        <button className="submitButton" {...props}>
            {text}
        </button>    
     );
}
 
export default Button;