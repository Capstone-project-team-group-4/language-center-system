import React, { ReactElement, useState, useEffect } from 'react';
// import { Lesson } from '../model/Lesson';
import './ManageLessonPage.css';

export function ManageLessonPage () : ReactElement {
    // let [lesson, setLesson] = useState<Lesson[]>([]);
    let [lesson, setLesson] = useState(
        [
            {
                lessonID: 1,
                lessonName: "Unit1",
                lessonType: "Voca",
                duration: 1
            },
            {
                lessonID: 2,
                lessonName: "Unit2",
                lessonType: "Grammar",
                duration: 2
            },
            {
                lessonID: 3,
                lessonName: "Unit3",
                lessonType: "Speaking",
                duration: 2
            },
            {
                lessonID: 4,
                lessonName: "Unit4",
                lessonType: "Writing",
                duration: 3
            }
        ]
    );
    // let userAPI: LessonAPI = new LessonAPI();
    useEffect(() => {
        // userAPI.listLessons().then(
        //     (res) => {
        //         console.log(res);
        //         setUser(res.data as Lesson[]);
        //     }
        // );
    }, []);

    function handleDeleteLesson (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) : void {
        button = event.target as HTMLButtonElement;
    }

    // function openConfirmDeleteDialog (
    //     event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // ) : void {
    //     setLessonID(Number(button.value));
    //     setPendingAction("Delete user");
    //     props.di
    // }

    return (
        <div className="container">
            <div>
                <h1>Bài học của khóa học A</h1>
                <hr />
            </div>
            <div className="text-center">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lesson Name</th>
                            <th>Lesson Type</th>
                            <th>Duration &nbsp; (minutes)</th>
                            <th>Actions</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {
                            lesson.map((item, index) => <tr key={index}>
                                <td>{item["lessonID"]}</td>
                                <td>{item["lessonName"]}</td>
                                <td>{item["lessonType"]}</td>
                                <td>{item["duration"]}</td>
                                <td id="action">
                                    <button type="button"
                                            className="btn btn-info act-btn">
                                                <span className=
                                                    "fa fa-eye mr-5">
                                                </span>
                                                Xem
                                            </button>
                                    <button type="button"
                                            className="btn btn-warning act-btn">
                                                <span className=
                                                    "fa fa-pencil mr-5">
                                                </span>
                                                Sửa
                                            </button>
                                    <button type="button"
                                            className="btn btn-danger 
                                            act-btn"
                                            // onClick= {
                                            //     (event) => {
                                            //         handle
                                            // DeleteLesson(event);
                                            //     }
                                            // }
                                            >
                                                <span className=
                                                    "fa fa-trash mr-5">
                                                </span>
                                                Xóa    
                                            </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
