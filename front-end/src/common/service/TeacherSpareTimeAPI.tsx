// Import package members section:
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { LoggedInUser } from "../../model/LoggedInUser";
import { SpareTime } from "../../model/SpareTime";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class TeacherSpareTimeAPI {
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

  public async getListTeacherSpareTime(
    pageNumber: number,
    pageSize: number
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    this.requestParameterHolder.set("pageNumber", pageNumber.toString());
    this.requestParameterHolder.set("pageSize", pageSize.toString());
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        "/spare-time-registers",
        { params: { pageNumber, pageSize } }
      );
      if (this.typeGuardian.isDataPage<SpareTime>(serverResponse?.data)) {
        this.spareTimeDataPage = serverResponse?.data;
        if (this.spareTimeDataPage)
          return Promise.resolve<DataPage<SpareTime>>(this.spareTimeDataPage);
      } else {
        throw new Error("This server response is not valid !");
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

  public async deleteSpareTime(spareTimeID: number): Promise<void> {
    try {
      await this.axiosInstance.delete<undefined>(
        `/spare-time-registers/${spareTimeID}`
      );
      return Promise.resolve<undefined>(undefined);
    } catch (apiError: unknown) {
      try {
        this.axiosError = await this.errorHandler.handleApiError(apiError);
        return Promise.reject(this.axiosError);
      } catch (apiError2: unknown) {
        return Promise.reject(apiError2);
      }
    }
  }

  public async createSpareTime(
    listCourseTypeId: any[],
    listSlotId: any[]
  ): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.post(
        "/spare-time-registers",
        { listCourseTypeId, listSlotId }
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

  public async editSpareTime(
    spareTimeRegisterId: number,
    listCourseTypeId: any[],
    listSlotId: any[]
  ): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.put(
        "/spare-time-registers",
        {spareTimeRegisterId, listCourseTypeId, listSlotId }
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

  public async rejectSpareTime(
    spareTimeID: number
  ): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.patch(
        `/spare-time-registers/${spareTimeID}:reject`,
        
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

  public async getListCourseForClass(
    pageIndex: number,
    pageSize: number,
    spareTimeId: number
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    this.requestParameterHolder.set("pageIndex", pageIndex.toString());
    this.requestParameterHolder.set("pageSize", pageSize.toString());
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        "/courses-for-create-class",
        { params: { pageIndex, pageSize, spareTimeId } }
      );
      if (this.typeGuardian.isDataPage<any>(serverResponse?.data)) {
        this.spareTimeDataPage = serverResponse?.data;
        if (this.spareTimeDataPage)
          return Promise.resolve<DataPage<any>>(this.spareTimeDataPage);
      } else {
        throw new Error("This server response is not valid !");
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

  public async getListSlotForClass(
    spareTimeId: number
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        "/slots-for-create-class",
        { params: { spareTimeId } }
      );

      if (serverResponse?.data) {
        if (serverResponse?.data)
          return Promise.resolve<any>(serverResponse?.data);
      } else {
        // throw new Error("This server response is not valid !");
      }
    } catch (apiError: unknown) {
      // try {
      //   this.axiosError = await this.errorHandler.handleApiError(apiError);
      //   // return Promise.reject(this.axiosError);
      // } catch (apiError2: unknown) {
      //   return Promise.reject(apiError2);
      // }
    }
  }

  public async approveClass(
    slotID: any,
    courseID: any,
    spareTimeRegisterID: number
  ): Promise<AxiosResponse> {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    try {
      this.serverResponse = await this.axiosInstance.post(
        "/class-sessions",
        { slotID, courseID, spareTimeRegisterID }
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
}
