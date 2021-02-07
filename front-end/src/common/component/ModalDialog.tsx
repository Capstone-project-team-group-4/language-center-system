// Import package members section:
import React, { ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

interface DialogFooterProps {
    dialogType: string;
    handleCloseDialog (): void;
}

function DialogFooter (props: DialogFooterProps): ReactElement {
    if (props.dialogType === "error"){
        return (
            <Button variant = "danger" onClick = {props.handleCloseDialog}>
                Ok
            </Button>
        );
    }
    else if (props.dialogType === "sign-up-succeeded"){
        return (
            <Button 
                variant = "success" 
                onClick = {props.handleCloseDialog} 
                as = {Link} 
                to = "/"
            >
                Back to home page
            </Button>
        );
    }
    else {
        throw new Error ("Dialog type not found !");
    }
}

interface ModalDialogProps extends DialogFooterProps {
    showDialog: boolean;
    dialogTitle: string;
    dialogBody: string;
}

export function ModalDialog (props: ModalDialogProps): ReactElement {
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
            <Modal.Footer>
                <DialogFooter 
                    dialogType = {props.dialogType} 
                    handleCloseDialog = {props.handleCloseDialog}
                />
            </Modal.Footer>
        </Modal>
    );
}