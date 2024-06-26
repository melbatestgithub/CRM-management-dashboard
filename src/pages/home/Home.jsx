import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";

export default function Home() {
  const [chartData, setChartData] = useState([]);
   const baseUrl="https://it-issue-tracking-api.onrender.com/api"
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

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={chartData}
        title="Issues Analytics"
        grid
        dataKey="value"
      />
      <div className="homeWidgets w-full">
        <div>
          <WidgetSm />
        </div>
        <div>
          <WidgetLg />
        </div>
      </div>
    </div>
  );
}
