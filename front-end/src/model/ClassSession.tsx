import { Course } from "./Course";
import { Slot } from "./Slot";
import { User } from "./User";

export class ClassSession {

    // Variables declaration:
    public classID: number;
    public teacherID: User;
    public courseID: Course;
    public status: number;
    public slot: Slot;
    public spareTimeRegisterID: number;
    public lastModified: Date;

    public constructor (){
        this.classID = 0;
        this.teacherID = new User ();
        this.courseID = new Course ();
        this.status = 0;
        this.slot = new Slot ();
        this.spareTimeRegisterID = 0;
        this.lastModified = new Date (0);
    }
}