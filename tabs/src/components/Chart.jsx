import { useState } from "react";
import "./App.css";
import BarChart from "./chartComponent/BarChart";
import LineChart from "./chartComponent/LineChart";
import PieChart from "./chartComponent/PieChart";
import DoughnutChart from "./chartComponent/Doghnut";
import { UserData } from "./Data";

function MyChart(props) {
  // Implementation: step 4 (nothing)
  const { apiData, sharepointData, teamsData, outlookData, meetingData} = props;
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

  // chart data
  // Implementation: step 6
  const sharepointChartData = restructureDataForChart(sharepointData, "Sharepoint");
  const outlookChartData = restructureDataForChart(outlookData, "Outlook");
  const teamsChartData = restructureDataForChart(teamsData, "Team");
  const meetingChartData = restructureDataForChart(meetingData, "Meeting");
  // Implementation: step 5 (nothing)
  function restructureDataForChart(userData, chartLabel) {
    return {
      labels: userData.map((data) => data.label),
      datasets: [
        {
          label: chartLabel,
          data: userData.map((data) => data.count),
          backgroundColor: [
            "	rgba(0,112,192,1.000)",
            "rgb(54, 162, 235)",
            "rgb(255, 159, 64)",
            "rgb(172, 215, 250)",
            "#FF0000",
          ],
          borderColor: "black",
          borderWidth: 2,
        }
      ]
    }
  }

  return (

    <div class="container">
      <div class="row mt-2">
        <div class="col-md-6 card" >
          <div class="card-body">
            <p class="text-uppercase mb-2"><strong>Meeting Details</strong></p>
            <hr />
            <BarChart chartData={meetingChartData} />
          </div>
        </div>
        <div class="col-md-6 card ">
          <div class="card-body">
            <p class="text-uppercase mb-2"><strong>Chat & Call Details</strong></p>
            <hr />
            <LineChart chartData={teamsChartData} />
          </div>
        </div>
      </div>
      <div className="row ">
        <div class="col-md-6 card ">
          <div class="card-body">
            <p class="text-uppercase mb-2"><strong>Outlook Details</strong></p>
            <hr />
            <PieChart chartData={outlookChartData} />
          </div>
        </div>
        <div class="col-md-6 card">
          <div class="card-body">
            <p class="text-uppercase mb-2"><strong>SharePoint Details</strong></p>
            <hr />
            {/* Implmentation: step 7 */}
            <DoughnutChart chartData={sharepointChartData} />
          </div></div>
      </div>



    </div>

  );
}

export default MyChart;