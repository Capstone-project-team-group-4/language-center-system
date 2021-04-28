// Import package members section:
import React, { ReactElement, useEffect, useState, ReactNode } from "react";

import { TeacherSidebar } from "../../common/component/teacher_sidebar/TeacherSidebar";
import { TeacherSpareTimeAPI } from "../../common/service/TeacherSpareTimeAPI";
import { useHistory } from "react-router-dom";
import { SpareTime } from "../../model/SpareTime";
import { DialogControl } from "../../common/component/ModalDialog";
import { TypeGuard } from "../../common/service/TypeGuard";
import { CourseType } from "../../model/CourseType";
import { CourseTypeAPI } from "../../common/service/CourseTypeAPI";
import {
  Button,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Table,
  Tag,
} from "antd";

interface AdminSpareTimePageProps {
  modalDialog: ReactElement;
  dialogController: DialogControl;
  typeGuardian: TypeGuard;
}

export function AdminSpareTimePage(
  props: AdminSpareTimePageProps
): ReactElement {
  let sprareTimeAPI: TeacherSpareTimeAPI | undefined;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [listSpareTime, setListSpareTime] = useState([]);
  const [spareTimeID, setSpareTimeID] = useState<number>(0);
  let [courseTypeAPI] = useState<CourseTypeAPI>(new CourseTypeAPI());
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const { Option } = Select;
  const [listCourse, setListCourse] = useState<CourseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const history = useHistory();
  const [visibleModalApprove, setVisibleModalApprove] = useState(false);
  const [listCourseForClass, setListCourseForClass] = useState([]);
  const [listSlotForClass, setListSlotForClass] = useState([]);
  const [courseValueForClass, setCourseValueForClass] = useState("");
  const [slotValueForClass, setSlotValueForClass] = useState("");
  const [approveID, setApproveID] = useState(0);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const listSlot = [
    {
      name: "M1",
      value: 1,
    },
    {
      name: "M2",
      value: 2,
    },
    {
      name: "M3",
      value: 3,
    },
    {
      name: "M4",
      value: 4,
    },
    {
      name: "M5",
      value: 5,
    },
    {
      name: "E1",
      value: 6,
    },
    {
      name: "E2",
      value: 7,
    },
    {
      name: "E3",
      value: 8,
    },
    {
      name: "E4",
      value: 9,
    },
    {
      name: "E5",
      value: 10,
    },
  ];

  useEffect(() => {
    getListTeacherSpareTime();
  }, [pageNumber]);

  function getListTeacherSpareTime() {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI
      .getListTeacherSpareTime(pageNumber, pageSize, searchParam)
      .then((res) => {
        console.log('res', res);
        setTotalRowCount(res.totalRowCount);
        setListSpareTime(res.pageDataHolder);
      });
  }
  const searchName = () => {
    getListTeacherSpareTime();
  };

  useEffect(() => {
    getListCourse();
  }, []);

  function getListCourse() {
    courseTypeAPI.getAllCourseTypeInTheSystem().then((res) => {
      setListCourse(res);
    });
  }

  const handleChangeSelectCourse = (value: any) => {
    setSelectedCourse(value);
  };

  const handleChangeSelectSlot = (value: any) => {
    setSelectedSlot(value);
  };

  const rejectSpareTime = (record: any) => {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.rejectSpareTime(record.spareTimeID).then((res) => {
      notification.success({ message: "Reject thành công" });
      getListTeacherSpareTime();
    });
  };

  const getListCourseForClass = (id: number) => {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.getListCourseForClass(0, 100, id).then((res) => {
      setListCourseForClass(res.pageDataHolder);
    });
  };

  const getListSlotForClass = (id: number) => {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.getListSlotForClass(id).then((res) => {
      setListSlotForClass(res);
    });
  };

  const approveSpareTime = (record: any) => {
    getListCourseForClass(record.spareTimeID);
    getListSlotForClass(record.spareTimeID);
    setApproveID(record.spareTimeID);
    setVisibleModalApprove(true);
  };
  const approveClass = () => {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    let slot: any = listSlotForClass.find((x: any) => {
      if (x.slotName === slotValueForClass) return x.slotID;
    });

    let course: any = listCourseForClass.find((x: any) => {
      if (x.courseName === courseValueForClass) return x.courseID;
    });

    sprareTimeAPI
      .approveClass(slot?.slotID, course?.courseID, approveID)
      .then((res) => {
        setVisibleModalApprove(false);
        notification.success({ message: "Approved" });
        getListTeacherSpareTime();
        setCourseValueForClass("");
        setSlotValueForClass("");
      })
      .catch((error) => {
        notification.error({message: error.response.data.message});
        console.log(error, "error");
      });
  };

  const saveForm = () => {
    sprareTimeAPI = new TeacherSpareTimeAPI();
    let courseIds = [];
    let slotIds = [];

    courseIds = selectedCourse.map((e1) => {
      const index = listCourse.findIndex((x) => x.typeName === e1);
      return listCourse[index].typeID;
    });

    slotIds = selectedSlot.map((e1) => {
      const index = listSlot.findIndex((x) => x.name === e1);
      return listSlot[index].value;
    });

    if (isEdit) {
      sprareTimeAPI.editSpareTime(idEdit, courseIds, slotIds).then((res) => {
        history.push("/teacher/spare-time-management");
        notification.success({
          message: "Sửa thành công",
        });
        getListTeacherSpareTime();
        setVisibleModalCreate(false);
        setSelectedCourse([]);
        setSelectedSlot([]);
      });
    } else {
      sprareTimeAPI
        .createSpareTime(courseIds, slotIds)
        .then((res) => {
          history.push("/teacher/spare-time-management");
          notification.success({
            message: "Tạo thành công",
          });
          getListTeacherSpareTime();
          setVisibleModalCreate(false);
          setSelectedCourse([]);
          setSelectedSlot([]);
        })
        .catch((error) => {
          setVisibleModalCreate(false);
          setSelectedCourse([]);
          setSelectedSlot([]);
          notification.error({ message: error.massage });
        });
    }
  };

  const deteleSpareTime = (id: number) => {
    sprareTimeAPI = new TeacherSpareTimeAPI();

    sprareTimeAPI.deleteSpareTime(id).then((res) => {
      notification.success({
        message: "Xóa thành công",
      });
      getListTeacherSpareTime();
      history.push("/teacher/spare-time-management");
    });
  };

  const editSpareTime = (record: any) => {
    // @ts-ignore
    let nameCourseType = [];
    // @ts-ignore
    let nameSlot = [];
    record.courseTypeList.map((el: any) => {
      return nameCourseType.push(el.typeName);
    });

    record.slotList.map((el: any) => {
      return nameSlot.push(el.slotName);
    });
    // @ts-ignore
    setSelectedCourse(nameCourseType);
    // @ts-ignore
    setSelectedSlot(nameSlot);
    setVisibleModalCreate(true);
    setIsEdit(true);
    setIdEdit(record.spareTimeID);
  };

  const columns: any = [
    {
      title: "#",
      dataIndex: "spareTimeID",
      key: "spareTimeID",
      width: "10%",
      render: (value: any, item: any, index: number) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Teacher Name",
      dataIndex: "userID",
      key: "userID",
      width: "10%",
      align: "center",
      render: (userID: any) => {
        return <span>{userID.userName}</span>;
      },
    },
    {
      title: "Course",
      dataIndex: "courseTypeList",
      key: "typeName",
      width: "30%",
      align: "center",
      render: (courseTypeList: any) => {
        return (
          <span>
            {courseTypeList.map((item: any, i: any) => {
              return (
                <span key={i}>
                  <Tag color="#2db7f5">{item.typeName}</Tag>
                </span>
              );
            })}
          </span>
        );
      },
    },
    {
      title: "Slot",
      dataIndex: "slotList",
      key: "slotList",
      width: "30%",
      align: "center",
      render: (slotList: any) => {
        return (
          <span>
            {slotList.map((item: any, i: any) => {
              return (
                <span key={i}>
                  <Tag color="#87d068">{item.slotName}</Tag>
                </span>
              );
            })}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "center",
      render: (status: any, record: any) => {
        return (
          <div>
            {status === 2 && <div style={{ color: "green" }}>APPROVED</div>}
            {status === 3 && <div style={{ color: "red" }}>REJECTED</div>}
            {status === 1 && (
              <div style={{ display: "flex" }}>
                <div>
                  <Button
                    type="primary"
                    className="mr-2"
                    onClick={() => {
                      approveSpareTime(record);
                    }}
                  >
                    Approve
                  </Button>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    Modal.confirm({
                      title: "Are you sure you want to reject?",
                      onOk: () => {
                        rejectSpareTime(record);
                      },
                      okText: "Confirm",
                    });
                  }}
                >
                  <Button danger>Reject</Button>
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  const listOptionCourse = listCourse?.map((item) => {
    return item.typeName;
  });

  const listOptionSlot = listSlot?.map((item) => {
    return item.name;
  });

  return (
    <div className="col-lg-12 bg-transparent border-0">
      <TeacherSidebar />
      <main>
        {/* <Container> */}
        <div className="col-lg-12">
          <div className="card shadow-sm mt-5">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <i className="far fa-clone pr-1">Spare Time Management</i>
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
                dataSource={listSpareTime}
                // loading={loading}
                // @ts-ignore
                rowKey={spareTimeID}
                columns={columns}
                // pagination={false}
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
        {/* </Container> */}
      </main>
      <footer></footer>

      <Modal
        visible={visibleModalCreate}
        onCancel={() => setVisibleModalCreate(false)}
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
            <h3>Create Teacher Spare Time</h3>
          </Col>
        </Row>
        <div>
          <Row gutter={[16, 16]}>
            <Col span={4}>Course Type</Col>
            <Col span={20}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select"
                value={selectedCourse}
                onChange={handleChangeSelectCourse}
                optionLabelProp="label"
              >
                {listOptionCourse.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>

            <Col span={4}>Slot</Col>
            <Col span={20}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select"
                value={selectedSlot}
                onChange={handleChangeSelectSlot}
                optionLabelProp="label"
              >
                {listOptionSlot.map((item, index) => {
                  return (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row justify="center" gutter={[12, 0]}>
            <Col className="mt-4">
              <Button
                className="px-12"
                onClick={() => setVisibleModalCreate(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col className="mt-4">
              <Button
                type="primary"
                className="px-12"
                disabled={
                  selectedSlot.length === 0 || selectedCourse.length === 0
                }
                onClick={() => saveForm()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>

      <Modal
        visible={visibleModalApprove}
        onCancel={() => setVisibleModalApprove(false)}
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
            <h3>Approve Spare Time</h3>
          </Col>
        </Row>
        <div>
          <Row gutter={[16, 16]}>
            <Col span={4}>Course</Col>
            <Col span={20}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select"
                value={courseValueForClass}
                onChange={(value) => setCourseValueForClass(value)}
                optionLabelProp="label"
              >
                {listCourseForClass &&
                  listCourseForClass.map((item: any) => {
                    return (
                      <Option value={item.courseName} key={item.courseID}>
                        {item.courseName}
                      </Option>
                    );
                  })}
              </Select>
            </Col>

            <Col span={4}>Slot</Col>
            <Col span={20}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select"
                value={slotValueForClass}
                onChange={(value) => {
                  setSlotValueForClass(value);
                }}
                optionLabelProp="label"
              >
                {listSlotForClass &&
                  listSlotForClass.map((item: any) => {
                    return (
                      <Option value={item.slotName} key={item.slotID}>
                        {item.slotName}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row justify="center" gutter={[12, 0]}>
            <Col className="mt-4">
              <Button
                className="px-12"
                onClick={() => { 
                  setVisibleModalApprove(false)
                  setCourseValueForClass("");
                  setSlotValueForClass("");
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col className="mt-4">
              <Button
                type="primary"
                className="px-12"
                disabled={!courseValueForClass || !slotValueForClass}
                onClick={() => approveClass()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
