import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    day: "월요일",
    degress: 36,
  },
  {
    day: "화요일",
    degress: 35
  },
  {
    day: "수요일",
    degress: 36,

  },
  {
    day: "목요일",
    degress: 35,

  },
  {
    day: "금요일",
    degress: 37,

  },
  {
    day: "토요일",
    degress: 38,

  },
  {
    day: "일요일",
    degress: 33,

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
      colors={["#3182CE"]}
      enableLabel={false}
    />
  );
};
export default Graph;