/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

import com.PhanLam.backend.dal.repository_interface.LessonRepository;
import com.PhanLam.backend.model.Lesson;
import com.PhanLam.backend.service.LessonService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author roboc
 */
@RestController
public class LessonController {
    @Autowired
    private LessonService lessonService;
    
    @Autowired
    private LessonRepository lessonRepository;
    
    @GetMapping("/lesson")
    @ResponseStatus(HttpStatus.OK)
    public List<Lesson> getLessonByCourseID(@RequestParam("courseID") Integer courseID){
        return lessonService.getAllLessonByCourseID(courseID);
    }
    
    @GetMapping("/lessons")
    @ResponseStatus(HttpStatus.OK)
    public List<Lesson> getAllLesson(){
        return lessonRepository.findAll();
    }
    
    @GetMapping("/id")
    @ResponseStatus(HttpStatus.OK)
    public Lesson getOne(@RequestParam("lessonID") Integer lessonID){
        return lessonService.getOne(lessonID);
    }
}
