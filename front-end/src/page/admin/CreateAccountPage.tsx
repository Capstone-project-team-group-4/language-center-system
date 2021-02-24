// Import package members section:
import React, { 
    ChangeEvent
    , MouseEvent
    , ReactElement
    , useEffect
    , useState 
} from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { DialogControl } from "../../common/component/ModalDialog";
import { NewUserAPI } from "../../common/service/NewUserAPI";
import { RoleAPI } from "../../common/service/RoleAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { NewUser } from "../../model/NewUser";
import { Role } from "../../model/Role";

function renderRoleDropdownList (role: Role): ReactElement {
    return (
        <option key = {role.roleID}>
            {role.roleName}
        </option>
    );
}

function renderRoleListSection (role: Role): ReactElement {
    return (
        <span key = {role.roleID}>
            {role.roleName},&nbsp;
        </span>
    );
}

function renderNewUserTable (
        newUser: NewUser
        , index: number
        , handleAcceptRequest: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void> 
        , handleRejectRequest: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void> 
): ReactElement {
    return (
        <tr key = {newUser.userID}>
            <td>
                {index + 1}
            </td>
            <td>
                {`${newUser.firstName} ${newUser.lastName}`}
            </td>
            <td>
                {newUser.phoneNumber}
            </td>
            <td>
                {newUser.email}
            </td>
            <td>
                {newUser.userName}
            </td>
            <td>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {newUser.userID}
                    onClick = {handleAcceptRequest}
                >
                    Accept
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {newUser.userID}
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
    let [newUserHolder, setNewUserHolder] = useState<NewUser[]> ([]);
    let newUserAPI: NewUserAPI;
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
    let userID: number | undefined;

    newUserAPI = new NewUserAPI ();
    typeGuardian = new TypeGuard ();
    roleAPI = new RoleAPI ();
    
    async function handleAcceptRequest (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        if (newAccountRoleList.length > 0){
            button = event.target as HTMLButtonElement;
            userID = Number (button.value);
            try {
                await newUserAPI.acceptCreateAccountRequest (
                        userID
                        , newAccountRoleList
                );
                loadNewUserTable ();
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

    async function handleRejectRequest (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        userID = Number (button.value);
        try {
            await newUserAPI.rejectCreateAccountRequest (
                    userID
            );
            loadNewUserTable ();
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
            if (role.roleName === selectedRoleName){
                updatedRoleHolder = roleHolder.slice ();
                selectedRoleArray = updatedRoleHolder.splice (i, 1);
                setRoleHolder (updatedRoleHolder);
                if (updatedRoleHolder.length > 0){
                    defaultRoleSelection = updatedRoleHolder[0];
                    setSelectedRoleName (defaultRoleSelection.roleName);
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
            setSelectedRoleName (defaultRoleSelection.roleName);
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

    async function loadNewUserTable (): Promise<void> {
        try {
            setNewUserHolder (await newUserAPI.getAllCreateAccountRequest (
                pageNumber
                , pageSize
            ));
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
        function fetchTableData (): void {
            loadRoleDropdownList ();
            loadNewUserTable ();
        }
        , []
    );

    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <main>
                <Container>
                    <Row className = "bg-white">
                        <Col>
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
                                        {newUserHolder.map (
                                            (
                                                    newUser
                                                    , index
                                            ) => renderNewUserTable (
                                                    newUser
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