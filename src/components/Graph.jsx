import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const Graph = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((_, i) => i),
          datasets: [
            {
              label: "Suma",
              data,
              fill: false,
              borderColor: "#2c3e50",
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default Graph;
