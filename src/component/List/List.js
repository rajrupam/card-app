import React from 'react';
import './List.css';

const List = ({children, ...props}) => {
    return ( 
        <ul className="List" {...props}>
            {children}
        </ul>
     );
}
 
export default List;