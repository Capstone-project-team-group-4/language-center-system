import { ClassSession } from "./ClassSession";
import { Lesson } from "./Lesson";

export class HomeWork {

    // Variables declaration:
    public homeWorkID: number;
    public requirement: string;
    public deadline: Date;
    public classSession: ClassSession;
    public lesson: Lesson;

    public constructor (){
        this.homeWorkID = 0;
        this.requirement = "";
        this.deadline = new Date (0);
        this.classSession = new ClassSession ();
        this.lesson = new Lesson (); 
    }
}