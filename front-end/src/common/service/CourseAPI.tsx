// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { Course } from "../../model/Course";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class CourseAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined;
    private requestParameterHolder: URLSearchParams | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private typeGuardian: TypeGuard;
    private courseDataPage: DataPage<Course> | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async createNewCourse (course: Course): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/courses"
                    , course
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

    public async getAllCourse (
            pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Course>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/courses"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Course> (
                    this.serverResponse.data
            )){
                this.courseDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<Course>> (this.courseDataPage);
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

    public async updateCourse (updatedCourse: Course): Promise<void> {
        try {
            await this.axiosInstance.put<undefined> (
                    `/courses/${updatedCourse.courseID}`
                    , updatedCourse
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

    public async addAStudentToCourse (
            userID: number
            , courseID: number
    ): Promise<void> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("userID", userID.toString ());
        try {
            await this.axiosInstance.patch<undefined> (
                    `/courses/${courseID}:add-a-student`
                    , undefined
                    , {params: this.requestParameterHolder}
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
    
    public async removeAStudentFromCourse (
            userID: number
            , courseID: number
    ): Promise<void> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("userID", userID.toString ());
        try {
            await this.axiosInstance.patch<undefined> (
                    `/courses/${courseID}:remove-a-student`
                    , undefined
                    , {params: this.requestParameterHolder}
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

    public async deleteCourse (courseID: number): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/courses/${courseID}`
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

    public async getOneCourse (courseID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/courses/${courseID}`
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

}