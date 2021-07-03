import React, { useCallback, useEffect, useState } from 'react';
import Card from './component/Card/Card';
import List from './component/List/List';
import ListItem from './component/ListItem/ListItem';
import  "./App.css";

const App = () => {   
    const [listItems, setListItems] = useState([]);

        
    const setItems = useCallback((value)=> {
        setListItems(p => [...p, value]);
    })

    useEffect(() => {
        console.log(listItems);
    })

    return (
        <> 
            <div className="container">
                <div className="main">
                    <Card setList={setItems} />
                    <div>

                    <List>
                        {
                            listItems.map((item, index) => (
                                <ListItem key={index}>
                                    {item}
                                </ListItem>
                            ))
                        }
                    </List>
                    </div>
                </div>
            </div>
        </>
    )
}


export default App;