/* eslint-disable no-await-in-loop */
// Import package members section:
import React, {
    ChangeEvent,
    FormEvent,
    ReactElement
    , useEffect
    , useState
} from "react";
import { Link, useParams } from "react-router-dom";
import { UserAPI } from "../../common/service/UserAPI";
import { User, UserIndexSignature } from "../../model/User";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';
import './ManageTeacherPage.css';
import {
    Button,
    Col,
    Form,
    Modal,
    Pagination
} from "react-bootstrap";
import { PagingSection } from "../../common/component/PagingSection";

export function ManageTeacherPage(): ReactElement {

    let [pageIndex, setPageIndex] = useState<number>(0);
    let [pageSize] = useState<number>(5);
    let [totalRowCount, setTotalRowCount] = useState<number>(0);

    let [user, setUser] = useState<User[]>([]);
    let [teacher, setTeacher] = useState<User>(new User());
    let userAPI: UserAPI | undefined;
    let inputField:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let param: any = useParams();
    let updatedUser: User | undefined;
    let [item, setItem] = useState<User>(new User());
    const [refreshKey, setRefreshKey] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item: any) => {
        setShow(true);
        setItem(item);
        setTeacher(item);
    }

    totalRowCount = user.length;

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
    }, [refreshKey]);

    // function displayTeacherEdit() {
    //     userAPI = new UserAPI();
    //     userAPI.displayStudent(param.studentID).then(
    //         (res) => {
    //             setTeacher(res.data);
    //             // console.log(student.userName);
    //         }
    //     );
    // }

    function goToPage(destinationPageIndex: number): void {
        setPageIndex(destinationPageIndex);
    }

    function handleUserChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        updatedUser = new User(teacher);
        inputField = event.target;
        updatedUser[
            inputField.name as keyof UserIndexSignature
        ] = inputField.value;
        setTeacher(updatedUser);
    }

    function updateStudent(event: FormEvent<HTMLFormElement>, userID: number) {
        event.preventDefault();
        userAPI = new UserAPI();
        userAPI.update(teacher, userID).then((res: any) => {
            setRefreshKey((number) => number + 1);
        });
    }
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
                                <tbody >

                                    {user.map((item) => {
                                        return (
                                            <tr className="text-center text-nowrap">

                                                <td>
                                                    {item.userID}
                                                </td>

                                                <td>
                                                    {item.userName}
                                                </td>

                                                <td>
                                                    {item.firstName}
                                                </td>

                                                <td>
                                                    {item.middleName}
                                                </td>

                                                <td>
                                                    {item.lastName}
                                                </td>

                                                <td>
                                                    {item.phoneNumber}
                                                </td>

                                                <td className="text-center">
                                                    <span className="label label-success">
                                                        {item.accountStatus}
                                                    </span>
                                                </td>

                                                <td className="text-center text-nowrap" id="action">
                                                    <Link to={"/user_detail/" + item.userID}>
                                                        <button type="button" className="btn btn-outline-info">
                                                            <span className="fa fa-pencil mr-5 text-center text-nowrap">
                                                                Detail
                                                            </span>
                                                        </button>
                                                    </Link>
                                                    &nbsp;
                                                    {/* <Link to={"/admin-console/editStudentInfo/" + item.userID}>
                                                    <button type="button" className="btn btn-outline-primary">
                                                        <span className="fa fa-pencil mr-5">
                                                            Edit
                                                            </span>
                                                    </button>

                                                    </Link> */}
                                                    <Button variant="primary" onClick={() => handleShow(item)} >
                                                        Edit
                                                    </Button>

                                                    {/* <button type="button" className="btn btn-outline-primary" href={item.userID} onClick={handleShow}>
                                                        <span className="fa fa-pencil mr-5">
                                                            Edit
                                                            </span>
                                                    </button> */}

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
                                    })}
                                </tbody>
                            </table>
                            <Modal show={show} onHide={handleClose}>
                                <Form
                                    noValidate={false}
                                    onSubmit={(event) => {
                                        updateStudent(event, item.userID);
                                    }}
                                    className="wrapper"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit My Profile</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>
                                                User Name:
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                autoComplete="on"
                                                autoFocus={true}
                                                name="userName"
                                                id="userName"
                                                pattern="^[\p{L} .'-]+$"
                                                defaultValue={item.userName}
                                                required={true}
                                                spellCheck={false}
                                                onChange={handleUserChange}
                                            />
                                        </Form.Group>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>
                                                    First Name:
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoComplete="on"
                                                    autoFocus={true}
                                                    name="firstName"
                                                    id="firstName"
                                                    pattern="^[\p{L} .'-]+$"
                                                    defaultValue={item.firstName}
                                                    required={true}
                                                    spellCheck={false}
                                                    onChange={handleUserChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>
                                                    Middle Name:
                                                                        </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoComplete="on"
                                                    autoFocus={true}
                                                    name="middleName"
                                                    id="middleName"
                                                    pattern="^[\p{L} .'-]+$"
                                                    defaultValue={item.middleName}
                                                    required={true}
                                                    spellCheck={false}
                                                    onChange={handleUserChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>
                                                    Last Name:
                                                                        </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoComplete="on"
                                                    autoFocus={true}
                                                    name="lastName"
                                                    id="lastName"
                                                    pattern="^[\p{L} .'-]+$"
                                                    defaultValue={item.lastName}
                                                    required={true}
                                                    spellCheck={false}
                                                    onChange={handleUserChange}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group>
                                            <Form.Label>
                                                Email:
                                                                    </Form.Label>
                                            <Form.Control
                                                type="email"
                                                autoComplete="on"
                                                autoFocus={false}
                                                name="email"
                                                id="email"
                                                defaultValue={item.email}
                                                required={false}
                                                spellCheck={false}
                                                onChange={handleUserChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                DOB:
                                                                    </Form.Label>
                                            <Form.Control
                                                type="date"
                                                autoComplete="on"
                                                autoFocus={false}
                                                name="dob"
                                                id="dob"
                                                defaultValue={item.dob.toString()}
                                                required={false}
                                                spellCheck={false}
                                                onChange={handleUserChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Phone:
                                                                    </Form.Label>
                                            <Form.Control
                                                type="text"
                                                autoComplete="on"
                                                autoFocus={false}
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                pattern="^(?:[0-9] ?){6,14}[0-9]$"
                                                defaultValue={item.phoneNumber}
                                                required={false}
                                                spellCheck={false}
                                                onChange={handleUserChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Gender
                                                                    </Form.Label>
                                            <Form.Control as="select" id="gender" name="gender" onChange={handleUserChange}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Bisexual">Bisexual</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Job:
                                                                    </Form.Label>
                                            <Form.Control
                                                type="text"
                                                autoComplete="on"
                                                autoFocus={false}
                                                name="job"
                                                id="job"
                                                pattern="^[\p{L} .'-]+$"
                                                defaultValue={item.job}
                                                required={true}
                                                spellCheck={false}
                                                onChange={handleUserChange}
                                            />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose} type="submit" block={true}>
                                            Save Changes
                                                                </Button>
                                        <Button variant="secondary" onClick={handleClose} block={true}>
                                            Close
                                                                </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                            <div>
                                <Form.Group>
                                    <Form.Row
                                        className="justify-content-md-center"
                                    >
                                        <PagingSection
                                            pageIndex={pageIndex}
                                            pageSize={pageSize}
                                            totalRowCount={totalRowCount}
                                            goToPage={goToPage}
                                        />
                                    </Form.Row>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}