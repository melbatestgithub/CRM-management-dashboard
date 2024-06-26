import React, { useEffect, useState } from 'react';
import Chart from "../../components/chart/Chart";
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer
} from 'recharts';
import './report.css'; // Ensure you have some styles defined here

const Report = () => {

  const [chartData, setChartData] = useState([]);
  const baseUrl="http://localhost:5600/api"
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(`${baseUrl}/issue/issues-by-month`);
       const formattedData = response.data.map(item => ({
         name: `${item.months.monthName}/${item.year}`,
         value: item.months.total,
       }));
       setChartData(formattedData);
     } catch (error) {
       console.error("Error fetching chart data:", error);
     }
   };

   fetchData();
 }, []);






  const [reportData, setReportData] = useState({
    inProgressCount: 0,
    solvedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
    inProgressIssues: [],
    solvedIssues: [],
    rejectedIssues: [],
    acceptedIssues: [],
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await axios.get('https://it-issue-tracking-api.onrender.com/api/report');
        setReportData(res.data);
      } catch (err) {
        console.error('Error fetching report data:', err);
      }
    };

    fetchReportData();
  }, []);

  const pieData = [
    { name: 'In Progress', value: reportData.inProgressCount },
    { name: 'Solved', value: reportData.solvedCount },
    { name: 'Rejected', value: reportData.rejectedCount },
    { name: 'Pending', value: reportData.pendingCount },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ff6666', '#66b3ff'];

  const barData = [
    { name: 'Issues', InProgress: reportData.inProgressCount, Solved: reportData.solvedCount, Rejected: reportData.rejectedCount, Pending: reportData.pendingCount }
  ];

  return (
    <div className="report">
      <h1 className='bg-gray-900 text-white p-2 font-bold '>Admin Dashboard - Report</h1>

      <div className="chart-container">
        <h2 className='bg-gray-900 text-white p-3 rounded-md font-semibold' style={{width:"220px"}}>Issue Status Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2 className='bg-gray-900 text-white p-3 rounded-md font-semibold my-3' style={{width:"220px"}}>Issues Status Bar Chart</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="InProgress" stackId="a" fill="#8884d8" />
            <Bar dataKey="Solved" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Rejected" stackId="a" fill="#ff6666" />
            <Bar dataKey="Pending" stackId="a" fill="#66b3ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

     

       <Chart
        data={chartData}
        title="Issues Analytics"
        grid
        dataKey="value"
      />




        <div className="chart-container">
        <h2 className='bg-gray-800  p-2 text-white font-bold text-xl'>Issue Details statistic</h2>
        <div className="issues-list">
          <h3 className='text-lg text-gray-400'>In Progress Issues</h3>

          {reportData.inProgressIssues.lenght>0? <ul>  
            {reportData.inProgressIssues.map(issue => (
              <li key={issue._id}>
                <strong>{issue.title}</strong> - {issue.description}
              </li>
            ))}
          </ul>:<div className='p-2'>
               <p className='text-red-800 p-2'>No Issue is found ,which are In progress</p>
            </div>}
         

          <h3  className='text-lg text-gray-400'> Solved Issues</h3>
          <ul>
            {reportData.solvedIssues.map(issue => (
              <li key={issue._id}>
                <strong className='text-dark'>{issue.title}</strong > : <p className='text-gray-600'>{issue.description}</p>
              </li>
            ))}
          </ul>

          <h3  className='text-lg text-gray-400'>Rejected Issues</h3>
          <ul>
            {reportData.rejectedIssues.map(issue => (
              <li key={issue._id}>
                <strong>{issue.title}</strong> :<p className='text-gray-600'>{issue.description}</p> 
              </li>
            ))}
          </ul>

        </div>

      </div> 
      
    </div>
  );
};

export default Report;


