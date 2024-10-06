import { Chart } from "react-google-charts";




export default function PieChart({data}) {

  const chartData = [
    ["Task", "Hours per Day"], // Header row
    ...data.map(item => [item.name, item.value]) // Convert list to chart rows
  ];

// Create slices with custom colors
  const slices = data.reduce((acc, item, index) => {
    acc[index] = { color: item.color }; // Assign color to each slice based on the object
    return acc;
  }, {});

  const options = {
    legend: "none", // Disable the legend (if desired)
    title: "", // Disable the title
    pieSliceBorderColor: "none", // Remove border around slices
    backgroundColor: "transparent", // Set chart background
    slices, // Apply custom colors to slices
    tooltip: {
      text: "percentage", // Only show percentage in the tooltip
      textStyle: { color: "#222" }, // Tooltip text color
    },
    pieSliceText: "percentage", // Display percentage on the slices
    pieSliceTextStyle: {
      color: "#222", // Change percentage text color to black
    },
  };

  return <Chart
    chartType="PieChart"
    width="100%"
    height="500px"
    data={chartData}
    options={options}
  />
}
