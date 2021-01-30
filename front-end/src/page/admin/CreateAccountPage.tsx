import React, { 
    ChangeEvent
    , FormEvent
    , ReactElement
    , useState 
} from 'react';
import { User, UserIndexSignature } from '../../model/User';
import { UserAPI } from '../../common/service/UserAPI';
import { 
    Button, Col, Container, Form, Row 
} from 'react-bootstrap';

export function SignUpPage (): ReactElement {
    let [user, setUser] = useState<User> (new User ());
    let updatedUser: User | undefined;
    let inputField: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let userAPI: UserAPI | undefined;
    // let userID: string;

    function handleUserChange (
        event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {  
        updatedUser = user;
        inputField = event.target;
        updatedUser[
            inputField.name as keyof UserIndexSignature
        ] = inputField.value;
        setUser (updatedUser);
    } 
    
    function signUp (event: FormEvent<HTMLFormElement>){
        event.preventDefault ();
        userAPI = new UserAPI ();
        userAPI.registerUser (user);  
    }

    return (
        <Container fluid = {true} id = "PageContentContainer"> 
            <Container fluid = {true} id = "PageHeaderContainer">
                <header>
                </header>
                <nav>
                    
                </nav>
            </Container>
            <main>
                <Container id = "PageBodyContainer">
                    <Row>
                        <Col>
                            <Form
                                noValidate = {true}
                                onSubmit = {(event) => {
                                    signUp (event);
                                }}
                            >
                                <Form.Group>
                                    <Form.Label>
                                        User Name:
                                    </Form.Label>
                                    <Form.Control
                                        type = "text"
                                        autoComplete = "on"
                                        autoFocus = {true}
                                        name = "userName"
                                        id = "userName"
                                        pattern = "^[\\p{L} .'-]+$"
                                        placeholder = "Any user name"
                                        required = {true}
                                        spellCheck = {false}
                                        // value = {user.userName}
                                        onChange = {handleUserChange}
                                    />
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
                                        required = {true}
                                        spellCheck = {false}
                                        onChange = {handleUserChange}
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
                                        pattern = "^\\S+$"
                                        placeholder = "Your new password"
                                        required = {true}
                                        spellCheck = {false}
                                        onChange = {handleUserChange}
                                    />
                                </Form.Group>
                                <Button 
                                    variant = "success"
                                    type = "submit"
                                    block = {true}
                                >
                                    Register
                                </Button>
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