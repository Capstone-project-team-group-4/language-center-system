/* eslint-disable max-len */
import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";
import './ManageStudentPage.css';

export function ManageStudentPage (): ReactElement {
    let [user, setUser] = useState<User[]>([]);
    let userAPI: UserAPI = new UserAPI();
    useEffect(() => {
        userAPI.listUsers().then(
            (res) => {
                setUser(res.data);
            }
        )
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Học Viên</h1>
                <hr />
            </div>
            <div className="row">
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    {/* <button type="button" className="btn btn-primary">
                        <span className=
                            "fa fa-plus mr-5">
                        </span>
                                Thêm học viên
                </button> */}
                    <div className="row mt-15">
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
                                            Họ</th>
                                        <th className="text-center">
                                            Email
                                                </th>
                                        <th className="text-center">
                                            Số điện thoại
                                                </th>
                                        <th className="text-center">
                                            Avatar
                                                </th>
                                        <th className="text-center">
                                            Trạng Thái
                                                </th>
                                        <th className="text-center">
                                            Lần cuối đăng nhập
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
                                    {user.map((item, index) => <tr key={index}>
                                        <td>{item["userID"]}</td>
                                        <td>{item["userName"]}</td>
                                        <td>{item["firstName"]}</td>
                                        <td>{item["lastName"]}</td>
                                        <td>{item["email"]}</td>
                                        <td>{item["phoneNumber"]}</td>
                                        <td>{item["photoURI"]}</td>
                                        <td className="text-center">
                                            <span
                                                className="label label-success">
                                                {item["accountStatus"]}
                                            </span>
                                        </td>
                                        <td>{item["lastLogin"]}</td>
                                        <td className="text-center" id="action">
                                            <Link to="/admin-console/view-student-profile">
                                                <button type="button"
                                                    className="btn btn-primary">

                                                    <span className=
                                                        "fa fa-pencil mr-5">
                                                    </span>Xem
                                                </button>
                                            </Link>
                                        &nbsp;
                                        <Link to="/editStudentInfo/studentID">
                                                <button type="button"
                                                    className="btn btn-warning">
                                                    <span className=
                                                        "fa fa-pencil mr-5">
                                                    </span>Sửa
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
        </div>
    );
}