import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const refreshToken = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
      }
    };
    fetch('https://freddy.codesubmit.io/refresh', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.msg) {
          console.log(data.msg);
        } else {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
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
    <div className="dashboard-container">
      <ProSidebar>
        <Menu>
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Orders</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </ProSidebar>
      <div className="dashboard">
        <div className="analytics"></div>
        <div className="revenue"></div>
        <div className="bestsellers">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th># Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.bestsellers.map(item => {
                return(
                  <tr key={item.product.id}>
                    <td>{item.product.name}</td>
                    <td></td>
                    <td>{item.units}</td>
                    <td>{item.revenue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;