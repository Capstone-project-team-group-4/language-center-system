// Import package members section:
import React, { 
    ChangeEvent
    , FormEvent
    , ReactElement
    , useState 
} from 'react';
import { RegisterFormAPI } from '../common/service/RegisterFormAPI';
import { 
    Button, Container, Form, Row 
} from 'react-bootstrap';
import './SignUpPage.css';
import { RegisterForm } from '../model/RegisterForm';
import { TypeGuard } from '../common/service/TypeGuard';
import { DialogControl } from '../common/component/ModalDialog';

interface SignUpPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function SignUpPage (props: SignUpPageProps): ReactElement {

    // Variables declaration:
    let [registerForm, setRegisterForm] = useState<RegisterForm> (
            new RegisterForm ()
    );
    let updatedRegisterForm: RegisterForm | undefined;
    let htmlElement: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let registerFormAPI: RegisterFormAPI;
    let typeGuardian: TypeGuard;

    registerFormAPI = new RegisterFormAPI ();
    typeGuardian = new TypeGuard ();

    function handleUserChange (
            event: ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
    ): void {  
        updatedRegisterForm = new RegisterForm (registerForm);
        htmlElement = event.target;
        switch (htmlElement.name){
            default:
                throw new Error ("Unknown html element !");

            case "firstNameField":
                updatedRegisterForm.firstName = htmlElement.value;
                break;
                
            case "middleNameField":
                updatedRegisterForm.middleName = htmlElement.value;
                break;

            case "lastNameField":
                updatedRegisterForm.lastName = htmlElement.value;
                break;
                
            case "phoneNumberField":
                updatedRegisterForm.phoneNumber = htmlElement.value;
                break;

            case "emailField":
                updatedRegisterForm.email = htmlElement.value;
                break;

            case "userNameField":
                updatedRegisterForm.userName = htmlElement.value;
                break;

            case "passwordField":
                updatedRegisterForm.password = htmlElement.value;
                break;
        }
        setRegisterForm (updatedRegisterForm);
    }

    async function signUp (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault ();
        try {
            await registerFormAPI.registerNewCreateAccountRequest (
                    registerForm
            ); 
            props.dialogController.setDialogTitle ("Success !");
            props.dialogController.setDialogBody (
                `Your create-account-request have been registered
                , waiting for admin approval...`
            );
            props.dialogController.setDialogType ("sign-up-succeeded");
            props.dialogController.setShowDialog (true);
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

    return (
        <Container 
            fluid = {true} 
            className = "h-100"
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
                    <Row className = "h-100 justify-content-md-center">
                        <Form
                            id = "SignUpForm"
                            className = "bg-white p-5"
                            onSubmit = {
                                (event) => {
                                    signUp (event);
                                }
                            }
                        >
                            <Form.Row>
                                <Form.Group className = "col-md-4">
                                    <Form.Label>
                                        First Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {true}
                                        name = "firstNameField"
                                        id = "FirstNameField"
                                        pattern = "^[\p{L} .'-]+$"
                                        placeholder = "Your first name"
                                        required = {true}
                                        spellCheck = {false}
                                        value = {registerForm.firstName}
                                        onChange = {
                                            (event) => {
                                                handleUserChange (event);
                                            }
                                        }
                                    />
                                    <Form.Text className = "text-muted">
                                        format: characters only !  
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className = "col-md-4">
                                    <Form.Label>
                                        Middle Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {false}
                                        name = "middleNameField"
                                        id = "MiddleNameField"
                                        pattern = "^[\p{L} .'-]+$"
                                        placeholder = "Your middle name"
                                        required = {true}
                                        spellCheck = {false}
                                        value = {registerForm.middleName}
                                        onChange = {
                                            (event) => {
                                                handleUserChange (event);
                                            }
                                        }
                                    />
                                    <Form.Text className = "text-muted">
                                        format: characters only !  
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className = "col-md-4">
                                    <Form.Label>
                                        Last Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {false}
                                        name = "lastNameField"
                                        id = "LastNameField"
                                        pattern = "^[\p{L} .'-]+$"
                                        placeholder = "Your last name"
                                        required = {true}
                                        spellCheck = {false}
                                        value = {registerForm.lastName}
                                        onChange = {
                                            (event) => {
                                                handleUserChange (event);
                                            }
                                        }
                                    />
                                    <Form.Text className = "text-muted">
                                        format: characters only !  
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label>
                                    Phone Number:
                                </Form.Label>
                                <Form.Control
                                    type = "tel"
                                    autoComplete = "on"
                                    autoFocus = {false}
                                    name = "phoneNumberField"
                                    id = "PhoneNumberField"
                                    pattern = "^(?:[0-9] ?){6,14}[0-9]$"
                                    minLength = {8}
                                    placeholder = "Enter your phone number"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {registerForm.phoneNumber}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format: valid phone numbers 
                                    containing numbers only and must be 
                                    at least 8 digits long !  
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Email:
                                </Form.Label>
                                <Form.Control
                                    type = "email"
                                    autoComplete = "on"
                                    autoFocus = {false}
                                    name = "emailField"
                                    id = "EmailField"
                                    placeholder = "Enter your email"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {registerForm.email}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format: valid email address 
                                    with an {"'"}@{"'"} only !  
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    User Name:
                                </Form.Label>
                                <Form.Control
                                    type = "text"
                                    autoComplete = "on"
                                    autoFocus = {false}
                                    name = "userNameField"
                                    id = "UserNameField"
                                    pattern = "^[\p{L} .'-]+$"
                                    placeholder = "Your new user name"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {registerForm.userName}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format: characters only !  
                                </Form.Text>
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
                                // eslint-disable-next-line max-len
                                    pattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$"
                                    placeholder = "Your new password"
                                    required = {true}
                                    spellCheck = {false}
                                    minLength = {8}
                                    value = {registerForm.password}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format:<br/> 
                                    &emsp;&emsp;+&nbsp;
                                    Must be at least 8 characters long.<br/> 
                                    &emsp;&emsp;+&nbsp;
                                    Must contain at least 1 
                                    uppercase letter
                                    , 1 lowercase letter
                                    , and 1 number.<br/> 
                                </Form.Text>
                            </Form.Group>

                            <Button 
                                variant = "success"
                                type = "submit"
                                block = {true}
                            >
                                Register
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
