// Import package members section:
import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { LoggedInUser } from "../../model/LoggedInUser";
import { Role } from "../../model/Role";
import { Location } from "../../../node_modules/@types/history";
import { DialogControl } from "./ModalDialog";

export class SecurityContext {
    public isAuthenticated: boolean;
    public loggedInUser: LoggedInUser;
    public acceptableRoleNameHolder: string[];

    public constructor (
            isAuthenticated: boolean
            , loggedInUser: LoggedInUser
            , acceptableRoleNameHolder: string[]
    ){
        this.isAuthenticated = isAuthenticated;
        this.loggedInUser = loggedInUser;
        this.acceptableRoleNameHolder = acceptableRoleNameHolder;
    }
}

export class LocationState {
    public from: Location<unknown>; 

    public constructor (from: Location<unknown>){
        this.from = from;
    }
}

class RedirectLocation {
    public pathname: string;
    public state: LocationState;
    
    public constructor (pathname: string, state: LocationState){
        this.pathname = pathname;
        this.state = state;
    }
}

interface ProtectedRouteProps {
    path: string;
    securityContext: SecurityContext;
    dialogController: DialogControl;
}

export function ProtectedRoute (
        props: PropsWithChildren<ProtectedRouteProps>
): ReactElement {

    // Variables declaration:
    let currentLocation: Location<unknown>;  
    let destinationPath: string | undefined;
    let locationState: LocationState | undefined;
    let redirectLocation: RedirectLocation;
    let acceptableRoleNameHolder: string[] | undefined;
    let loggedInUser: LoggedInUser | undefined;
    let roleHolder: Role[] | undefined;
    let acceptableRoleName: string | undefined;
    let i: number | undefined;
    let k: number | undefined;
    let role: Role | undefined;
    let roleName: string | undefined;
    let isAuthorized: boolean | undefined;

    currentLocation = useLocation ();
    return (
        <Route 
            path = {props.path}
            render = {
                (): ReactNode => {
                    if (props.securityContext.isAuthenticated === false){
                        destinationPath = "/log-in-page";
                        locationState = new LocationState (currentLocation);
                        redirectLocation = new RedirectLocation (
                                destinationPath
                                , locationState
                        );
                        props.dialogController.setDialogTitle (
                                "Authentication required !"
                        );
                        props.dialogController.setDialogBody (
                                "Please login first."
                        );
                        props.dialogController.setDialogType ("error");
                        props.dialogController.setShowDialog (true);
                        return (
                            <Redirect to = {redirectLocation}/>
                        );   
                    }
                    else {
                        acceptableRoleNameHolder 
                            = props.securityContext.acceptableRoleNameHolder;
                        loggedInUser = props.securityContext.loggedInUser;
                        roleHolder = loggedInUser.roleHolder;
                        isAuthorized = false;
                        authorizationLoop:
                        for (i = 0; i < acceptableRoleNameHolder.length; i++){
                            acceptableRoleName = acceptableRoleNameHolder[i];
                            for (k = 0; k < roleHolder.length; k++){
                                role = roleHolder[k];
                                roleName = role.roleName;
                                if (roleName === acceptableRoleName){
                                    isAuthorized = true;
                                    break authorizationLoop;
                                }
                            }
                        }
                        if (isAuthorized === true){
                            return props.children;
                        }
                        else {
                            props.dialogController.setDialogTitle (
                                    "Unauthorized !"
                            );
                            props.dialogController.setDialogBody (
                                    `You don't have enough permissions 
                                    to access this page.`
                            );
                            props.dialogController.setDialogType ("error");
                            props.dialogController.setShowDialog (true);
                            return (
                                <Redirect to = "/select-role-page"/>
                            );
                        }
                    }
                }
            }
        />
    );
}