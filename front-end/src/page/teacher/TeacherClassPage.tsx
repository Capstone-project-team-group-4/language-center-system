// Import package members section:
import { Class } from "@material-ui/icons";
import { Table, Tag, Button, notification, Modal, Row, Col, Input } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClassAPI } from "../../common/service/ClassAPI";

interface TeacherClassPageProps {}

export function TeacherClassPage(props: TeacherClassPageProps): ReactElement {
  let classAPI: ClassAPI | undefined;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [listClass, setListClass] = useState([]);
  const [listStudent, setListStudent] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [classIDComment, setClassIDComment] = useState(0);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const user = sessionStorage.getItem("loggedInUser");
  let idUser = user ? JSON.parse(user).id : 0;

  useEffect(() => {
    getListClass();
  }, [pageNumber]);

  function getListClass() {
    classAPI = new ClassAPI();

    classAPI
      .getListClass(pageNumber, pageSize, searchParam, idUser, "ROLE_TEACHER")
      .then((res) => {
        setTotalRowCount(res.totalRowCount);
        setListClass(res.pageDataHolder);
      });
  }

  const cancelClass = (id: number) => {
    classAPI = new ClassAPI();

    classAPI.cancelClass(id).then((res) => {
      notification.success({ message: "Cancel Success" });
      getListClass();
    });
  };

  const getAllStudent = (id: number) => {
    setClassIDComment(id);
    classAPI = new ClassAPI();

    classAPI.getAllOFClass(0, 100, id).then((res) => {
      setListStudent(res.pageDataHolder);
      setVisible(true);
    });
  };

  const searchName = () => {
    getListClass();
  };

  const commentForTeacher = (item: any) => {
    classAPI = new ClassAPI();
    classAPI
      .createComment(classIDComment, item.userID, item.commentOfClass)
      .then((res) => {
        notification.success({ message: "Success" });
        setVisible(false);
      });
  };

  const handleChangeComment = (value: string, id: number) => {
    const newList = listStudent.map((el: any) => {
      if (el.userID === id) {
        el.commentOfClass = value;
      }
      return el;
    });

    setListStudent(newList);
  };

  const columnsStudent: any = [
    {
      title: "#",
      dataIndex: "userID",
      key: "userID",
      width: "10%",
      render: (value: any, item: any, index: number) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Student Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      render: (value: any, item: any, index: number) => {
        return (
          <span>{`${item.firstName} ${item.middleName} ${item.lastName}`}</span>
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "userID",
      key: "userID",
      align: "center",
      render: (value: any, item: any, record: any) => {
        return (
          <span style={{ display: "flex" }}>
            <Input
              value={item.commentOfClass}
              onChange={(e) => handleChangeComment(e.target.value, item.userID)}
            />

            <Button type="primary" onClick={() => commentForTeacher(item)}>
              Save
            </Button>
          </span>
        );
      },
    },
  ];

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      align: "center",
      render: (status: any) => {
        return (
          <span>
            {status === 1 && <div style={{ color: "green" }}>Active</div>}
            {status === 0 && <div style={{ color: "red" }}>In-Active</div>}
          </span>
        );
      },
    },
    {
      title: "All Student",
      dataIndex: "classID",
      key: "classID",
      width: "30%",
      align: "center",
      render: (classID: number, record: any) => {
        return (
          <span>
            {record.status === 1 && (
              <Button
                type="primary"
                onClick={() => {
                  getAllStudent(classID);
                }}
              >
                Show All Student
              </Button>
            )}
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
      render: (classID: number, record: any) => (
        <div>
          {record.status === 1 && (
            <div
              className="cursor-pointer"
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to cancel?",
                  onOk: () => {
                    cancelClass(classID);
                  },
                  okText: "Confirm",
                });
              }}
            >
              <Button type="primary" danger>
                Cancel
              </Button>
            </div>
          )}
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
                  <i className="far fa-clone pr-1">Teacher Class Management</i>
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

          <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            closable={false}
            maskClosable={false}
            title={null}
            footer={null}
            width={800}
            bodyStyle={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}
          >
            <Row
              justify="space-between"
              className="border-black-8 border-b pb-2 mb-4"
            >
              <Col>
                <h3>List Student</h3>
              </Col>
            </Row>
            <div>
              <Table
                className="table-custom"
                bordered={true}
                // @ts-ignore
                dataSource={listStudent}
                // @ts-ignore
                //   rowKey={classID}
                columns={columnsStudent}
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
            <Row justify="center" gutter={[12, 0]}>
              <Col className="mt-4">
                <Button className="px-12" onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal>
        </Container>
      </main>
      <footer></footer>
    </Container>
  );
}
