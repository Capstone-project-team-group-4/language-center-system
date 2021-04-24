/* eslint-disable eqeqeq */
// Import package members section:
import { AxiosError, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { CourseLevel } from "../../model/CourseLevel";
import { CourseType } from "../../model/CourseType";
import { ExceptionResponseBody } from "../../model/ExceptionResponseBody";
import { LoggedInUser } from "../../model/LoggedInUser";
import { Role } from "../../model/Role";

export class TypeGuard {

    // Variables declaration:
    private isValid: boolean | undefined;
    private testSample: unknown;
    
    public isAxiosResponse (
        serverResponse: unknown
    ): serverResponse is AxiosResponse<unknown> {
        this.isValid = false;
        if (serverResponse != undefined){
            if ((
                    serverResponse as AxiosResponse<unknown>
            ).status != undefined){
                this.isValid = true; 
            }
        }
        return this.isValid;
    }

    public isAxiosError (error: unknown): error is AxiosError<unknown> {
        this.isValid = false;
        if (error != undefined){
            if ((error as AxiosError<unknown>).isAxiosError === true){
                this.isValid = true; 
            }
        }
        return this.isValid;
    }

    public isLoggedInUser (
            unknownObject: unknown
    ): unknownObject is LoggedInUser {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as LoggedInUser).roleHolder != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isRoleArray (
            unknownObject: unknown
    ): unknownObject is Array<Role> {
        this.isValid = false;
        if (Array.isArray (unknownObject)){
            if (unknownObject.length > 0){
                this.testSample = unknownObject[0]; 
                if (this.isRole (this.testSample)){
                    this.isValid = true;
                }
            }
            else {
                this.isValid = true;
            }  
        }
        return this.isValid;
    }

    public isRole (unknownObject: unknown): unknownObject is Role {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as Role).roleID != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isCourseTypeArray (
            unknownObject: unknown
    ): unknownObject is Array<CourseType> {
        this.isValid = false;
        if (Array.isArray (unknownObject)){
            if (unknownObject.length > 0){
                this.testSample = unknownObject[0]; 
                if (this.isCourseType (this.testSample)){
                    this.isValid = true;
                }
            }
            else {
                this.isValid = true;
            }  
        }
        return this.isValid;
    }

    public isCourseType (unknownObject: unknown): unknownObject is CourseType {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as CourseType).typeID != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isCourseLevelArray (
            unknownObject: unknown
    ): unknownObject is Array<CourseLevel> {
        this.isValid = false;
        if (Array.isArray (unknownObject)){
            if (unknownObject.length > 0){
                this.testSample = unknownObject[0]; 
                if (this.isCourseLevel (this.testSample)){
                    this.isValid = true;
                }
            }
            else {
                this.isValid = true;
            }  
        }
        return this.isValid;
    }

    public isCourseLevel (
            unknownObject: unknown
    ): unknownObject is CourseLevel {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as CourseLevel).levelID != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isDataPage<T> (
            unknownObject: unknown
    ): unknownObject is DataPage<T> {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as DataPage<T>).pageDataHolder != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isExceptionResponseBody (
            unknownObject: unknown
    ): unknownObject is ExceptionResponseBody {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as ExceptionResponseBody).exceptionTitle != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }
}