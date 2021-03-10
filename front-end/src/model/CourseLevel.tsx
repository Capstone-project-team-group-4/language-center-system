// Import package members section:
import { CourseType } from "./CourseType";

export class CourseLevel {

    // Variables declaration:
    public levelID: number;
    public courseType: CourseType;
    public levelName: string; 

    public constructor (){
        this.levelID = 0;
        this.courseType = new CourseType ();
        this.levelName = "";
    }
}