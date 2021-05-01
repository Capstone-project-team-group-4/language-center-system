/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Lesson;
import com.PhanLam.backend.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 *
 * @author This MC
 */
@RestController
public class LessonController {

    // Variables declaration:
    private LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping ("/lessons")
    @ResponseStatus (HttpStatus.CREATED)
    public void createNewLesson (
            @Valid @RequestBody Lesson lesson
    ){
        lessonService.createLessonInCourse(lesson);
    }

    @GetMapping ("/lessons")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Lesson> getAllLesson (
            @RequestParam int pageIndex
            , @RequestParam int pageSize
            , @RequestParam int courseId
    ){
        DataPage<Lesson> lessonDataPage;

        lessonDataPage = lessonService.getAllLesson(pageIndex, pageSize,courseId);
        return lessonDataPage;
    }

    @PutMapping ("/lessons/{lessonID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void updateLesson (
            @PathVariable int lessonID
                , @Valid @RequestBody Lesson updatedLesson
    ){
        lessonService.updateLesson(lessonID, updatedLesson);
    }

    @DeleteMapping ("/lessons/{lessonID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deleteLesson (@PathVariable int lessonID){
        lessonService.deleteLessonByID(lessonID);
    }

    @GetMapping("/lesson")
    @ResponseStatus(HttpStatus.OK)
    public List<Lesson> getLessonByCourseID(@RequestParam("courseID") Integer courseID){
        return lessonService.getAllLessonByCourseID(courseID);
    }

//    @GetMapping("/lessons")
//    @ResponseStatus(HttpStatus.OK)
//    public List<Lesson> getAllLesson(){
//        return lessonService.getAllLesson();
//    }

    @GetMapping("/id")
    @ResponseStatus(HttpStatus.OK)
    public Lesson getOne(@RequestParam("lessonID") Integer lessonID){
        return lessonService.getOne(lessonID);
    }
}
