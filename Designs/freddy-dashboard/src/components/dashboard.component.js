import React, { useEffect, useState } from "react";
import Sidebar from "react-sidebar";

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const refreshToken = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer refresh_token',
        'Content-Type': 'application/json' }
    };
    fetch('https://freddy.codesubmit.io/refresh', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          localStorage.setItem('access_token', data.access_token);
        }
      });
  };

  const getDashboardData = () => {
    const accessToken = localStorage.getItem('access_token');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' }
    };

    return fetch('https://freddy.codesubmit.io/dashboard', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.msg) {
          refreshToken();
        } else {
          setDashboardData(data.dashboard);
        }
      });
  };

  useEffect(() => {
    getDashboardData();
    
  }, []);
  console.log(dashboardData);
  return(
    // console.log(dashboardData)
    <div>
      {/* {dashboardData} */}
    </div>
  )
}

export default Dashboard;