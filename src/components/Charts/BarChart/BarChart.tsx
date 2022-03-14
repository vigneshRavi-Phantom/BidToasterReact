import Chart from "components/Charts/Chart";

const BarChart = (props: any) => {
  const { data } = props;
  const { options, series } = data;
  return (
    <>
      <Chart options={options} series={series} type="bar"  />
    </>
  );
};

export default BarChart;
