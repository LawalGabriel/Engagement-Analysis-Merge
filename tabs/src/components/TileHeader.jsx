import { useState } from "react";
import "./App.css";

import { UserData } from "./Data";
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');

const MyHeader = () => {
  // Create API client
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
  <div className="row pt-3 pb-3">
      <div className="col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Call Count</strong></p>
            
            
        </div>
      </div>
      
      <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Meeting Count</strong></p>
            
            
        </div>
      </div>
      
      <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Reoccuring Meeting Count</strong></p>
            </div> 
             
        </div>
      </div>
      
      <div className="row pt-3 pb-3">
        <div className="col-md-card card maincard">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Audio Duration</strong></p>
                   
        </div></div>
        <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Video Duration</strong></p>
            
            
        </div>
      </div>
      <div className=" col-md-4 maincard card">
        <div className="card-body">
            <p className="text-uppercase mb-2"><strong>Screen Share Duration</strong></p>
            
            
        </div>
      </div>
      
      </div>
       
        
 
</div>
  
    );
  }
  
  export default MyHeader;