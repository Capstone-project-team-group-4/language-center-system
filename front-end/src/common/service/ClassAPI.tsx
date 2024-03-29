// Import package members section:
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { LoggedInUser } from "../../model/LoggedInUser";
import { SpareTime } from "../../model/SpareTime";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class ClassAPI {
  // Variables declaration:
  private serverResponse: AxiosResponse<unknown> | undefined;
  private axiosInstance: AxiosInstance;
  private axiosInstanceGetter: AxiosInstanceGet | undefined;
  private typeGuardian: TypeGuard;
  private loggedInUser: LoggedInUser | undefined;
  private axiosError: AxiosError<unknown> | undefined;
  private errorHandler: ErrorHandle;
  private requestParameterHolder: URLSearchParams | undefined;
  private spareTimeHolder: SpareTime[] | undefined;
  private spareTimeDataPage: DataPage<SpareTime> | undefined;

  public constructor() {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    this.errorHandler = new ErrorHandle();
    this.typeGuardian = new TypeGuard();
  }

  public async getListClass(
    pageNumber: number,
    pageSize: number,
    searchParam?: string,
    userID?: number,
    role?: string
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    this.requestParameterHolder.set("pageNumber", pageNumber.toString());
    this.requestParameterHolder.set("pageSize", pageSize.toString());
    if (searchParam) {
      this.requestParameterHolder.set("searchParam", searchParam);
    }
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        "/class-sessions",
        { params: { pageNumber, pageSize, searchParam, userID, role } }
      );
      if (serverResponse?.data) {
        if (serverResponse?.data)
          console.log("serverResponse?.data", serverResponse?.data);

        return Promise.resolve<any>(serverResponse?.data);
      } else {
        // throw new Error("This server response is not valid !");
      }
    } catch (apiError: unknown) {
      try {
        this.axiosError = await this.errorHandler.handleApiError(apiError);
        return Promise.reject(this.axiosError);
      } catch (apiError2: unknown) {
        return Promise.reject(apiError2);
      }
    }
  }

  public async cancelClass(classSessionID: number): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.patch(
        `/class-sessions/${classSessionID}:cancel`
      );
      this.typeGuardian = new TypeGuard();
      if (this.typeGuardian.isAxiosResponse(this.serverResponse)) {
        return this.serverResponse;
      } else {
        throw new Error("This server response is not valid !");
      }
    } catch (error) {
      console.error(error.toJSON());
      return Promise.reject<AxiosResponse>(error);
    }
  }

  public async deleteClass(classSessionID: number): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.delete(
        `/class-sessions/${classSessionID}`
      );
      this.typeGuardian = new TypeGuard();
      if (this.typeGuardian.isAxiosResponse(this.serverResponse)) {
        return this.serverResponse;
      } else {
        throw new Error("This server response is not valid !");
      }
    } catch (error) {
      console.error(error.toJSON());
      return Promise.reject<AxiosResponse>(error);
    }
  }

  public async getAllOFClass(
    pageIndex: number,
    pageSize: number,
    classID: number
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    this.requestParameterHolder.set("pageIndex", pageIndex.toString());
    this.requestParameterHolder.set("pageSize", pageSize.toString());
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        `/classes/${classID}/students`,
        { params: { pageIndex, pageSize } }
      );
      if (serverResponse?.data) {
        if (serverResponse?.data)
          console.log("serverResponse?.data", serverResponse?.data);

        return Promise.resolve<any>(serverResponse?.data);
      } else {
        // throw new Error("This server response is not valid !");
      }
    } catch (apiError: unknown) {
      try {
        this.axiosError = await this.errorHandler.handleApiError(apiError);
        return Promise.reject(this.axiosError);
      } catch (apiError2: unknown) {
        return Promise.reject(apiError2);
      }
    }
  }
  public async createComment(
    classID: number,
    userID: number,
    content: string
  ): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.post(`/comments`, {
        classID,
        userID,
        content,
      });
      this.typeGuardian = new TypeGuard();
      if (this.typeGuardian.isAxiosResponse(this.serverResponse)) {
        return this.serverResponse;
      } else {
        throw new Error("This server response is not valid !");
      }
    } catch (error) {
      console.error(error.toJSON());
      return Promise.reject<AxiosResponse>(error);
    }
  }
}
