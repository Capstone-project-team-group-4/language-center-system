/* eslint-disable max-len */
import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { TypeGuard } from "../../common/service/TypeGuard";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";
import './ManageStudentPage.css';

interface ManageStudentPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function ManageStudentPage (props: ManageStudentPageProps): ReactElement {
    let [user, setUser] = useState<User[]>([]);
    let userAPI: UserAPI = new UserAPI();
    let typeGuardian: TypeGuard;
    let studentDataPage: DataPage<User> | undefined;
    let [totalPageCount, setTotalPageCount] = useState<number>(0);
    let [studentHolder, setStudentHolder] = useState<User[]>([]);
    let [pageIndex] = useState<number>(0);
    let [pageSize] = useState<number>(10);
    // useEffect(() => {
    //     userAPI.listUsers().then(
    //         (res) => {
    //             setUser(res.data);
    //         }
    //     )
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(
        (): void => {
            loadStudentTable().catch(
                (error: unknown) => {
                    console.error(error);
                }
            );
        }
        , []
    );

    async function loadStudentTable (): Promise<void> {
        try {
            studentDataPage = await userAPI.listStudents(
                pageIndex
                , pageSize
            );
            setTotalPageCount(studentDataPage.totalRowCount);
            setStudentHolder(studentDataPage.pageDataHolder);
            return Promise.resolve<undefined>(undefined);
        }
        catch (apiError: unknown) {
            if (typeGuardian.isAxiosError(apiError)) {
                if (typeof apiError.code === "string") {
                    props.dialogController.setDialogTitle(
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle(apiError.name);
                }
                props.dialogController.setDialogBody(apiError.message);
                props.dialogController.setDialogType("error");
                props.dialogController.setShowDialog(true);
            }
            return Promise.reject(apiError);
        }
    }
    return (
        <div className="container" id="grid">
            <div className="text-center">
                <h1>Quản Lý Học Viên</h1>
                <hr />
            </div>
            <div className="row">
                {/* <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8"> */}
                    {/* <button type="button" className="btn btn-primary">
                        <span className=
                            "fa fa-plus mr-5">
                        </span>
                                Thêm học viên
                </button> */}
                    <div className="row mt-15" id="table-cover">
                        <div className=
                            "col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <table className=
                                "table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">
                                            Tên đăng nhập</th>
                                        <th className="text-center">
                                            Tên</th>
                                        <th className="text-center">
                                            Tên đệm</th>
                                        <th className="text-center">
                                            Họ</th>
                                        <th className="text-center">
                                            Email
                                                </th>
                                        <th className="text-center">
                                            Số điện thoại
                                                </th>
                                        <th className="text-center">
                                            Trạng Thái
                                                </th>
                                        <th className="text-center">
                                            Hành Động
                                                </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td></td>
                                        <td>
                                            <input type="text"
                                                className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text"
                                                className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text"
                                                className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text"
                                                className="form-control" />
                                        </td>
                                        <td>
                                            <input type="text"
                                                className="form-control" />
                                        </td>
                                        <td></td>
                                        <td>
                                            <select
                                                className="form-control">
                                                <option value="-1">
                                                    Tất Cả
                                                        </option>
                                                <option value="0">
                                                    Ẩn
                                                        </option>
                                                <option value="1">
                                                    Kích Hoạt
                                                        </option>
                                            </select>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr> */}
                                    {studentHolder.map((item, index) => <tr key={index}>
                                        <td>{item["userID"]}</td>
                                        <td>{item["userName"]}</td>
                                        <td>{item["firstName"]}</td>
                                        <td>{item["middleName"]}</td>
                                        <td>{item["lastName"]}</td>
                                        <td>{item["email"]}</td>
                                        <td>{item["phoneNumber"]}</td>
                                        <td className="text-center">
                                            <span
                                                className="label label-success">
                                                {item["accountStatus"]}
                                            </span>
                                        </td>
                                        <td className="text-center" id="action">
                                            <Link to="/admin-console/view-student-profile">
                                                <button type="button"
                                                    className="btn btn-primary">
                                                    <span className=
                                                        "fa fa-pencil mr-5">
                                                            Xem
                                                    </span>
                                                </button>
                                            </Link>
                                        &nbsp;
                                        <Link to="/editStudentInfo/studentID">
                                                <button type="button"
                                                    className="btn btn-warning">
                                                    <span className=
                                                        "fa fa-pencil mr-5">
                                                            Sửa
                                                    </span>
                                        </button>
                                            </Link>
                                        </td>
                                    </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
}