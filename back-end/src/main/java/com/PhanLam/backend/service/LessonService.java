/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.LessonRepository;
import com.PhanLam.backend.model.Lesson;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author roboc
 */
@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private CourseRepository courseRepository;
    
    public List<Lesson> getAllLessonByCourseID(Integer courseID){
        return lessonRepository.findAllByCourseID(courseID);
    }
    
    public Lesson getOne(Integer lessonID){
        return lessonRepository.findByID(lessonID);
    }
}
