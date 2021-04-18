/* eslint-disable react-hooks/exhaustive-deps */
// Import package members section:
import React, { 
    ChangeEvent
    , MouseEvent
    , ReactElement
    , ReactNode
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
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { PagingSection } from "../../common/component/PagingSection";
import { RegisterFormAPI } from "../../common/service/RegisterFormAPI";
import { RoleAPI } from "../../common/service/RoleAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { RegisterForm } from "../../model/RegisterForm";
import { Role } from "../../model/Role";

function renderRoleDropdownList (role: Role): ReactElement {
    let roleNameWithoutPrefix: string | undefined;

    roleNameWithoutPrefix = role.roleName.slice (5);
    return (
        <option 
            key = {role.roleID}
            value = {role.roleID}
        >
            {roleNameWithoutPrefix}
        </option>
    );
}

function renderRoleListSection (role: Role): ReactElement {
    let roleNameWithoutPrefix: string | undefined;
    
    roleNameWithoutPrefix = role.roleName.slice (5);
    return (
        <span key = {role.roleID}>
            {roleNameWithoutPrefix},&nbsp;
        </span>
    );
}

interface CreateAccountPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function CreateAccountPage (
    props: CreateAccountPageProps
): ReactElement {

    // Variables declaration:
    let [registerFormHolder, setRegisterFormHolder] 
        = useState<RegisterForm[]> ([]);
    let [pageIndex, setPageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (5);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let [roleHolder, setRoleHolder] = useState<Role[]> ([]);
    let [selectedRoleID, setSelectedRoleID] = useState<number> (0);
    let [newAccountRoleList, setNewAccountRoleList] = useState<Role[]> ([]);
    let i: number | undefined; 
    let role: Role | undefined;
    let selectedRoleArray: Role[] | undefined;
    let selectedRole: Role | undefined;
    let updatedNewAccountRoleList: Role[] | undefined;
    let updatedRoleHolder: Role[] | undefined;
    let defaultRoleSelection: Role | undefined;
    let button: HTMLButtonElement | undefined;
    let [userID, setUserID] = useState<number> (0);
    let registerFormDataPage: DataPage<RegisterForm> | undefined;
    let registerFormTable: ReactNode;

    let [registerFormAPI] = useState<RegisterFormAPI> (new RegisterFormAPI ());
    let [roleAPI] = useState<RoleAPI> (new RoleAPI ());
    
    async function handleAcceptRequest (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        if (newAccountRoleList.length > 0){
            button = event.target as HTMLButtonElement;
            try {
                await registerFormAPI.acceptCreateAccountRequest (
                        Number (button.value)
                        , newAccountRoleList
                );
                props.dialogController.setDialogTitle ("Account Created !");
                props.dialogController.setDialogBody (
                        "The create account request has been accepted."
                );
                props.dialogController.setDialogType ("inform");
                props.dialogController.setShowDialog (true);
                await loadRegisterFormTable ();
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
        else {
            props.dialogController.setDialogTitle ("Error !");
            props.dialogController.setDialogBody (
                    "Please add at least one role."
            );
            props.dialogController.setDialogType ("error");
            props.dialogController.setShowDialog (true);
            return Promise.reject (
                    new Error ("Please add at least one role !")
            );
        }
    }

    function handleRejectRequest (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setUserID (Number (button.value));
        props.dialogController.setDialogTitle ("Confirm Rejection");
        props.dialogController.setDialogBody (
                "Are you sure you want to reject this create account request ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeRequestRejection (): Promise<void> {
        try {
            await registerFormAPI.rejectCreateAccountRequest (
                    userID
            );
            await loadRegisterFormTable ();
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

    function handleAddRole (): void {
        for (i = 0; i < roleHolder.length; i++){
            role = roleHolder[i];
            if (role.roleID === selectedRoleID){
                updatedRoleHolder = roleHolder.slice ();
                selectedRoleArray = updatedRoleHolder.splice (i, 1);
                setRoleHolder (updatedRoleHolder);
                if (updatedRoleHolder.length > 0){
                    defaultRoleSelection = updatedRoleHolder[0];
                    setSelectedRoleID (defaultRoleSelection.roleID);
                }
                selectedRole = selectedRoleArray[0];
                updatedNewAccountRoleList = newAccountRoleList.slice ();
                updatedNewAccountRoleList.push (selectedRole);
                setNewAccountRoleList (updatedNewAccountRoleList);
                break;
            }
        }
    }

    function handleReset (): void {
        loadRoleDropdownList ().catch (
                (error) => {
                    console.error (error);
                }
        );
        updatedNewAccountRoleList = new Array<Role> ();
        setNewAccountRoleList (updatedNewAccountRoleList);
    }

    function handleSelectedRoleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        setSelectedRoleID (Number (event.target.value));
    }

    async function loadRoleDropdownList (): Promise<void> {
        try {
            updatedRoleHolder = await roleAPI.getAllRole (); 
            setRoleHolder (updatedRoleHolder);
            defaultRoleSelection = updatedRoleHolder[0];
            setSelectedRoleID (defaultRoleSelection.roleID);
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

    async function loadRegisterFormTable (): Promise<void> {
        try {
            registerFormDataPage = await registerFormAPI.getAllCreateAccountRequest (
                    pageIndex
                    , pageSize
            );
            setTotalRowCount (registerFormDataPage.totalRowCount);
            setRegisterFormHolder (registerFormDataPage.pageDataHolder);
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
        () => {
            loadRoleDropdownList ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
            loadRegisterFormTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , []
    );

    useEffect (
        () => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeRequestRejection ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
                props.dialogController.setDialogIsConfirmed (false); 
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    function goToPage (destinationPageIndex: number): void {
        setPageIndex (destinationPageIndex);
    }

    useEffect (
        () => {
            loadRegisterFormTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , [pageIndex]
    );
    
    if (registerFormHolder.length === 0){
        registerFormTable =
            <tr>
                <td colSpan = {6} className = "text-center">
                    <h5>
                        There are no register-forms in the system to show here
                    </h5>
                </td>
            </tr>;
    }
    else {
        registerFormTable =
            registerFormHolder.map (
                (
                        registerForm
                        , index
                ) => renderRegisterFormTable (
                        registerForm
                        , index
                        , handleAcceptRequest
                        , handleRejectRequest
                )
            );
    }

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
                                    Create Account Requests
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1>
                                Create Account Requests
                            </h1>
                            <hr/>
                            <Form>
                                <Form.Group>
                                    <Form.Row 
                                        className = "justify-content-md-center"
                                    >
                                        <Form.Label className = "mr-2">
                                            <h4>
                                                {"~"} Add role 
                                                for the new account:
                                            </h4>
                                        </Form.Label>
                                        <Col xs = "auto" className = "mr-2">
                                            <Form.Control 
                                                as = "select" 
                                                value = {selectedRoleID}
                                                onChange = {
                                                    (event) => {
                                            // eslint-disable-next-line max-len
                                                        handleSelectedRoleChange (
                                                            event
                                                        );
                                                    } 
                                                }
                                            >
                                                {roleHolder.map (
                                                    (
                                                            role
                                            // eslint-disable-next-line max-len
                                                    ) => renderRoleDropdownList (
                                                            role
                                                    )  
                                                )}
                                            </Form.Control>
                                        </Col>
                                        <Button 
                                            variant = "success"
                                            type = "button"
                                            className = "mr-2"
                                            onClick = {
                                                () => {
                                                    handleAddRole ();
                                                }
                                            }
                                        >
                                            Add role
                                        </Button>
                                        <Button 
                                            variant = "primary"
                                            type = "button"
                                            className = "mr-2"
                                            onClick = {
                                                () => {
                                                    handleReset ();
                                                }
                                            }
                                        >
                                            Reset
                                        </Button>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Row 
                                        className = "justify-content-md-center"
                                    >
                                        <Form.Label className = "mr-2">
                                            <h4>
                                                {">"} The accepted account 
                                                will have roles:
                                            </h4>
                                        </Form.Label>
                                        {newAccountRoleList.map (
                                            (
                                                    role
                                            ) => renderRoleListSection (
                                                    role
                                            )
                                        )}
                                    </Form.Row>
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
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registerFormTable}
                                    </tbody>
                                </Table>
                                <Form.Group>
                                    <Form.Row 
                                        className = "justify-content-md-center"
                                    >
                                        <PagingSection 
                                            pageIndex = {pageIndex}
                                            pageSize = {pageSize}
                                            totalRowCount = {totalRowCount}
                                            goToPage = {goToPage}
                                        />
                                    </Form.Row> 
                                </Form.Group>
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

function renderRegisterFormTable (
        registerForm: RegisterForm
        , index: number
        , handleAcceptRequest: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void> 
        , handleRejectRequest: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {registerForm.formID}>
            <td>
                {index + 1}
            </td>
            <td>
                {`${
                    registerForm.firstName
                } ${
                    registerForm.middleName
                } ${
                    registerForm.lastName
                }`}
            </td>
            <td>
                {registerForm.phoneNumber}
            </td>
            <td>
                {registerForm.email}
            </td>
            <td>
                {registerForm.userName}
            </td>
            <td>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {registerForm.formID}
                    onClick = {
                        (event) => {
                            handleAcceptRequest (event).catch (
                                    (error) => {
                                        console.error (error);
                                    }
                            );
                        }
                    }
                >
                    Accept
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {registerForm.formID}
                    onClick = {handleRejectRequest}
                >
                    Reject
                </Button>
            </td>
        </tr>
    );
}