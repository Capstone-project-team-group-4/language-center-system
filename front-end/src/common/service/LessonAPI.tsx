// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { Lesson } from "../../model/Lesson";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class LessonAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined;
    private requestParameterHolder: URLSearchParams | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private typeGuardian: TypeGuard;
    private lessonDataPage: DataPage<Lesson> | undefined;

    public constructor () {
        this.axiosInstanceGetter = new AxiosInstanceGet();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
        this.errorHandler = new ErrorHandle();
        this.typeGuardian = new TypeGuard();
    }

    public async createNewLesson (lesson: Lesson): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/lessons"
                    , lesson
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

    public async getAllLesson (
        pageIndex: number
        , pageSize: number
        , courseId: number
    ): Promise<DataPage<Lesson>> {
        this.requestParameterHolder = new URLSearchParams();
        this.requestParameterHolder.set("pageIndex", pageIndex.toString());
        this.requestParameterHolder.set("pageSize", pageSize.toString());
        this.requestParameterHolder.set("courseId", courseId.toString());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown>(
                "/lessons"
                , { params: this.requestParameterHolder }
            );
            if (this.typeGuardian.isDataPage<Lesson>(
                this.serverResponse.data
            )) {
                this.lessonDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<Lesson>>(this.lessonDataPage);
            }
            else {
                throw new Error("This server response is not valid !");
            }
        }
        catch (apiError: unknown) {
            try {
                this.axiosError
                    = await this.errorHandler.handleApiError(apiError);
                return Promise.reject(this.axiosError);
            }
            catch (apiError2: unknown) {
                return Promise.reject(apiError2);
            }
        }
    }

    public async getAllLessonByCourse (
        courseID: number
        ): Promise<AxiosResponse> {
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

    public async updateLesson (updatedLesson: Lesson): Promise<void> {
        try {
            await this.axiosInstance.put<undefined> (
                    `/lessons/${updatedLesson.lessonID}`
                    , updatedLesson
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

    public async deleteLesson (lessonID: number): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/lessons/${lessonID}`
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
