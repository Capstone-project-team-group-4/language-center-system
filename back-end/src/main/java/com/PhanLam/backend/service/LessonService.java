/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.LessonRepository;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Lesson;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author This MC
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class LessonService {
    
    // Variables declaration:
    private LessonRepository lessonRepository; 

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    
    public void createLesson (Lesson lesson){
        String lessonName;
        boolean lessonAlreadyExist;
        Date dateCreated;
        
        lessonName = lesson.getLessonName();
        lessonAlreadyExist = lessonRepository.existsByLessonName(lessonName);
        if (lessonAlreadyExist == true){
            throw new AlreadyExistException ("Lesson Name");
        }
        else {
            dateCreated = new Date ();
            lesson.setDateCreated (dateCreated);
            lessonRepository.save (lesson);
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<Lesson> getAllLesson (
            int pageIndex
            , int pageSize
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
            lessonPage = lessonRepository.findAll (pagingInformation);
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
    
}
