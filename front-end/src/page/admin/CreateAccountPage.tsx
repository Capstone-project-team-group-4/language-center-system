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
import { RegisterFormAPI } from "../../common/service/RegisterFormAPI";
import { RoleAPI } from "../../common/service/RoleAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { RegisterForm } from "../../model/RegisterForm";
import { Role } from "../../model/Role";

function renderRoleDropdownList (role: Role): ReactElement {
    let roleNameWithoutPrefix: string | undefined;

    roleNameWithoutPrefix = role.roleName.slice (5);
    return (
        <option key = {role.roleID}>
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
                {`${registerForm.firstName} ${registerForm.lastName}`}
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
                    onClick = {handleAcceptRequest}
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

interface CreateAccountPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function CreateAccountPage (
    props: CreateAccountPageProps
): ReactElement {

    // Variables declaration:
    let [registerFormHolder, setRegisterFormHolder] 
        = useState<RegisterForm[]> ([]);
    let registerFormAPI: RegisterFormAPI;
    let typeGuardian: TypeGuard;
    let [pageNumber, setPageNumber] = useState<number> (0);
    let [pageSize, setPageSize] = useState<number> (10);
    let [roleHolder, setRoleHolder] = useState<Role[]> ([]);
    let roleAPI: RoleAPI;
    let [selectedRoleName, setSelectedRoleName] = useState<string> ("");
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
    let roleNameWithoutPrefix: string | undefined;

    registerFormAPI = new RegisterFormAPI ();
    typeGuardian = new TypeGuard ();
    roleAPI = new RoleAPI ();
    
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
                loadRegisterFormTable ();
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
        else {
            props.dialogController.setDialogTitle ("Error !");
            props.dialogController.setDialogBody (
                    "Please add at least one role."
            );
            props.dialogController.setDialogType ("error");
            props.dialogController.setShowDialog (true);
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
            loadRegisterFormTable ();
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

    function handleAddRole (){
        for (i = 0; i < roleHolder.length; i++){
            role = roleHolder[i];
            if (role.roleName === `ROLE_${selectedRoleName}`){
                updatedRoleHolder = roleHolder.slice ();
                selectedRoleArray = updatedRoleHolder.splice (i, 1);
                setRoleHolder (updatedRoleHolder);
                if (updatedRoleHolder.length > 0){
                    defaultRoleSelection = updatedRoleHolder[0];
                    roleNameWithoutPrefix 
                        = defaultRoleSelection.roleName.slice (5); 
                    setSelectedRoleName (roleNameWithoutPrefix);
                }
                selectedRole = selectedRoleArray[0];
                updatedNewAccountRoleList = newAccountRoleList.slice ();
                updatedNewAccountRoleList.push (selectedRole);
                setNewAccountRoleList (updatedNewAccountRoleList);
                break;
            }
        }
    }

    function handleReset (){
        loadRoleDropdownList ();
        updatedNewAccountRoleList = new Array<Role> ();
        setNewAccountRoleList (updatedNewAccountRoleList);
    }

    function handleSelectedRoleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        setSelectedRoleName (event.target.value);
    }

    async function loadRoleDropdownList (): Promise<void> {
        try {
            updatedRoleHolder = await roleAPI.getAllRole (); 
            setRoleHolder (updatedRoleHolder);
            defaultRoleSelection = updatedRoleHolder[0];
            roleNameWithoutPrefix = defaultRoleSelection.roleName.slice (5);
            setSelectedRoleName (roleNameWithoutPrefix);
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

    async function loadRegisterFormTable (): Promise<void> {
        try {
            setRegisterFormHolder (
                    await registerFormAPI.getAllCreateAccountRequest (
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
            loadRoleDropdownList ();
            loadRegisterFormTable ();
        }
        , []
    );

    useEffect (
        (): void => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeRequestRejection ();
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
                                                value = {selectedRoleName}
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
                                        {registerFormHolder.map (
                                            (
                                                    registerForm
                                                    , index
                                            ) => renderRegisterFormTable (
                                                    registerForm
                                                    , index
                                                    , handleAcceptRequest
                                                    , handleRejectRequest
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