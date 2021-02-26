/* eslint-disable max-len */
// Import package members section:
import React, { 
    ChangeEvent
    , MouseEvent
    , ReactElement
    , useEffect
    , useState 
} from "react";
import { 
    Breadcrumb
    , Button
    , Col
    , Container
    , Form
    , Row
    , Table 
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DialogControl } from "../../common/component/ModalDialog";
import { NewUserAPI } from "../../common/service/NewUserAPI";
import { RoleAPI } from "../../common/service/RoleAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { UserAPI } from "../../common/service/UserAPI";
import { NewUser } from "../../model/NewUser";
import { Role } from "../../model/Role";
import { User } from "../../model/User";

function renderUserTable (
        user: User
        , index: number
        , handleDisableUser: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
        , handleEnableUser: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void>
        , handleDeleteUser: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {user.userID}>
            <td>
                {index + 1}
            </td>
            <td>
                {`${user.firstName} ${user.lastName}`}
            </td>
            <td>
                {user.phoneNumber}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.userName}
            </td>
            <td>
                {user.accountStatus}
            </td>
            <td>
                <Button 
                    variant = "warning"
                    type = "button"
                    value = {user.userID}
                    onClick = {handleDisableUser}
                >
                    Disable
                </Button>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {user.userID}
                    onClick = {handleEnableUser}
                >
                    Enable
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {user.userID}
                    onClick = {handleDeleteUser}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

interface DisableOrDeleteAccountPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function DisableOrDeleteAccountPage (
    props: DisableOrDeleteAccountPageProps
): ReactElement {

    // Variables declaration:
    let [userHolder, setUserHolder] = useState<User[]> ([]);
    let userAPI: UserAPI;
    let typeGuardian: TypeGuard;
    let [pageNumber, setPageNumber] = useState<number> (0);
    let [pageSize, setPageSize] = useState<number> (10);
    let button: HTMLButtonElement | undefined;
    let [userID, setUserID] = useState<number> (0);
    let [pendingAction, setPendingAction] = useState<string> ("");

    userAPI = new UserAPI ();
    typeGuardian = new TypeGuard ();
    
    function handleDisableUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setUserID (Number (button.value));
        setPendingAction ("Disable user");
        props.dialogController.setDialogTitle ("Confirm Disable User");
        props.dialogController.setDialogBody (
                "Are you sure you want to disabe this user ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function handleEnableUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        try {
            await userAPI.enableUser (Number (button.value));
            loadUserTable ();
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }

    async function executeUserDisablement (): Promise<void> {
        try {
            await userAPI.disableAnotherUser (
                    userID
            );
            loadUserTable ();
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }

    function handleDeleteUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setUserID (Number (button.value));
        setPendingAction ("Delete user");
        props.dialogController.setDialogTitle ("Confirm Delete User");
        props.dialogController.setDialogBody (
                "Are you sure you want to delete this user ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeUserDeletion (): Promise<void> {
        try {
            await userAPI.deleteAnotherUser (
                    userID
            );
            loadUserTable ();
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }

    async function loadUserTable (): Promise<void> {
        try {
            setUserHolder (
                await userAPI.getAllUserExcludingCurrentLoggedInUser (
                    pageNumber
                    , pageSize
                )
            );
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                            `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }

    useEffect (
        (): void => {
            loadUserTable ();
        }
        , []
    );

    useEffect (
        (): void => {
            if (props.dialogController.dialogIsConfirmed === true){
                if (pendingAction === "Disable user"){
                    executeUserDisablement ();
                }
                else if (pendingAction === "Delete user"){
                    executeUserDeletion ();
                }
                props.dialogController.setDialogIsConfirmed (false); 
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <main>
                <Container>
                    <Row className = "bg-white">
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {{to: "/"}}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {{to: "/admin-console"}}
                                >
                                    Admin Console
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Disable Or Delete Account
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1>
                                Disable Or Delete Account
                            </h1>
                            <Form>
                                <Form.Group>
                                    
                                </Form.Group>
                                <Table responsive = "md" hover = {true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Full Name
                                            </th>
                                            <th>
                                                Phone Number
                                            </th>
                                            <th>
                                                Email
                                            </th>
                                            <th>
                                                User Name
                                            </th>
                                            <th>
                                                AccountStatus
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userHolder.map (
                                            (
                                                    user
                                                    , index
                                            ) => renderUserTable (
                                                    user
                                                    , index
                                                    , handleDisableUser
                                                    , handleEnableUser
                                                    , handleDeleteUser
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}