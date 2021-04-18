// Import package members section:
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { LoggedInUser } from "../../model/LoggedInUser";
import { User } from "../../model/User";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class UserAPI {

    // Variables declaration:
    private serverResponse: AxiosResponse<unknown> | undefined;
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet | undefined;
    private typeGuardian: TypeGuard;
    private loggedInUser: LoggedInUser | undefined;
    private axiosError: AxiosError<unknown> | undefined;
    private errorHandler: ErrorHandle;
    private requestParameterHolder: URLSearchParams | undefined;
    private userHolder: User[] | undefined;
    private userDataPage: DataPage<User> | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public listUsers (): Promise<AxiosResponse> {
        return this.axiosInstance.get<unknown>("http://localhost:8080/users");
    }

    public async getAllUserExcludingCurrentLoggedInUser (
            pageIndex: number
            , pageSize: number
    ): Promise<DataPage<User>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/users:excluding-logged-in-user"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<User> (this.serverResponse.data)){
                this.userDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<User>> (this.userDataPage);
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (apiError: unknown){
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError (apiError);
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async getAllStudentExcludingStudentInTheCourse (
            courseID: number
            , pageIndex: number
            , pageSize: number
    ): Promise<DataPage<User>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("courseID", courseID.toString ());
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/students:excluding-student-in-the-course"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<User> (
                    this.serverResponse.data
            )){
                this.userDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<User>> (this.userDataPage);
            } 
            else {
                throw new Error ("This server response is not valid !");
            }  
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async getAllStudentAreInTheCourse (
            courseID: number
            , pageIndex: number
            , pageSize: number
    ): Promise<DataPage<User>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    `/courses/${courseID}/students`
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<User> (
                    this.serverResponse.data
            )){
                this.userDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<User>> (this.userDataPage);
            } 
            else {
                throw new Error ("This server response is not valid !");
            }  
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async disableAnotherUser (
        userID: number
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                `/users/${userID}:disable`
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError (apiError);
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async enableUser (
            userID: number
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    `/users/${userID}:enable`
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError (apiError);
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async deleteAnotherUser (userID: number): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/users/${userID}`
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError (apiError);
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async getCurrentLoggedInUser (
            userName: string
            , password: string
    ): Promise<LoggedInUser> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/logged-in-user"
                    , {
                        auth: {
                            username: userName
                            , password: password
                        }
                    }
            );
            if (this.typeGuardian.isLoggedInUser (this.serverResponse.data)){
                this.loggedInUser = this.serverResponse.data;
                return Promise.resolve<LoggedInUser> (this.loggedInUser);
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (apiError: unknown){
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError (apiError);
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }

    public async registerUser (user: User): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.post (
                    "/users"
                    , user
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }

    public async deleteUser (userID: string): Promise<AxiosResponse> {
        try {
            this.serverResponse = await this.axiosInstance.delete (
                    `/users/${userID}`
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }

    public async update (user: User, userID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.put (
                    `/editInfo/${userID}`
                    , user
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }

    public async displayStudent (userID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/getStudent/${userID}`
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }

    public async displayStudentbyID (userID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.get (
                    `/getStudent/${userID}`
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }

    public async viewStudent (userID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/users`
            );
            this.typeGuardian = new TypeGuard();
            if (this.typeGuardian.isAxiosResponse(this.serverResponse)) {
                return this.serverResponse;
            }
            else {
                throw new Error("This server response is not valid !");
            }
        }
        catch (error) {
            console.error(error.toJSON());
            return Promise.reject<AxiosResponse>(error);
        }
    }

    public updateStudents (
        user: User, userID: number
    ): Promise<AxiosResponse<unknown>> {
        try {
            return axios.put(`http://localhost:8080/editInfo/${userID}`, user);
        }
        catch (error) {
            console.error(error.toJSON());
            return Promise.reject<AxiosResponse>(error);
        }
    }

    public async displayTeacher (userID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/getUsers/${userID}`
            );
            this.typeGuardian = new TypeGuard();
            if (this.typeGuardian.isAxiosResponse(this.serverResponse)) {
                return this.serverResponse;
            }
            else {
                throw new Error("This server response is not valid !");
            }
        }
        catch (error) {
            console.error(error.toJSON());
            return Promise.reject<AxiosResponse>(error);
        }
    }

    public updateTeacher (
        user: User, userID: number
    ): Promise<AxiosResponse<unknown>> {
        try {
            return axios.put(`http://localhost:8080/editInfo/${userID}`, user);
        }
        catch (error) {
            console.error(error.toJSON());
            return Promise.reject<AxiosResponse>(error);
        }
    }


}