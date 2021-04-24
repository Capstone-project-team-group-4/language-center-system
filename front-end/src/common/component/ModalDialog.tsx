// Import package members section:
import React, { ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DialogControl {
    public setShowDialog: (showDialog: boolean) => void; 
    public setDialogTitle: (dialogTitle: string) => void;
    public setDialogBody: (dialogBody: string) => void;
    public setDialogType: (dialogType: string) => void;
    public setDialogIsConfirmed: (dialogIsConfirmed: boolean) => void;
    public dialogIsConfirmed: boolean;

    constructor (
            setShowDialog: (showDialog: boolean) => void
            , setDialogTitle: (dialogTitle: string) => void
            , setDialogBody: (dialogBody: string) => void
            , setDialogType: (dialogType: string) => void
            , setDialogIsConfirmed: (dialogIsConfirmed: boolean) => void
            , dialogIsConfirmed: boolean 
    ){
        this.setShowDialog = setShowDialog;
        this.setDialogTitle = setDialogTitle;
        this.setDialogBody = setDialogBody;
        this.setDialogType = setDialogType;
        this.setDialogIsConfirmed = setDialogIsConfirmed;
        this.dialogIsConfirmed = dialogIsConfirmed;
    }
} 

interface ModalDialogProps {
    showDialog: boolean;
    dialogTitle: string;
    dialogBody: string;
    dialogType: string;
    handleCloseDialog (): void;
    handleConfirmDialog (): void;
}

export function ModalDialog (props: ModalDialogProps): ReactElement {

    // Variables declaration:
    let dialogFooter: ReactElement;

    switch (props.dialogType){
        default:
            dialogFooter =
                <Modal.Footer>  
                </Modal.Footer>;
            break;

        case "error":
            dialogFooter =
                <Modal.Footer>
                    <Button 
                        variant = "danger" 
                        onClick = {props.handleCloseDialog}
                    >
                        Ok
                    </Button>    
                </Modal.Footer>;
            break;

        case "sign-up-succeeded":
            dialogFooter =
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        onClick = {props.handleCloseDialog} 
                        as = {Link} 
                        to = "/"
                    >
                        Back to home page
                    </Button>    
                </Modal.Footer>;
            break;
            
        case "confirm":
            dialogFooter =
                <Modal.Footer>
                    <Button 
                        variant = "primary" 
                        onClick = {props.handleConfirmDialog}
                    >
                        Yes
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {props.handleCloseDialog}
                    >
                        Cancel
                    </Button>   
                </Modal.Footer>;
            break;
            
        case "inform":
            dialogFooter =
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        onClick = {props.handleCloseDialog}
                    >
                        Ok
                    </Button>    
                </Modal.Footer>;
            break;
    }
    return (
        <Modal
            show = {props.showDialog}
            backdrop = "static"
            keyboard = {false}
        >
            <Modal.Header>
                <Modal.Title>{props.dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.dialogBody}</Modal.Body>
            {dialogFooter}
        </Modal>
    );
}