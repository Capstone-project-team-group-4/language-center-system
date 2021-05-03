import { CourseType } from "./CourseType";
import { SlotList } from "./SlotList";
import { User } from "./User";

export class SpareTime {
  // Variables declaration:
  public userID: User;
  public spareTimeID: number;
  public status: number;
  public courseTypeList: CourseType[];
  public slotList: SlotList[];

  public constructor();

  public constructor(spareTime: SpareTime);

  public constructor(spareTime?: SpareTime) {
    if (typeof spareTime !== "undefined") {
      this.userID = spareTime.userID;
      this.spareTimeID = spareTime.spareTimeID;
      this.courseTypeList = spareTime.courseTypeList;
      this.status = spareTime.status;
      this.slotList = spareTime.slotList;
    } else {
      this.userID = new User();
      this.spareTimeID = 0;
      this.courseTypeList = [];
      this.status = 0;
      this.slotList = [];
    }
  }
}
