// Import package members section:
import React, { 
    ChangeEvent
    , Dispatch, FormEvent
    , ReactElement
    , SetStateAction, useState 
} from 'react';
import { 
    Button, Container, Form, Row 
} from 'react-bootstrap';
import './LogInPage.css';
import { TypeGuard } from '../common/service/TypeGuard';
import { DialogControl } from '../common/component/ModalDialog';
import { UserAPI } from '../common/service/UserAPI';
import { LoggedInUser } from '../model/LoggedInUser';
import { Location, History } from "history";
import { useHistory, useLocation } from 'react-router-dom';
import { LocationState } from '../common/component/ProtectedRoute';
import { Role } from '../model/Role';

class LoginSucceededLocation implements Location<unknown> {
    public pathname: string;
    public search: string;
    public state: unknown;
    public hash: string;
    public key?: string | undefined;

    public constructor (){
        this.pathname = "";
        this.search = "";
        this.hash = "";
    }
}

interface LogInPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loggedInUser: LoggedInUser;
    setLoggedInUser: Dispatch<SetStateAction<LoggedInUser>>; 
}

export function LogInPage (props: LogInPageProps): ReactElement {

    // Variables declaration:
    let [userName, setUserName] = useState<string> ("");
    let [password, setPassword] = useState<string> ("");
    let inputField: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let userAPI: UserAPI;
    let typeGuardian: TypeGuard;
    let currentLocation: Location<unknown>;
    let locationState: LocationState | undefined;
    let previousLocation: Location<unknown> | undefined;
    let loginSucceededLocation: LoginSucceededLocation | undefined;
    let history: History<unknown>;
    let roleHolder: Role[] | undefined;
    let role: Role | undefined; 
    let roleName: string | undefined;

    userAPI = new UserAPI ();
    typeGuardian = new TypeGuard ();
    currentLocation = useLocation ();
    history = useHistory ();

    function handleFieldChange (
            event: ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
    ): void {
        inputField = event.target;
        if (inputField.name === "userName"){
            setUserName (inputField.value);
        }
        else if (inputField.name === "password"){
            setPassword (inputField.value);
        }
    }

    async function logIn (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault ();
        try {
            props.setLoggedInUser (await userAPI.getCurrentLoggedInUser (
                    userName
                    , password
            ));
            props.setIsAuthenticated (true);
            if (currentLocation.state instanceof LocationState){
                locationState = currentLocation.state;
                previousLocation = locationState.from;
                history.replace (previousLocation);
            } 
            else {
                roleHolder = props.loggedInUser.roleHolder;
                loginSucceededLocation = new LoginSucceededLocation ();
                if (roleHolder.length === 1){
                    role = roleHolder[0];
                    roleName = role.roleName;  
                    if (roleName === "ROLE_ADMIN"){
                        loginSucceededLocation.pathname = "/admin-console";
                    }
                }
                else {
                    loginSucceededLocation.pathname = "/select-role-page";
                }
                history.replace (loginSucceededLocation);
            }
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                            `${apiError.code}: ${apiError.name}`
                    );
                    props.dialogController.setDialogBody (apiError.message);
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                    props.dialogController.setDialogBody (apiError.message);
                }
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }
    
    return (
        <Container 
            fluid = {true} 
            id = "LogInPageContentContainer" 
            className = "vh-100"
        >   
            {props.modalDialog}
            <header>
            </header>
            <nav>
            </nav>
            <main className = "h-100">
                <Container 
                    fluid = {true} 
                    className = "h-100"
                >
                    <Row className = {
                        `h-100 
                        justify-content-center 
                        align-items-center`
                    }>
                        <Form
                            id = "LogInForm"
                            className = "bg-white p-5 h-auto"
                            onSubmit = {
                                (event) => {
                                    logIn (event);
                                }
                            }
                        >
                            <Form.Group>
                                <Form.Label>
                                    User Name:
                                </Form.Label>
                                <Form.Control
                                    type = "text"
                                    autoComplete = "off"
                                    autoFocus = {true}
                                    name = "userName"
                                    id = "userName"
                                    placeholder = "Your user name"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {userName}
                                    onChange = {
                                        (event) => {
                                            handleFieldChange (event);
                                        }
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control
                                    type = "password"
                                    autoComplete = "off"
                                    autoFocus = {false}
                                    name = "password"
                                    id = "password"
                                    placeholder = "Your password"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {password}
                                    onChange = {
                                        (event) => {
                                            handleFieldChange (event);
                                        }
                                    }
                                />
                            </Form.Group>

                            <Button 
                                variant = "success"
                                type = "submit"
                                block = {true}
                            >
                                Log in
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}
