import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { Lesson } from "../../model/Lesson";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class LessonAPI{
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined;
    private requestParameterHolder: URLSearchParams | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private typeGuardian: TypeGuard;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async getAllLessonByCourse (courseID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/lesson?courseID=${courseID}`
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

    public async getOne (lessonID: number): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        try {
            this.serverResponse = await this.axiosInstance.get(
                `/id?lessonID=${lessonID}`
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