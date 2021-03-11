import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
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

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    // public async deleteLesson (lessonID: number): Promise<void> {
    //     try {
    //         await this.axiosInstance.delete<undefined> (
    //             `/courses/${courseID}/lessons/${lessonID}`
    //         );
    //         return Promise.resolve<undefined> (undefined);
    //     }
    //     catch (apiError: unknown) {
    //         try {
    //             this.axiosError
    //                 = await this.errorHandler.handleApiError (apiError);
    //                 return Promise.reject (this.axiosError);
    //         }
    //         catch (apiError2: unknown) {
    //             return Promise.reject();
    //         }
    //     }
    // }
}