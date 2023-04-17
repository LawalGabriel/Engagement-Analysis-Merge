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
<div class="row">
  
<div class="card shadow-2-strong card-header">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Extensive Amount</strong></p>
          <hr />
        
      </div></div>
    <div class="card shadow-2-strong">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Extensive Amount</strong></p>
          <hr />
           <BarChart chartData={userData} />
      </div>
    </div>
    <div class="card shadow-2-strong">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Total Approved</strong></p>
          <hr />
           <LineChart chartData={userData} />
      </div>
    </div>
    <div class="card shadow-2-strong">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Pie Chart</strong></p>
          <hr />
           <PieChart chartData={userData} />
      </div>
    </div>
    <div class="card shadow-2-strong">
      <div class="card-body">
          <p class="text-uppercase mb-2"><strong>Extensive Amount</strong></p>
          <hr />
           <BarChart chartData={userData} />
      </div></div>
      
</div>
</div>

  );
}

export default MyChart;