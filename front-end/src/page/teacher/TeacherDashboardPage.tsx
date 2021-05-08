// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Col, Container, Row, Accordion, Card, Button } from "react-bootstrap";
import { TeacherSidebar } from "../../common/component/teacher_sidebar/TeacherSidebar";
import { Link } from "react-router-dom";
import { Line } from "@ant-design/charts";
import { ChartAPI } from "../../common/service/Chart";

interface TeacherDashboardPageProps {
  modalDialog: ReactElement;
}

export function TeacherDashboardPage(
  props: TeacherDashboardPageProps
): ReactElement {
  let chartAPI: ChartAPI | undefined;
  const [data, setDataChart] = useState([]);

  const config = {
    data,
    height: 400,
    xField: "valueX",
    yField: "valueY",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  useEffect(() => {
    getDataChart();
  }, []);

  function getDataChart() {
    chartAPI = new ChartAPI();

    chartAPI.getDataChart().then((res) => {
      const newValue = res.map((e: any, index: number) => {
        return {
          valueX: "Exam " + e.valueX.toString(),
          valueY: e.valueY,
        };
      });
      setDataChart(newValue);
    });
  }
  return (
    <div style={{paddingLeft: '15px', paddingRight: '15px'}}>
      {props.modalDialog}
      <TeacherSidebar />
      <main style={{ background: "#fff" }}>
        <Container>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Spare Time Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        // as={Link}
                        // to={"/teacher" + "/spare-time-management"}
                      >
                        Spare Time
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Class Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        // as={Link}
                        // to={"/teacher" + "/class-page"}
                      >
                        Class
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <div style={{ marginTop: "30px", paddingBottom: "30px" }}>
            <Line {...config} />
          </div>
        </Container>
      </main>
      <footer className="bg-dark text-center text-white">
        <div className="container p-4">
          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example2"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
          <section className="mb-4">
            <p>FPT University</p>
          </section>
        </div>
      </footer>
    </div>
  );
}
