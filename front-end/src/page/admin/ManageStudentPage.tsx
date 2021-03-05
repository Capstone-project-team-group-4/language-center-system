/* eslint-disable max-len */
import React, { ReactElement, useState, useEffect } from "react";
import { UserAPI } from "../../common/service/UserAPI";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './ManageStudentPage.css';
import { User } from "../../model/User";
import { Link } from 'react-router-dom';

export function ManageStudentPage (): ReactElement {
    let [user, setUser] = useState<User[]>([]);
    let userAPI: UserAPI = new UserAPI();
    useEffect(() => {
        userAPI.listUsers().then(
            (res) => {
                console.log(res);
                setUser(res.data as User[]);
            }
        );
    }, []);
    return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Học Viên</h1>
                <hr />
            </div>
            <div className="row" id="grid">
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8" id="table">
                    {/* <button type="button" className="btn btn-primary">
                        <span className=
                            "fa fa-plus mr-5">
                        </span>
                        Thêm học viên   
                </button> */}
                    <div className="row mt-15">
                        <div className=
                            "col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    placeholder="Nhập từ khóa..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary"
                                        type="button">
                                        <span
                                            className="fa fa-search mr-5">
                                        </span>
                                        Tìm        
                            </button>
                                </span>
                            </div>
                        </div>
                        <div className=
                            "col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="dropdown">
                                <button className=
                                    "btn btn-primary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenu1"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="true">
                                    Sắp Xếp
                                <span className=
                                        "fa fa-caret-square-o-down ml-5">
                                    </span>
                                </button>
                                <ul className="dropdown-menu"
                                    aria-labelledby="dropdownMenu1">
                                    <li>
                                        <a role="button">
                                            <span className=
                                                "fa fa-sort-alpha-asc pr-5">
                                                Tên A-Z
                                                </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a role="button">
                                            <span className=
                                                "fa fa-sort-alpha-desc pr-5"
                                            >
                                                Tên Z-A
                                                </span>
                                        </a>
                                    </li>
                                    <li role="separator"
                                        className="divider"></li>
                                    <li><a role="button">
                                        Trạng Thái Kích Hoạt
                                    </a></li>
                                    <li><a role="button">
                                        Trạng Thái Ẩn
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                                            Nghề nghiệp
                                                </th>
                                        <th className="text-center">
                                            Avatar
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
                                    <tr>
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
                                    </tr>
                                    {user.map((item, index) => <tr key={index}>
                                        <td>{item["userID"]}</td>
                                        <td>{item["userName"]}</td>
                                        <td>{item["firstName"]}</td>
                                        <td>{item["lastName"]}</td>
                                        <td>{item["email"]}</td>
                                        <td>{item["phoneNumber"]}</td>
                                        <td>{item["job"]}</td>
                                        <td>{item["photoURI"]}</td>
                                        <td className="text-center">
                                            <span
                                                className="label label-success">
                                                {item["accountStatus"]}
                                                </span>
                                        </td>
                                        <td className="text-center d-flex">
                                        <button type="button"
                                            className="btn btn-info act-btn">
                                                <Link to = "/user-view" 
                                                className="button_view">
                                                <span className=
                                                    "fa fa-eye mr-5">
                                                </span>
                                                Xem
                                                </Link>
                                        </button>
                                        &nbsp;
                                        <button type="button"
                                            className="btn btn-warning act-btn">
                                                <Link to 
                                                = {`/editStudentInfo/${item["userID"]}`}
                                                className="button_edit">
                                                    <span className=
                                                    "fa fa-pencil mr-5">
                                                </span>
                                                Sửa
                                                </Link>
                                                
                                        </button>
                                        &nbsp;
                                        <button type="button"
                                                className="btn btn-danger 
                                                act-btn">
                                                <span className=
                                                    "fa fa-trash mr-5">
                                                </span>
                                                Xóa
                                        </button>
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