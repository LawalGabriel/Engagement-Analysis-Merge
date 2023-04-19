import { useState } from "react";
import "./App.css";
import BarChart from "./chartComponent/BarChart";
import LineChart from "./chartComponent/LineChart";
import PieChart from "./chartComponent/PieChart";
import { UserData } from "./Data";

function MyChart() {
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
    
    <div class="container">
<div class="row mt-2">
    <div class="col-md-6 card">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Teams Call Analytics</strong></p>
          <hr />
           <BarChart chartData={userData} />
      </div>
    </div>
    <div class="col-md-6 card ">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Teams Meeting Analytics</strong></p>
          <hr />
           <LineChart chartData={userData} />
      </div>
    </div>
    </div>
    <div className ="row ">
    <div class="col-md-6 card ">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Outlook Analytics</strong></p>
          <hr />
           <PieChart chartData={userData} />
      </div>
    </div>
    <div class="col-md-6 card ">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>SharePoint Analytics</strong></p>
          <hr />
           <BarChart chartData={userData} />
      </div></div>
    </div>
   
      

</div>

  );
}

export default MyChart;