import React, { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RingleVidRec.css';
import ringleIcon from "./ringleIcon.jpg";
import AWS from 'aws-sdk';


const VidRec = ({countdown, bucket, tutorname}) => {

    const READY = 0;
    const STOP = 1;
    const [recorder, setRecorder] = useState("preStart");
    const [mode, setMode] = useState({md: READY, stuff: "NULL"});
    const myStream = useRef(false);
    //recording

    const TIME = countdown;
    const [timeVar, setTimeVar] = useState({tmLim: TIME, tmPass: 0, tmLeft: TIME, timeItv: null});
    const timerLabel = useRef(false);
    //countdown variables

    const [res, setRes] = useState();
    //resulting video

    useEffect( () => {
        let stream = null;
        async function fetchData(){
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: { ideal: 600, max: 800 }, height: { ideal: 400, max: 600 } } });
            myStream.current.srcObject = stream;
            // timerLabel.current.style.display = "none";
            console.log("updated");
        }
        try{
            fetchData();
        }
        catch(err){
            console.log("User Denied Access")
        }
    }, [])//initialize stream when component in rendered for the first time

    useEffect( () => {
        myStream.current.src = mode.stuff;
        myStream.current.load();
        console.log("useEffectmode")
    }, [mode])//when the mode changes, change the source of the video player

    const upload = () => {

        AWS.config.update({
            region: "ap-northeast-1",
            credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: "ap-northeast-1:8f9f798e-f84f-4988-b8bd-c95b6f6bd9eb",
              RoleArn: 'arn:aws:iam::605039363803:role/Cognito_tutorvidUnauth_Role1'
            }, 
            {region: "ap-northeast-1"}
            )
          });

        const upload = new AWS.S3.ManagedUpload({
            params: {
              Bucket: bucket,
              Key: tutorname+".webm",
              Body: res
            }
          });

        setTimeVar({tmLim: TIME, tmPass: 0, tmLeft: "Uploading...", timeItv: null})
        timerLabel.current.style.zIndex = 1;

        const promise = upload.promise();

        promise.then(
            function(data) {
            timerLabel.current.style.zIndex = -100;
            setTimeVar({tmLim: TIME, tmPass: 0, tmLeft: TIME, timeItv: null})
            alert("Successfully uploaded the video.");
            },
            function(err) {
            return alert("There was an error uploading your video: ", err.message);
            }
        );
    }//upload the video

    const start = async() =>{
        myStream.current.play();
        try{
            let recordData = await startRecording(myStream.current.srcObject, 300000);
            let recordedBlob = new Blob(recordData, { type: "video/webm" });
            setRes(recordedBlob);
            setMode({md: STOP, stuff: URL.createObjectURL(recordedBlob)});
            console.log("Successfully recorded " + recordedBlob.size + " bytes of " +recordedBlob.type + " media.");
        }
        catch(err) {
            console.log("Failed")
        }  
    }//first click of record button

    const restart = async() =>{
        let stream = null;
        setMode({md: READY, stuff: "NULL"});
        async function fetchData(){
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: { ideal: 600, max: 800 }, height: { ideal: 400, max: 600 } } });
            myStream.current.srcObject = stream;
            console.log("updated");
            myStream.current.play();
            try{
                let recordData = await startRecording(myStream.current.srcObject);
                let recordedBlob = new Blob(recordData, { type: "video/webm" });
                setRes(recordedBlob);
                setMode({md: uuidv4(), stuff: URL.createObjectURL(recordedBlob)});
                console.log("Successfully recorded " + recordedBlob.size + " bytes of " +recordedBlob.type + " media.");
            }
            catch(err) {
                console.log("Failed")
            }  
        }
        try{
            fetchData();
        }
        catch(err){
            console.log("User Denied Access")
        }
    }//clicks after the first click of record button

    const startRecording = (stream) => {
        let recorder = new MediaRecorder(stream);
        let data = [];
        setRecorder("Counting");

        //timer
        timerLabel.current.style.zIndex = 1;
        let interval = null;
        interval = setInterval(() => {
          
          // The amount of time passed increments by one
          let tmPass = timeVar.tmPass += 1;
          let tmLeft = timeVar.tmLim - tmPass;

          console.log(tmLeft)
          setTimeVar({
              ...timeVar,
              tmPass: tmPass,
              tmLeft: tmLeft
          })
       
        }, 1000);
        setTimeout(() => { clearInterval(interval); 
            timerLabel.current.style.zIndex = -100; 
            setTimeVar({tmLim: TIME, tmPass: 0, tmLeft: TIME, timeItv: null})
            setRecorder(recorder);
            recorder.ondataavailable = event => data.push(event.data);
            recorder.start();
            console.log(recorder.state + " for seconds...");}, TIME*1000);
        //start recording at the end of timer
     
        let stopped = new Promise((resolve, reject) => {
          recorder.onstop = resolve;
          recorder.onerror = event => reject(event.name);
        });
    
        return Promise.all([
          stopped
        ])
        .then(() => data);
    }//child function of start and restart, starts recording after countdown

    const stop = () => {
        if (recorder.state === "recording"){
            myStream.current.srcObject.getTracks().forEach(track => track.stop());
            recorder.stop();
        }
        setRecorder("reStart");
    }//stop recording

    const srtPreview = () => {
        myStream.current.controls = true;
        myStream.current.play();
    }//start the preview

    const log =(text) => {
        console.log(text)
    }//log on console

    return(
        <div className="recBox" >        
            <div id="video_box" style={{position: 'relative'}} > 
                <span className="timeLabel" ref={timerLabel}>
                    <div className="dark">{timeVar.tmLeft}</div>
                </span>
                <video key={mode.md} ref={myStream} muted poster={ringleIcon}></video>
            </div>
            <div className = "Center">
                <div className = "rowC">
                    <div id="Record" className="RingleButtonL" onClick = {recorder !== "Counting" ? (recorder !== "preStart" ? (recorder === "reStart" ? restart : stop) : start) : log("Can't respond during countdown")} >
                        {recorder !== "preStart"? (recorder === "reStart" ? "Record Again" : "Stop Recording") : "Start Recording"}
                    </div>
                    <div id="Preview" className={mode.md !== READY ? "RingleButton":"RingleButtonD"} onClick = {mode.md !== READY ? srtPreview : log("currently recording")} >
                        Preview
                    </div>
                    <div id="Submit" className={mode.md !== READY ? "RingleButtonR":"RingleButtonDR"} onClick = {upload} >
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VidRec
