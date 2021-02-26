// Import package members section:
import React, { 
    ChangeEvent
    , FormEvent
    , ReactElement
    , useState 
} from 'react';
import { NewUserAPI } from '../common/service/NewUserAPI';
import { 
    Button, Container, Form, Row 
} from 'react-bootstrap';
import './SignUpPage.css';
import { NewUser, NewUserIndexSignature } from '../model/NewUser';
import { TypeGuard } from '../common/service/TypeGuard';
import { DialogControl } from '../common/component/ModalDialog';

interface SignUpPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function SignUpPage (props: SignUpPageProps): ReactElement {

    // Variables declaration:
    let [newUser, setNewUser] = useState<NewUser> (new NewUser ());
    let updatedNewUser: NewUser | undefined;
    let inputField: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let newUserAPI: NewUserAPI;
    let typeGuardian: TypeGuard;

    newUserAPI = new NewUserAPI ();
    typeGuardian = new TypeGuard ();

    function handleUserChange (
            event: ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
    ): void {  
        updatedNewUser = new NewUser (newUser);
        inputField = event.target;
        updatedNewUser[
            inputField.name as keyof NewUserIndexSignature
        ] = inputField.value;
        setNewUser (updatedNewUser);
    }

    async function signUp (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault ();
        try {
            await newUserAPI.registerNewCreateAccountRequest (newUser); 
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
            id = "SignupPageContentContainer" 
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
                                <Form.Group className = "col-md-6">
                                    <Form.Label>
                                        First Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {true}
                                        name = "firstName"
                                        id = "firstName"
                                        pattern = "^[\p{L} .'-]+$"
                                        placeholder = "Your first name"
                                        required = {true}
                                        spellCheck = {false}
                                        value = {newUser.firstName}
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
                                <Form.Group className = "col-md-6">
                                    <Form.Label>
                                        Last Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {false}
                                        name = "lastName"
                                        id = "lastName"
                                        pattern = "^[\p{L} .'-]+$"
                                        placeholder = "Your last name"
                                        required = {true}
                                        spellCheck = {false}
                                        value = {newUser.lastName}
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
                                    name = "phoneNumber"
                                    id = "phoneNumber"
                                    pattern = "^(?:[0-9] ?){6,14}[0-9]$"
                                    placeholder = "Enter your phone number"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {newUser.phoneNumber}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format: valid phone numbers 
                                    containing numbers only !  
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
                                    name = "email"
                                    id = "email"
                                    placeholder = "Enter your email"
                                    required = {false}
                                    spellCheck = {false}
                                    value = {newUser.email}
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
                                    name = "userName"
                                    id = "userName"
                                    pattern = "^[\p{L} .'-]+$"
                                    placeholder = "Any user name"
                                    required = {true}
                                    spellCheck = {false}
                                    value = {newUser.userName}
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
                                    name = "password"
                                    id = "password"
                                    pattern = "^\S+$"
                                    placeholder = "Your new password"
                                    required = {true}
                                    spellCheck = {false}
                                    minLength = {8}
                                    value = {newUser.password}
                                    onChange = {
                                        (event) => {
                                            handleUserChange (event);
                                        }
                                    }
                                />
                                <Form.Text className = "text-muted">
                                    format: must be at least 8 characters long 
                                    without having any space character !  
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
