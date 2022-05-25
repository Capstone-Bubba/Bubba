import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    day: "월요일",
    degress: 59,
    test: 33
  },
  {
    day: "화요일",
    degress: 61
  },
  {
    day: "수요일",
    degress: 55
  },
  {
    day: "목요일",
    degress: 78
  },
  {
    day: "금요일",
    degress: 71
  },
  {
    day: "토요일",
    degress: 56
  },
  {
    day: "일요일",
    degress: 67
  }
];
const Graph = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["degress", "test", "pic"]}
      indexBy="day"
      margin={{ top: 50, right: 110, bottom: 100, left: 110 }}
      padding={0.6}
      valueScale={{ type: "linear" }}
      colors={["#3182CE","#00FFFF"]}
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "degrees",
        legendPosition: "middle",
        legendOffset: -40
      }}
    />
  );
};
export default Graph;