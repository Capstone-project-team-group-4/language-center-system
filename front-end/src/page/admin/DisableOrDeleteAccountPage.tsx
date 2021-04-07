// Import package members section:
import React, { 
    MouseEvent
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
import { TypeGuard } from "../../common/service/TypeGuard";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";

interface DisableOrDeleteAccountPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function DisableOrDeleteAccountPage (
    props: DisableOrDeleteAccountPageProps
): ReactElement {

    // Variables declaration:
    let [userHolder, setUserHolder] = useState<User[]> ([]);
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let button: HTMLButtonElement | undefined;
    let [pendingUserID, setPendingUserID] = useState<number> (0);
    let [pendingAction, setPendingAction] = useState<string> ("");

    let [userAPI] = useState<UserAPI> (new UserAPI ());
    
    function handleDisableUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingUserID (Number (button.value));
        setPendingAction ("Disable user");
        props.dialogController.setDialogTitle ("Confirm Disable User");
        props.dialogController.setDialogBody (
                "Are you sure you want to disabe this user ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function enableUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        try {
            await userAPI.enableUser (Number (button.value));
            await loadUserTable ();
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
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
            return Promise.reject (apiError);
        }
    }

    async function executeUserDisablement (): Promise<void> {
        try {
            await userAPI.disableAnotherUser (
                    pendingUserID
            );
            await loadUserTable ();
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
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
            return Promise.reject (apiError);
        }
    }

    function handleDeleteUser (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingUserID (Number (button.value));
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
            await userAPI.deleteAnotherUser (pendingUserID);
            await loadUserTable ();
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
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
            return Promise.reject (apiError);
        }
    }

    async function loadUserTable (): Promise<void> {
        try {
            setUserHolder (
                await userAPI.getAllUserExcludingCurrentLoggedInUser (
                    pageIndex
                    , pageSize
                )
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
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
            return Promise.reject (apiError);
        }
    }

    useEffect (
        (): void => {
            loadUserTable ().catch (
                    (error: unknown) => {
                        console.error (error);
                    }
            );
        }
        , []
    );

    useEffect (
        (): void => {
            if (props.dialogController.dialogIsConfirmed === true){
                if (pendingAction === "Disable user"){
                    executeUserDisablement ().catch (
                            (error: unknown) => {
                                console.error (error);
                            }
                    );
                }
                else if (pendingAction === "Delete user"){
                    executeUserDeletion ().catch (
                            (error: unknown) => {
                                console.error (error);
                            }
                    );
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
                            <h1 className = "mb-3">
                                Disable Or Delete Account
                            </h1>
                            <Form>
                                <Table responsive = "md" hover = {true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                User ID
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
                                                    , enableUser
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

function renderUserTable (
        user: User
        , index: number
        , handleDisableUser: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
        , enableUser: (
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
                {user.userID}
            </td>
            <td>
                {`${
                    user.firstName
                } ${
                    user.middleName
                } ${
                    user.lastName
                }`}
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
                    onClick = {
                        (event) => {
                            handleDisableUser (event);
                        }
                    }
                >
                    Disable
                </Button>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {user.userID}
                    onClick = {
                        (event) => {
                            enableUser (event).catch (
                                    (error: unknown) => {
                                        console.error (error);
                                    }
                            );
                        }
                    }
                >
                    Enable
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {user.userID}
                    onClick = {
                        (event) => {
                            handleDeleteUser (event);
                        }
                    }
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}