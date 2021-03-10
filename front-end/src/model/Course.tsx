// Import package members section:
import { CourseLevel } from "./CourseLevel";
import { CourseType } from "./CourseType";

export class Course {

    // Variables declaration:
    public courseID: number;
    public courseName: string;
    public description: string;
    public courseType: CourseType;  
    public courseLevel: CourseLevel;
    public tuitionFee: number;
    public dateCreated: Date;
    public lastModified: Date;
    
    public constructor ();

    public constructor (course: Course);

    public constructor (course?: Course){
        if (typeof course !== "undefined"){
            this.courseID = course.courseID;
            this.courseName = course.courseName;
            this.description = course.description;
            this.courseType = course.courseType;
            this.courseLevel = course.courseLevel;
            this.tuitionFee = course.tuitionFee;
            this.dateCreated = course.dateCreated;
            this.lastModified = course.lastModified;
        }
        else {
            this.courseID = 0;
            this.courseName = "";
            this.description = "";
            this.courseType = new CourseType ();
            this.courseLevel = new CourseLevel ();
            this.tuitionFee = 0;
            this.dateCreated = new Date (0);
            this.lastModified = new Date (0);
        }
    } 
}