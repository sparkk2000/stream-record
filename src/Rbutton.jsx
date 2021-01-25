import './App.css';
import React, { useContext } from 'react'
import {AppContext} from './App';

const Rbutton = ({text}) => {
    const {setClicked} = useContext(AppContext);
  
    return(
          <div onClick={()=>{setClicked(1)}} className="Rbutton">
            {text}
          </div>
    );
  }

export default Rbutton;