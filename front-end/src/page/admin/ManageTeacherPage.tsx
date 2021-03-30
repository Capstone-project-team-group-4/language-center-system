/* eslint-disable no-await-in-loop */
// Import package members section:
import React, {
    ReactElement
    , useEffect
    , useState
} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';


export function ManageTeacherPage(): ReactElement {

    let [user, setUser] = useState<User[]>([]);
    let userAPI: UserAPI | undefined;

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.viewUser().then(
            (res) => {
                setUser(res.data);
            }
        )
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log();

    return (
        <div className="max-width" id="grid">
            <div className="text-center">
                <h1>Manage teacher</h1>
                <hr />
            </div>
            <div className="row">
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <button type="button" className="btn btn-primary">
                        <span className="fa fa-plus mr-5 ">
                        </span>
                                Add teacher
                </button>
                    <div className="row mt-15 row-eq-height" id="table-cover">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <table className="table table-fit table-light table-striped table-sm table-bordered table-hover table-responsive{-sm|-md|-lg|-xl|-xxl}">
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
                                            DoB
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Email
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Gender
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Job
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Self description
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Account status
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Date created
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Last login
                                    </th>

                                        <th className="text-center text-nowrap">
                                            Last modified
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

                                                <td>
                                                    {item["dob"]}
                                                </td>

                                                <td>{
                                                    item["email"]}
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
                                                    <span className="label label-success">
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
                                                    &nbsp;
                                                    <Link to="/editTeacherInfo/:teacherID">
                                                        <button type="button" className="btn btn-outline-danger">
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
        </div>
    );
}