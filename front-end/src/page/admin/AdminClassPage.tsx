// Import package members section:
import { Class } from "@material-ui/icons";
import { Table, Tag, Button, Modal, Input } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClassAPI } from "../../common/service/ClassAPI";

interface AdminClassPageProps {}

export function AdminClassPage(props: AdminClassPageProps): ReactElement {
  let classAPI: ClassAPI | undefined;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [listClass, setListClass] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [totalRowCount, setTotalRowCount] = useState(0);

  useEffect(() => {
    getListClass();
  }, [pageNumber]);

  function getListClass() {
    classAPI = new ClassAPI();

    classAPI.getListClass(pageNumber, pageSize, searchParam).then((res) => {
      setTotalRowCount(res.totalRecord);
      setListClass(res.pageDataHolder);
    });
  }

  const deleteClass = (id: number) => {
    classAPI = new ClassAPI();

    classAPI?.deleteClass(id).then((res) => {
      getListClass();
    });
  };

  const searchName = () => {
    getListClass();
  };

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
      title: "Teacher Name",
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
        return (
          <span>
            <Tag color="#87d068">{slot.slotName}</Tag>
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "classID",
      key: "classID",
      width: "30%",
      align: "center",
      render: (classID: number) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            Modal.confirm({
              title: "Are you sure you want to delete?",
              onOk: () => {
                deleteClass(classID);
              },
              okText: "Confirm",
            });
          }}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
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
              <div className="mb-3 col-lg-12">
                <Input
                  placeholder="Search"
                  style={{ width: "500px" }}
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  onPressEnter={searchName}
                />
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
                  pagination={{
                    position: ["bottomCenter"],
                    current: pageNumber,
                    total: totalRowCount,
                    pageSize: pageSize,
                    onChange: (page: number) => setPageNumber(page),
                    showSizeChanger: false,
                  }}
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
