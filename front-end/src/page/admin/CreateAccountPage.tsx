// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { NewUserAPI } from "../../common/service/NewUserAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { NewUser } from "../../model/NewUser";

interface CreateAccountPageProps {
    setShowDialog (showDialog: boolean): void;
    setDialogTitle (dialogTitle: string): void;
    setDialogBody (dialogBody: string): void;
    setDialogType (dialogType: string): void;
    handleCloseDialog (): void;
    modalDialog: ReactElement;
}

export function CreateAccountPage (
    props: CreateAccountPageProps
): ReactElement {

    // Variables declaration:
    let [newUserHolder, setNewUserHolder] = useState<NewUser[]> ([]);
    let newUserAPI: NewUserAPI;
    let typeGuardian: TypeGuard;

    newUserAPI = new NewUserAPI ();
    typeGuardian = new TypeGuard ();
    
    async function getAllCreateAccountRequests (): Promise<void> {
        try {
            setNewUserHolder (await newUserAPI.getAllNewUser ());
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.setDialogTitle (`${apiError.code}: ${apiError.name}`);
                }
                else {
                    props.setDialogTitle (apiError.name);
                }
                props.setDialogBody (apiError.message);
                props.setDialogType ("error");
                props.setShowDialog (true);
            }
            else {
                throw new Error ("This api error is not valid !");
            }
        }
    }

    useEffect (
        function fetchTableData (): void {
            getAllCreateAccountRequests ();
        }
    , []
    );

    return (
        <Container fluid = {true}>
            <main>
                <Container>
                    <Row className = "bg-white">
                        <Col>
                            <h1>
                                Create Account Requests
                            </h1>
                            <hr/>
                            <Table responsive = "md">

                            </Table>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}