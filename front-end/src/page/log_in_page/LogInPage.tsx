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
import { TypeGuard } from '../../common/service/TypeGuard';
import { DialogControl } from '../../common/component/ModalDialog';
import { UserAPI } from '../../common/service/UserAPI';
import { LoggedInUser } from '../../model/LoggedInUser';
import { Location, History } from "history";
import { Route, useHistory, useLocation } from 'react-router-dom';
import { LocationState } from '../../common/component/ProtectedRoute';
import { Role } from '../../model/Role';
import { StudentDashboardPage } from '../student/StudentDashboardPage';
import { LocalStorageService } from '../../common/service/LocalStorageService';

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
    setLoggedInUser: Dispatch<SetStateAction<LoggedInUser>>; 
    typeGuardian: TypeGuard;
}

export function LogInPage (props: LogInPageProps): ReactElement {

    // Variables declaration:
    let [userName, setUserName] = useState<string> ("");
    let [password, setPassword] = useState<string> ("");
    let inputField:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let currentLocation: Location<unknown>;
    let locationState: LocationState | undefined;
    let previousLocation: Location<unknown> | undefined;
    let loginSucceededLocation: LoginSucceededLocation | undefined;
    let history: History<unknown>;
    let roleHolder: Role[] | undefined;
    let role: Role | undefined;
    let roleName: string | undefined;
    let loggedInUser: LoggedInUser | undefined;
    let localStorageService = new LocalStorageService();

    let [userAPI] = useState<UserAPI> (new UserAPI ());
    currentLocation = useLocation ();
    history = useHistory ();

    function handleChange (
            event: ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
    ): void {
        inputField = event.target;
        if (inputField.name === "userNameField"){
            setUserName (inputField.value);
        }
        else if (inputField.name === "passwordField"){
            setPassword (inputField.value);
        }
    }

    async function logIn (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault ();
        try {
            loggedInUser = await userAPI.getCurrentLoggedInUser (
                    userName
                    , password
            );
            props.setIsAuthenticated (true); 
            props.setLoggedInUser (loggedInUser);      
            if (currentLocation.state instanceof LocationState){
                locationState = currentLocation.state;
                previousLocation = locationState.from;
                history.replace (previousLocation);
            } 
            else {
                roleHolder = loggedInUser.roleHolder;
                loginSucceededLocation = new LoginSucceededLocation ();
                if (roleHolder.length === 1){
                    role = roleHolder[0];
                    roleName = role.roleName;
                    switch (roleName){
                        default:
                            throw new Error ("Unknown role name !");

                        case "ROLE_ADMIN":
                            loginSucceededLocation.pathname = "/admin-console";
                            break;

                        case "ROLE_TEACHER":
                            loginSucceededLocation.pathname
                                = "/teacher-dashboard";
                            break;

                        case "ROLE_STUDENT":
                            loginSucceededLocation.pathname
                                = "/student-dashboard";
                            localStorageService.setLoggedUserName(loggedInUser);
                            // localStorage.setItem('account', JSON.stringify(loggedInUser));
                            break;
                    }
                }
                else {
                    loginSucceededLocation.pathname = "/select-role-page";
                }
                history.replace (loginSucceededLocation);
            }
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
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
            return Promise.reject (apiError);
        }
    }
    
    return (
        <Container fluid = {true} className = "vh-100">   
            {props.modalDialog}
            <header>
            </header>
            <nav>
            </nav>
            <main className = "h-100">
                <Container fluid = {true} className = "h-100">
                    <Row 
                        className = {
                            `h-100 
                            justify-content-md-center 
                            align-items-center`
                        }
                    >
                        <Form
                            id="LogInForm"
                            className="bg-white p-5 h-auto"
                            style = {{borderRadius:10 + 'px'}}
                            onSubmit = {
                                (event) => {
                                    logIn (event).catch (
                                            (error: unknown) => {
                                                console.error (error);
                                            }
                                    );
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
                                    name = "userNameField"
                                    id = "UserNameField"
                                    placeholder = "Your user name"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {userName}
                                    onChange = {
                                        (event) => {
                                            handleChange (event);
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
                                    name = "passwordField"
                                    id = "PasswordField"
                                    placeholder = "Your password"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {password}
                                    onChange = {
                                        (event) => {
                                            handleChange (event);
                                        }
                                    }
                                />
                            </Form.Group>
                            <Button
                                variant="success"
                                type="submit"
                                block={true}
                            >
                                Log in
                            </Button>
                            <div>
                                <a 
                                    href="/sign-up-page"
                                    style={{fontSize:11 + 'px'}}
                                >
                                    Don't have an account?
                                </a>
                            </div>
                        </Form>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}
