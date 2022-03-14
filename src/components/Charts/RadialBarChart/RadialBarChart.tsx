import Chart from "components/Charts/Chart";

import {
  Container,
  Card,
  Label,
  CardTitle,
  CardText
} from "reactstrap";

const RadialBarChart = ({ widgetTitle, series, colors, label, helperText }: any) => {
  const options = {
    options: {
      colors: colors,
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "20%",
            background: "transparent"
          },

          track: {
            show: true,
            background: "#F2F3FC",
            strokeWidth: "100%",
            opacity: 1,
            margin: 15,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5
            }
          },

          dataLabels: {
            show: false
          }
        }
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 0.8
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: label
    },
    series: series
  };

  return (
    <Container>
      <Card style={{ display: "block" }}>
        <CardTitle >{widgetTitle}</CardTitle>
        <Chart
          options={options.options}
          series={options.series}
          type="radialBar"
          width="100%"
        />
        <div>
          {label &&
            label.map((item: any, index: number) => (
              <Label key={index}>
                <span style={{ backgroundColor: colors[index] }} />
                <div className="p-3">
                  <h5>{helperText[index]}</h5>
                  <CardText>${label[index]}</CardText>
                </div>
              </Label>
            ))}
        </div>
      </Card>
    </Container>
  );
};

export default RadialBarChart;
