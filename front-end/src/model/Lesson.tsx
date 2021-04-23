export class Lesson {

    // Variables declaration:
    public courseID: number;
    public lessonID: number;
    public lessonName: string;
    public description: string;
    public contentURI: string;
    public type: string;
    public duration: number;
    public dateCreated: Date;
    public lastModified: Date;
    
    public constructor ();

    public constructor (lesson: Lesson);

    public constructor (lesson?: Lesson){
        if (typeof lesson !== "undefined"){
            this.courseID = lesson.courseID;
            this.lessonID = lesson.lessonID;
            this.lessonName = lesson.lessonName;
            this.description = lesson.description;
            this.contentURI = lesson.contentURI;
            this.type = lesson.type;
            this.duration = lesson.duration;
            this.dateCreated = lesson.dateCreated;
            this.lastModified = lesson.lastModified;
        }
        else {
            this.courseID = 0;
            this.lessonID = 0;
            this.lessonName = "";
            this.description = "";
            this.contentURI = "";
            this.type = "";
            this.duration = 0;
            this.dateCreated = new Date (0);
            this.lastModified = new Date (0);
        }
    } 
}