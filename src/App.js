import React, { useState, useEffect } from 'react'
import './App.css';
import VidRec from './stream-record/RingleVidRec';
import {VertModal} from './RingleButton';
import Rbutton from './Rbutton';
import Info from './Info';

  export const AppContext = React.createContext();

  function App() {

  const [clicked, setClicked] = useState(0);


  useEffect (() => {
    console.log(clicked);
  })

  if(clicked === 0){
    return (
      <div className="content">
        <h1>Uploading a Self-introduction Video</h1>
        <p>Please record a 1-minute self-introduction video* for Ringle customers. Ringle customers will be able to watch this video to preview your speaking style and learn more about you. As customers are able to select their own tutors, submitting a professional introduction video is highly recommended. Please note that your self-introduction video can be edited even after you complete uploading it to your page.</p>
        <p className="warning">* Uploading the video is mandatory</p>
        <div className="info">
          <h2>Who and what is this video for?</h2>
          <p className="point"> The short video({">"} 1min) will introduce you to Ringle students,
            who will have an opportunity to select a tutor through the Ringle platform, scheduling for a lesson.</p>
          <p>The video is intended to provide students a general idea of your speaking.</p>
          <h2>Example Videos</h2>
          <div className = "rowC">
            <VertModal buttext="Good Example" title="Good Example of a Self-Introductory Video" hrefV="https://www.youtube.com/embed/5POHbIn7lLc"/>
            <VertModal buttext="Bad Example" title="Bad Example of a Self-Introductory Video" hrefV="https://www.youtube.com/embed/5POHbIn7lLc"/>
          </div>
        </div>
          <AppContext.Provider value={{setClicked}}>
            <Rbutton text="Start Recording my Video"/>
          </AppContext.Provider>

      </div>
    );
  }
  else{
    return (
      <div className="content">
        <h1>Uploading Self-introduction Video</h1>
        <p>Please record a 1-minute self-introduction video* for Ringle customers. Ringle customers will be able to watch this video to preview your speaking style and learn more about you. As customers are able to select their own tutors, submitting a professional introduction video is highly recommended. Please note that your self-introduction video can be edited even after you complete uploading it to your page.</p>
        <p className="warning">* Uploading the video is mandatory</p>
        <Info>
          <h2>Who and what is this video for?</h2>
          <p className="point"> The short video({">"} 1min) will introduce you to Ringle students,
            who will have an opportunity to select a tutor through the Ringle platform, scheduling for a lesson.</p>
          <p>The video is intended to provide students a general idea of your speaking.</p>
          <h2>Example Videos</h2>
          <div className = "rowC">
            <VertModal buttext="Good Example" title="Good Example of a Self-Introductory Video" hrefV="https://www.youtube.com/embed/5POHbIn7lLc"/>
            <VertModal buttext="Bad Example" title="Bad Example of a Self-Introductory Video" hrefV="https://www.youtube.com/embed/5POHbIn7lLc"/>
          </div>
        </Info>
          <AppContext.Provider value={{setClicked}}>
            <Rbutton text="Start Recording my Video"/>
          </AppContext.Provider>
          <VidRec
          countdown={5} color="blue"
          />

          
          <Info>
            <h2>Setting</h2>
              <p className="point"> Please find somewhere well-lighted and quiet where you can be seen and heard clearly.</p>
              <p className="point">Make sure there is nothing around you that could be distracting.</p>
              <br/>
            <h2>Suggested time limit</h2>
              <p>Please keep your introduction video at around 1 minute total.</p>
              <br/>
          </Info>
          <Info>
            <h2>Suggested Time Allocation</h2>
            <div className = "rowC">
              <h2>Basic Introduction</h2>
                <p>10″ ~ 15″</p>
            </div>
              <p className="point"> Please give a brief introduction of yourself in one to two sentences.</p>
              <p className="point">Include your name, school, major, job (if you’re out of school), and your city/country of origin.</p>
              <br/>
            <div className = "rowC">
              <h2>Select and answer a question</h2>
              <p>45″ ~ 50″</p>
            </div>
            <p className="point">Please follow the instructions provided here.</p>
              <div className = "rowC">
                <h2>Finish your video</h2>
                <p> ~ 5″</p>
              </div>
                <p className="point">Sign off with a brief closing comment.</p>
                <p className="point">(e.g. “Thanks for watching my intro, and I hope to see you soon!”</p>
                <br/>
          </Info>
      </div>
    );
  }


}


export default App;

