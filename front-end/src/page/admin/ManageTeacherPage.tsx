/* eslint-disable no-await-in-loop */
// Import package members section:
import React, {
    ReactElement
    , useEffect
    , useState
} from "react";
import { Link, useParams } from "react-router-dom";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';
import './ManageTeacherPage.css';
import {
    Breadcrumb
    , Button
    , Col
    , Container
    , Form
    , Modal
    , Row
    , Table
} from "react-bootstrap";


export function ManageTeacherPage(): ReactElement {

    let [user, setUser] = useState<User[]>([]);
    let userAPI: UserAPI | undefined;
    let param: any = useParams();

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.viewTeacher().then(
            (res) => {
                setUser(res.data);
            }
        )
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log();

    // function deleteTeacher(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, userID: number) {
    //     event.buttons;
    //     userAPI = new UserAPI();
    //     userAPI.deleteAnotherUser(userID);
    //     console.log(userID);
    // }

    // console.log(param.userID);
    return (
        <div className="max-width" id="grid">
            <div className="text-center">
                <h1>Manage teacher</h1>
                <hr />
            </div>
            <div className="row">
                <div>
                    {/* <button type="button" className="btn btn-primary">
                        <span className="fa fa-plus mr-5 ">
                        </span>
                                Add teacher
                </button> */}
                    <div className="row mt-15" id="table-cover" style={{
                        marginLeft: '300px'
                    }}>

                        <div className=
                            "col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <table className="table table-responsive table-fit table-light table-striped table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="text-center text-nowrap">
                                            ID
                                    </th>

                                        <th className="text-center text-nowrap">
                                            User name
                                    </th>

                                        <th className="text-center text-nowrap">
                                            First name
                                        </th>

                                        <th className="text-center text-nowrap">
                                            Middle name
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Last name
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Phone
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Account status
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Action
                                    </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map(
                                        (
                                            item
                                            , index
                                        ) => <tr key={index} className="text-center text-nowrap">

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

                                                <td className="text-center">
                                                    <span className="label label-success">
                                                        {item["accountStatus"]}
                                                    </span>
                                                </td>

                                                <td className="text-center text-nowrap" id="action">
                                                    <Link to={"/user_detail/" + item.userID}>
                                                        <button type="button" className="btn btn-outline-info">
                                                            <span className="fa fa-pencil mr-5">
                                                                Detail
                                                    </span>
                                                        </button>
                                                    </Link>
                                                    &nbsp;
                                                    <Link to={"/editStudentInfo/" + item.userID}>
                                                        <button type="button" className="btn btn-outline-primary">
                                                            <span className="fa fa-pencil mr-5">
                                                                Edit
                                                            </span>
                                                        </button>
                                                    </Link>
                                                    {/* &nbsp; */}
                                                    {/* <Link to="/editTeacherInfo/:teacherID">
                                                        <button type="button" className="btn btn-outline-danger">
                                                            <span className=
                                                                "fa fa-pencil mr-5">
                                                                Delete
                                                    </span>
                                                        </button>
                                                    </Link> */}
                                                    {/* <button type="button" className="btn btn-outline-danger"
                                                        onClick={(event) => {
                                                            deleteTeacher(event, param.userID);
                                                        }}>
                                                        <span className=
                                                            "fa fa-pencil mr-5">
                                                            Delete
                                                    </span>
                                                    </button> */}
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