import React from 'react';
import './ListItem.css';

const ListItem = ({children, ...props}) => {
    return ( 
        <li {...props} className="listItem">
            {children}  
        </li>
     );
}
 
export default ListItem;