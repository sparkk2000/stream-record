import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import VidRec from './stream-record/RingleVidRec';
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <div className="content">
    <VidRec
          countdown={5} 
          bucket="tutorvid" 
          tutorname= "Houston"
    />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


