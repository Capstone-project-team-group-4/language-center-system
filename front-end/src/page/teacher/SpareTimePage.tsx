// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TeacherSidebar } from "../../common/component/teacher_sidebar/TeacherSidebar";
import { TeacherSpareTimeAPI } from "../../common/service/TeacherSpareTimeAPI";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

interface TeacherSpareTimePageProps {
  modalDialog: ReactElement;
}

export function TeacherSpareTimePage(
  props: TeacherSpareTimePageProps
): ReactElement {
  let sprareTimeAPI: TeacherSpareTimeAPI | undefined;
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  let history = useHistory();

  useEffect(() => {
    getListTeacherSpareTime();
  }, []);

  function getListTeacherSpareTime() {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.getListTeacherSpareTime(pageNumber, pageSize).then((res) => {
      console.log("res", res);
    });
  }

  return (
    <Container id="AdminSpareTimePage">
      {props.modalDialog}
      <TeacherSidebar />
      <main>
        <Container>
          <div className="col-lg-12">
            <div className="card shadow-sm mt-5">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <i className="far fa-clone pr-1">Spare Time Management</i>
                </h3>
              </div>
              <div className="mb-3 col-lg-12">
                <Button
                  className="float-right"
                  variant="primary"
                  onClick={() => history.push("/teacher/create-spare-time")}
                >
                  + Add New
                </Button>
              </div>

              <div className="card-body pt-0">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <footer></footer>
    </Container>
  );
}
