// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TeacherSidebar } from "../../common/component/teacher_sidebar/TeacherSidebar";
import { TeacherSpareTimeAPI } from "../../common/service/TeacherSpareTimeAPI";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { SpareTime } from "../../model/SpareTime";
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';

interface TeacherSpareTimePageProps {
  modalDialog: ReactElement;
}

export function TeacherSpareTimePage(
  props: TeacherSpareTimePageProps
): ReactElement {
  let sprareTimeAPI: TeacherSpareTimeAPI | undefined;
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [listSpareTime, setListSpareTime] = useState<SpareTime[]>([]);

  let history = useHistory();

  useEffect(() => {
    getListTeacherSpareTime();
  }, []);

  function getListTeacherSpareTime() {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.getListTeacherSpareTime(pageNumber, pageSize).then((res) => {
      setListSpareTime(res.pageDataHolder);
    });
  }

  console.log("11111", listSpareTime);
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
                      <th>Teacher Name</th>
                      <th>Course</th>
                      <th>Slot</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSpareTime.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.spareTimeID}</td>
                          <td>{item.userID.userName}</td>
                          <td>
                            {item.courseTypeList.map((courseType, i) => {
                              return (
                                <Button variant="outline-info" key={i}>
                                  {courseType.typeName}
                                </Button>
                              );
                            })}
                          </td>

                          <td>
                            {item.slotList.map((slot, i) => {
                              return (
                                <Button variant="outline-danger" key={i}>
                                  {slot.slotName}
                                </Button>
                              );
                            })}
                          </td>
                          <td>
                            {item.status === 2 && "APPROVED"}
                            {item.status === 3 && "REJECTED"}
                            {item.status === 1 && (
                              <div>
                                <Button variant="success mr-2">Approve</Button>
                                <Button variant="warning">Reject</Button>
                              </div>
                            )}
                          </td>
                          <td>
                            <Button variant="primary mr-2">
                              <BsPencil />
                            </Button>
                            <Button variant="danger"><BsFillTrashFill /></Button>
                          </td>
                        </tr>
                      );
                    })}
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
