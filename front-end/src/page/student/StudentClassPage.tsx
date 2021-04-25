// Import package members section:
import { Class } from "@material-ui/icons";
import { Table } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClassAPI } from "../../common/service/ClassAPI";

interface StudentClassPageProps {}

export function StudentClassPage(props: StudentClassPageProps): ReactElement {
  let classAPI: ClassAPI | undefined;
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [listClass, setListClass] = useState([]);

  useEffect(() => {
    getListClass();
  },[])

  function getListClass() {
    classAPI = new ClassAPI();

    classAPI.getListClass(pageNumber, pageSize, 2, 'ROLE_STUDENT' ).then((res) => {
      setListClass(res.pageDataHolder);
    });
  }

  const columns: any = [
    {
        title: "#",
        dataIndex: "classID",
        key: "classID",
        render: (value: any, item: any, index: number) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: "Course Name",
        dataIndex: "courseID",
        key: "courseID",
        width: "30%",
        align: "center",
        render: (courseID: any) => {
          return <span>{courseID.courseName}</span>;
        },
      },
      {
        title: "User Name",
        dataIndex: "teacherID",
        key: "teacherID",
        width: "30%",
        align: "center",
        render: (teacherID: any) => {
          return <span>{teacherID.userName}</span>;
        },
      },
      {
        title: "Slot",
        dataIndex: "slot",
        key: "slot",
        width: "30%",
        align: "center",
        render: (slot: any) => {
          return <span>{slot.slotName}</span>;
        },
      },
  ];
  return (
    <Container fluid={true}>
      <main>
        <Container>
          <div className="col-lg-12">
            <div className="card shadow-sm mt-5">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <i className="far fa-clone pr-1">Admin Class Management</i>
                </h3>
              </div>

              <div className="card-body pt-0">
                <Table
                  className="table-custom"
                  bordered={true}
                  // @ts-ignore
                  dataSource={listClass}
                  // loading={loading}
                  // @ts-ignore
                //   rowKey={classID}
                  columns={columns}
                  pagination={false}
                  // pagination={{
                  //   position: ["bottomCenter"],
                  //   current: page,
                  //   total: data?.categories?.meta?.totalRecord,
                  //   pageSize: data?.categories?.meta?.limit,
                  //   onChange: (page: number) => onChangePage(page),
                  //   showSizeChanger: false,
                  // }}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <footer></footer>
    </Container>
  );
}
