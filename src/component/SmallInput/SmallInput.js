import React from 'react';
import './SmallInput.css';

const SmallInput = ({ inputRef, ...props}) => {
    return ( 
        <input className="smallInput" ref={inputRef} {...props} />
     );
}
 
export default SmallInput;