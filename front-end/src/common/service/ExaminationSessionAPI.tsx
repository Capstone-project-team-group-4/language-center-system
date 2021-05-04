// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { QuestionOption } from "../../model/QuestionOption";
import { Quiz } from "../../model/Quiz";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class ExaminationSessionAPI {

    // Variables declaration:
    private serverResponse: AxiosResponse<unknown> | undefined;
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet | undefined;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined;
    private typeGuardian: TypeGuard;
    private quiz: Quiz | undefined;
    private isFirstQuestion: boolean | undefined;
    private isLastQuestion: boolean | undefined;
    private totalNumberOfQuestion: number | undefined;
    private timeLimitInSeconds: number | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async startExamSession (examID: number): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    `/examination-sessions/${examID}:start`
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

    public async getCurrentExamQuiz (): Promise<Quiz> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examination-sessions/current/quiz"
            );
            if (this.typeGuardian.isQuiz (this.serverResponse.data)){
                this.quiz = this.serverResponse.data;
                return Promise.resolve<Quiz> (this.quiz);
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

    public async goToNextQuestion (
            quizAnswer: QuestionOption[]
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    "/examination-sessions/next-question:goTo"
                    , quizAnswer
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

    public async goToPreviousQuestion (
            quizAnswer: QuestionOption[]
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    "/examination-sessions/previous-question:goTo"
                    , quizAnswer
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

    public async currentQuestionIsFirstQuestion (): Promise<boolean> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examination-sessions/current/quiz:isFirstQuestion"
            );
            if (typeof this.serverResponse.data === "boolean"){
                this.isFirstQuestion = this.serverResponse.data;
                return Promise.resolve<boolean> (this.isFirstQuestion);
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

    public async currentQuestionIsLastQuestion (): Promise<boolean> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examination-sessions/current/quiz:isLastQuestion"
            );
            if (typeof this.serverResponse.data === "boolean"){
                this.isLastQuestion = this.serverResponse.data;
                return Promise.resolve<boolean> (this.isLastQuestion);
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

    public async getExamTotalNumberOfQuestion (): Promise<number> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examination-sessions/current/total-number-of-question"
            );
            if (typeof this.serverResponse.data === "number"){
                this.totalNumberOfQuestion = this.serverResponse.data;
                return Promise.resolve<number> (this.totalNumberOfQuestion);
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

    public async getExamTimeLimitInSeconds (): Promise<number> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examination-sessions/current/time-limit-in-seconds"
            );
            if (typeof this.serverResponse.data === "number"){
                this.timeLimitInSeconds = this.serverResponse.data;
                return Promise.resolve<number> (this.timeLimitInSeconds);
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

    public async submitExam (
            quizAnswer: QuestionOption[]
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    "/examination-sessions/current:submit"
                    , quizAnswer
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
}