/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.LessonRepository;
import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Lesson;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author This MC
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class LessonService {

    // Variables declaration:
    private LessonRepository lessonRepository;
    private CourseRepository courseRepository;

    public LessonService(LessonRepository lessonRepository, CourseRepository courseRepository, @Lazy CourseService courseService) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
    }

//    public void createLesson (Lesson lesson){
//        String lessonName;
//        boolean lessonAlreadyExist;
//        Date dateCreated;
//
//        lessonName = lesson.getLessonName();
//        lessonAlreadyExist = lessonRepository.existsByLessonName(lessonName);
//        if (lessonAlreadyExist == true){
//            throw new AlreadyExistException ("Lesson Name");
//        }
//        else {
//            dateCreated = new Date ();
//            lesson.setDateCreated (dateCreated);
//            lessonRepository.save (lesson);
//        }
//    }

    public void createLessonInCourse(Lesson lesson) {
        Optional<Course> nullableCourse;
        Course course;
        String lessonName;
        boolean lessonAlreadyExist;
        Date dateCreated;

        //hard code
        nullableCourse = courseRepository.findById(16);
        if (nullableCourse.isPresent() == false) {
            throw new NotFoundException("Course");
        } else {
            course = nullableCourse.get ();
            lessonName = lesson.getLessonName();
            lessonAlreadyExist = lessonRepository.existsByLessonName(lessonName);
            if (lessonAlreadyExist == true) {
                throw new AlreadyExistException("Lesson Name");
            } else {
                lesson.setCourseID(course);
                dateCreated = new Date();
                lesson.setDateCreated(dateCreated);
                lessonRepository.save(lesson);
            }
        }
    }


    @Transactional (readOnly = true)
    public DataPage<Lesson> getAllLesson (
            int pageIndex
            , int pageSize
            , int courseId
    ){
        ArrayList<Lesson> lessonHolder;
        PageRequest pagingInformation;
        Page<Lesson> lessonPage;
        TypedSort<Lesson> lessonSortInformation;
        Sort sortInformation;
        DataPage<Lesson> lessonDataPage;

        if ((pageIndex >= 0) && (pageSize > 0)){
            lessonSortInformation = Sort.sort (Lesson.class);
            sortInformation
                = lessonSortInformation
                    .by (Lesson::getLessonName).ascending ();
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            lessonPage = lessonRepository.findByCourseID_CourseID (courseId, pagingInformation);
            lessonHolder = new ArrayList<> (lessonPage.getContent ());
            lessonDataPage = new DataPage<> (
                    lessonPage.getTotalPages ()
                    , lessonHolder
            );
            return lessonDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator ()
                    + "Parameter name: pageNumber, pageSize"
            );
        }
    }

    public void updateLesson (int lessonID, Lesson updatedLesson){
        Optional <Lesson> nullableLesson;
        Lesson lesson;
        Date lastModified;

        nullableLesson = lessonRepository.findById (lessonID);
        if (nullableLesson.isPresent () == false){
            throw new NotFoundException ("Lesson ID");
        }
        else {
            lesson = nullableLesson.get ();
            lesson.setLessonName (updatedLesson.getLessonName ());
            lesson.setType (updatedLesson.getType ());
            lesson.setDuration (updatedLesson.getDuration ());
            lesson.setDescription (updatedLesson.getDescription ());
            //lay file chua lam duoc
            //
            //
            //
            lastModified = new Date ();
            lesson.setLastModified (lastModified);
        }
    }

    public void deleteLessonByID (int lessonID){
        Optional <Lesson> nullableLesson;
        Lesson lesson;

        nullableLesson = lessonRepository.findById (lessonID);
        if (nullableLesson.isPresent () == false){
            throw new NotFoundException ("Lesson ID");
        }
        else {
            lesson = nullableLesson.get ();
            lessonRepository.delete (lesson);
        }
    }

    public List<Lesson> getAllLessonByCourseID(Integer courseID){
        return lessonRepository.findAllByCourseID(courseID);
    }

    public Lesson getOne(Integer lessonID){
        return lessonRepository.findByID(lessonID);
    }

    public List<Lesson> getAllLesson(){
        return lessonRepository.findAll();
    }
}
