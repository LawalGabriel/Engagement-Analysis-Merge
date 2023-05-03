import { useState } from "react";
import "./App.css";

import { UserData } from "./Data";
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');

const MyHeader = (props) => {
  // Create API client
  const { apiData,meetingCount, audioCount,videoCount, ScreenCount} = props;
    const [userData, setUserData] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
          data: UserData.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  
    return (
      
      <div className="container">
  <div className="row mt-2">
      <div className="col-md-6 card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Total Meetings Attended </strong><span class="count">{meetingCount.map(item => (item.count))}   hours</span></p>
            
        </div>
      </div>
      
      {/* <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Meeting Count</strong></p>
            
            
        </div>
      </div> */}
      
      <div className=" col-md-6 card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Audio Engagement Duration</strong><span class="count">{audioCount.map(item => Math.floor((item.count)/3600))}   hours</span></p>
            </div> 
             
        </div>
      </div>
      
      <div className="row mt -2">
        <div className="col-md-6 card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Video Engagement Duration</strong><span class="count">{videoCount.map(item =>Math.floor((item.count)/3600))}   hours</span></p>
                   
        </div></div>
        <div className="col-md-6 card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Screen Share Engagement Duration</strong><span class="count">{ScreenCount.map(item =>Math.floor((item.count)/3600))}   hours</span></p>
            
            
        </div>
      </div>
      {/* <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Screen Share Duration</strong></p>
            
            
        </div>
      </div> */}
      
      </div>
       
        
 
</div>
  
    );
  }
  
  export default MyHeader;