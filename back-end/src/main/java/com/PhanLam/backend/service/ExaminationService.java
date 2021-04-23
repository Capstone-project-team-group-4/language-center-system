/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.ExaminationRepository;
import com.PhanLam.backend.dal.repository_interface.MultipleChoiceQuestionRepository;
import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Examination;
import com.PhanLam.backend.model.MultipleChoiceQuestion;
import java.util.Date;
import java.util.List;
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
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class ExaminationService {
    
    // Variables declaration:
    private CourseRepository courseRepository;
    private ExaminationRepository examinationRepository;
    private MultipleChoiceQuestionRepository questionRepository;

    public ExaminationService (
            CourseRepository courseRepository
            , ExaminationRepository examinationRepository
            , MultipleChoiceQuestionRepository questionRepository
    ){
        this.courseRepository = courseRepository;
        this.examinationRepository = examinationRepository;
        this.questionRepository = questionRepository;
    }

    public void createExamInCourse (int courseID, Examination exam){
        Optional <Course> nullableCourse;
        Course course;
        Date dateCreated;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            course = nullableCourse.get ();
            exam.setCourse (course);
            dateCreated = new Date ();
            exam.setDateCreated (dateCreated);
            examinationRepository.save (exam);
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<Examination> getAllExam (
            int pageIndex
            , int pageSize
    ){
        List<Examination> examHolder;
        TypedSort<Examination> examSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<Examination> examPage;
        long totalRowCount;
        DataPage<Examination> examDataPage;
        
        if ((pageIndex >= 0) && (pageSize > 0)){
            examSortInformation = Sort.sort (Examination.class);
            sortInformation 
                = examSortInformation
                    .by (Examination::getStartTime).ascending ();
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            examPage = examinationRepository.findAll (pagingInformation);
            totalRowCount = examPage.getTotalElements ();
            examHolder = examPage.getContent ();
            examDataPage = new DataPage<> (totalRowCount, examHolder);
            return examDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page index number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageIndex, pageSize"
            );
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<Examination> getAllExamByCourseID (
            int courseID
            , int pageIndex
            , int pageSize
    ){
        Optional <Course> nullableCourse;
        Course course;
        TypedSort<Examination> examSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<Examination> examPage;
        long totalRowCount;
        List<Examination> examHolder;
        DataPage<Examination> examDataPage;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                course = nullableCourse.get ();
                examSortInformation = Sort.sort (Examination.class);
                sortInformation 
                    = examSortInformation
                        .by (Examination::getStartTime).ascending ();
                pagingInformation = PageRequest.of (
                        pageIndex
                        , pageSize
                        , sortInformation
                );
                examPage = examinationRepository.findAllByCourse (
                        course
                        , pagingInformation
                );
                totalRowCount = examPage.getTotalElements ();
                examHolder = examPage.getContent ();
                examDataPage = new DataPage<> (totalRowCount, examHolder);
                return examDataPage;
            }
            else {
                throw new InvalidRequestArgumentException (
                        "The page index number and page size number parameters "
                        + "cannot be less than zero." + System.lineSeparator () 
                        + "Parameter name: pageIndex, pageSize"
                );
            }
        }
    }
    
    public void updateExamInCourse (
            int courseID
            , int examID
            , Examination updatedExam
    ){
        Optional <Course> nullableCourse;
        Course course;
        boolean examExists;
        boolean examExistsInTheCourse;
        Date lastModified;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            course = nullableCourse.get ();
            examExists = examinationRepository.existsById (examID);
            if (examExists == false){
                throw new NotFoundException ("Examination");
            }
            else {
                examExistsInTheCourse 
                    = examinationRepository.existsByCourseAndExamID (
                            course
                            , examID
                    );
                if (examExistsInTheCourse == false){
                    throw new InvalidRequestArgumentException (
                            "This examination does not exist in the course so "
                            + "you can't update it." + System.lineSeparator () 
                            + "Parameter name: courseID, examID"
                    );
                }
                else {
                    lastModified = new Date ();
                    updatedExam.setLastModified (lastModified);
                    examinationRepository.save (updatedExam);
                }
            }
        }
    }
    
    public void addQuizToExam (int questionID, int examID){
        Optional<MultipleChoiceQuestion> nullableQuestion;
        MultipleChoiceQuestion question;
        Optional <Examination> nullableExam;
        Examination exam;
        List<MultipleChoiceQuestion> questionList;
        boolean alreadyExistsInTheExam;
        int i;
        MultipleChoiceQuestion questionInTheExam;
        
        nullableQuestion = questionRepository.findById (questionID);
        if (nullableQuestion.isPresent () == false){
            throw new NotFoundException ("Quiz");
        }
        else {
            question = nullableQuestion.get ();
            nullableExam = examinationRepository.findById (examID);
            if (nullableExam.isPresent () == false){
                throw new NotFoundException ("Examination");
            }
            else {
                exam = nullableExam.get ();
                questionList = exam.getMultipleChoiceQuestionList ();
                alreadyExistsInTheExam = false;
                for (i = 0; i < questionList.size (); i++){
                    questionInTheExam = questionList.get (i);
                    if (question.getQuestionID ().equals (
                            questionInTheExam.getQuestionID ()
                    )){
                        alreadyExistsInTheExam = true;
                        break;
                    }
                }
                if (alreadyExistsInTheExam == true){
                    throw new InvalidRequestArgumentException (
                            "This exam question has already existed "
                            + "in the exam please add an exam question "
                            + "which is not in the exam." 
                            + System.lineSeparator () 
                            + "Parameter name: questionID, examID"
                    );
                }
                else {
                    questionList.add (question);
                }
            }
        }
    }
    
    public void removeQuizFromExam (int questionID, int examID){
        Optional<MultipleChoiceQuestion> nullableQuestion;
        MultipleChoiceQuestion question;
        Optional <Examination> nullableExam;
        Examination exam;
        List<MultipleChoiceQuestion> questionList;
        boolean existsInTheExam;
        int i;
        MultipleChoiceQuestion questionInTheExam;
        
        nullableQuestion = questionRepository.findById (questionID);
        if (nullableQuestion.isPresent () == false){
            throw new NotFoundException ("Quiz");
        }
        else {
            question = nullableQuestion.get ();
            nullableExam = examinationRepository.findById (examID);
            if (nullableExam.isPresent () == false){
                throw new NotFoundException ("Examination");
            }
            else {
                exam = nullableExam.get ();
                questionList = exam.getMultipleChoiceQuestionList ();
                existsInTheExam = false;
                for (i = 0; i < questionList.size (); i++){
                    questionInTheExam = questionList.get (i);
                    if (question.getQuestionID ().equals (
                            questionInTheExam.getQuestionID ()
                    )){
                        existsInTheExam = true;
                        break;
                    }
                }
                if (existsInTheExam == false){
                    throw new InvalidRequestArgumentException (
                            "This exam question no longer exists "
                            + "in the exam please remove an exam question "
                            + "which is still in the exam." 
                            + System.lineSeparator () 
                            + "Parameter name: questionID, examID"
                    );
                }
                else {
                    questionList.remove (question);
                }
            }
        }
    }
    
    public void deleteExamInCourse (int courseID, int examID){
        Optional <Course> nullableCourse;
        Course course;
        Optional <Examination> nullableExam;
        Examination exam; 
        boolean examExistsInTheCourse;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            course = nullableCourse.get ();
            nullableExam = examinationRepository.findById (examID);
            if (nullableExam.isPresent () == false){
                throw new NotFoundException ("Examination");
            }
            else {
                exam = nullableExam.get ();
                examExistsInTheCourse 
                    = examinationRepository.existsByCourseAndExamID (
                            course
                            , examID
                    );
                if (examExistsInTheCourse == false){
                    throw new InvalidRequestArgumentException (
                            "This examination does not exist in the course so "
                            + "you can't delete it." + System.lineSeparator () 
                            + "Parameter name: courseID, examID"
                    );
                }
                else {
                    examinationRepository.delete (exam);
                }
            }
        }
    }
}
