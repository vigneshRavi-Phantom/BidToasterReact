import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import CardsHeader from "containers/Admin/CardsHeader";
import Layout from "containers/Layout/Layout";
import { useAuth } from "contexts/AuthContextProvider";
import userService from "services/userService";
import Loading from "components/Loading";
import BarChart from "components/Charts/BarChart/BarChart";
import LineChart from "components/Charts/LineChart/LineChart";


function Dashboard() {
  const { accountProfile } = useAuth();
  const { GetDashboardOverview, GetDashboardChartOverview } = userService();
  const [overviewData, setOverviewDataData] = React.useState({
    orgCount: 0,
    buyerCount: 0,
    vendorCount: 0,
    rfqCount: 0,
  });
  const [userChartData, setUserChartData] = React.useState<any>({
    labels: [],
    series: [],
  });
  const [rfqChartData, setRfqChartData] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "rfq",
        data: [],
      },
    ],
  });

  useEffect(() => {
    getDashboardOverview();
    getDashboardChartOverview();
    // eslint-disable-next-line
  }, [accountProfile]);

  const getDashboardOverview = async () => {
    if (accountProfile && accountProfile.id) {
      var data = await GetDashboardOverview({ id: accountProfile.id });
      if (data && data.length > 0) {
        setOverviewDataData(data[0]);
      }
    }
  };
  const getDashboardChartOverview = async () => {
    if (accountProfile && accountProfile.id) {
      var data = await GetDashboardChartOverview({ id: accountProfile.id });
      if (data && data.length > 0) {
        if (data[0].users) {
          setUserChartData({
            labels: data[0].users.labels,
            series: data[0].users.datasets[0].data,
          });
        }
        if (data[0].rfq) {
          setRfqChartData({
            options: {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: data[0].rfq.labels,
              },
            },
            series: [
              {
                name: "RFQ",
                data: data[0].rfq.datasets[0].data,
              },
            ],
          });
        }
      }
    }
  };

  if (!(accountProfile && accountProfile.id)) return <Loading />;

  return (
    <Layout>
      <CardsHeader overviewData={overviewData} />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="8">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 mb-0">Users</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {userChartData.series.length > 0 && <LineChart
                  categories={userChartData.labels}
                  series={userChartData.series}
                />}
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">RFQ</h6>
                    <h5 className="h3 mb-0">Total RFQ</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <BarChart data={rfqChartData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Dashboard;
