// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    day: "월요일",
    degress: 59
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
      keys={["degress"]}
      indexBy="day"
      margin={{ top: 50, right: 110, bottom: 100, left: 110 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#3182CE"
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