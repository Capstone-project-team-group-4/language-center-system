/* eslint-disable max-len */
import React, { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";
import './ManageStudentPage.css';

export function ManageTeacherPage(): ReactElement {
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
        <div className="container" id="grid">
            <div className="text-center">
                <h1>Manage Teacher Page</h1>
                <hr />
            </div>
            <div className="row">
                {/* <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8"> */}
                {/* <button type="button" className="btn btn-primary">
                        <span className=
                            "fa fa-plus mr-5">
                        </span>
                                Create teacher
                </button> */}
                <div className="row mt-15" id="table-cover">
                    <div className=
                        "col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className=
                            "table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        ID</th>
                                    <th className="text-center">
                                        Username</th>
                                    <th className="text-center">
                                        First name</th>
                                    <th className="text-center">
                                        Middle name</th>
                                    <th className="text-center">
                                        Last name</th>
                                    <th className="text-center">
                                        Phone
                                                </th>
                                    <th className="text-center">
                                        DoB
                                                </th>
                                    <th className="text-center">
                                        Email
                                                </th>
                                    <th className="text-center">
                                        Gender
                                                </th>
                                    <th className="text-center">
                                        Job
                                                </th>
                                    <th className="text-center">
                                        Description
                                                </th>
                                    <th className="text-center">
                                        Account status
                                                </th>
                                    <th className="text-center">
                                        Date created
                                                </th>
                                    <th className="text-center">
                                        Last login
                                                </th>

                                    <th className="text-center">
                                        Last modified
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
                                {user.map(
                                    (
                                        item
                                        , index
                                    ) => <tr key={index}>

                                            <td>
                                                {item["userID"]}
                                            </td>

                                            <td>
                                                {item["userName"]}
                                            </td>

                                            <td>
                                                {item["firstName"]}
                                            </td>

                                            <td>
                                                {item["middleName"]}
                                            </td>

                                            <td>
                                                {item["lastName"]}
                                            </td>

                                            <td>
                                                {item["phoneNumber"]}
                                            </td>

                                            <td>
                                                {item["dob"]}
                                            </td>

                                            <td>
                                                {item["email"]}
                                            </td>

                                            <td>
                                                {item["gender"]}
                                            </td>

                                            <td>
                                                {item["job"]}
                                            </td>

                                            <td>
                                                {item["selfDescription"]}
                                            </td>

                                            <td className="text-center">
                                                <span
                                                    className="label label-success">
                                                    {item["accountStatus"]}
                                                </span>
                                            </td>

                                            <td>
                                                {item["dateCreated"]}
                                            </td>

                                            <td>
                                                {item["lastLogin"]}
                                            </td>

                                            <td>
                                                {item["lastModified"]}
                                            </td>

                                            <td className="text-center" id="action">
                                                <Link to="/user_detail/studentID">
                                                    <button type="button"
                                                        className="btn btn-primary">
                                                        <span className=
                                                            "fa fa-pencil mr-5">
                                                            View Detail
                                                    </span>
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <Link to="/editStudentInfo/studentID">
                                                    <button type="button"
                                                        className="btn btn-warning">
                                                        <span className=
                                                            "fa fa-pencil mr-5">
                                                            Edit
                                                    </span>
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <Link to="/editStudentInfo/studentID">
                                                    <button type="button"
                                                        className="btn btn-warning">
                                                        <span className=
                                                            "fa fa-pencil mr-5">
                                                            Delete
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