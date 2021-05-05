/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:

import com.PhanLam.backend.controller.DTO.ChartResponse;
import com.PhanLam.backend.controller.exception.ForbiddenActionException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.*;
import com.PhanLam.backend.model.*;
import com.PhanLam.backend.service.common.QueryFactoryGet;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class ExaminationService {

    // Variables declaration:
    private CourseRepository courseRepository;
    private ExaminationRepository examRepository;
    private MultipleChoiceQuestionRepository questionRepository;
    private UserRepository userRepository;
    private QueryFactoryGet queryFactoryGetter;
    private JPAQueryFactory queryFactory;
    private UserService userService;
    private StudentScoreRepository studentScoreRepository;

    public ExaminationService (
            CourseRepository courseRepository
            , ExaminationRepository examRepository
            , MultipleChoiceQuestionRepository questionRepository
            , UserRepository userRepository
            , QueryFactoryGet queryFactoryGetter
            , @Lazy StudentScoreRepository studentScoreRepository
            , @Lazy UserService userService
    ){
        this.courseRepository = courseRepository;
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.queryFactoryGetter = queryFactoryGetter;
        this.studentScoreRepository = studentScoreRepository;
        this.userService = userService;
    }

    public void createExamInCourse (int courseID, Examination exam){
        Optional<Course> nullableCourse;
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
            examRepository.save (exam);
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
            examPage = examRepository.findAll (pagingInformation);
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
        Optional<Course> nullableCourse;
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
                examPage = examRepository.findAllByCourse (
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

    @Transactional (readOnly = true)
    public DataPage<Examination> getAllExamByStudentID (
            Principal principal
            , int pageIndex
            , int pageSize
    ){
        String userName;
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;
        int i;
        Role role;
        boolean thisUserIsStudent;
        QueryResults<Examination> examPage;
        QExamination exam;
        QCourse course;
        QUser student;
        int userID;
        long totalRowCount;
        List<Examination> examHolder;
        DataPage<Examination> examDataPage;
        int examID;
        int totalNumberOfQuiz;

        if ((pageIndex >= 0) && (pageSize > 0)){
            userName = principal.getName ();
            nullableUser = userRepository.findByUserName (userName);
            user = nullableUser.get ();
            roleHolder = user.getRoleList ();
            thisUserIsStudent = false;
            for (i = 0; i < roleHolder.size (); i++){
                role = roleHolder.get (i);
                if (role.getRoleName ().equals ("ROLE_STUDENT")){
                    thisUserIsStudent = true;
                    break;
                }
            }
            if (thisUserIsStudent == false){
                throw new ForbiddenActionException (
                        "You cannot get exams because you are not a student."
                );
            }
            else {
                exam = new QExamination ("exam");
                course = QCourse.course;
                student = new QUser ("student");
                userID = user.getUserID ();
                queryFactory = queryFactoryGetter.getQueryFactory ();
                examPage = queryFactory
                        .selectFrom (exam)
                            .leftJoin (exam.course, course)
                            .leftJoin (course.userList, student)
                        .where (student.userID.eq (userID))
                        .orderBy (exam.startTime.asc ())
                        .limit (pageSize)
                        .offset (pageSize * pageIndex)
                        .fetchResults ();
                totalRowCount = examPage.getTotal ();
                examHolder = examPage.getResults ();
                for (Examination examination : examHolder){
                    examID = examination.getExamID ();
                    totalNumberOfQuiz = getTotalCountOfQuizInExam (examID);
                    examination.setTotalNumberOfQuiz (totalNumberOfQuiz);
                }
                examDataPage = new DataPage<> (totalRowCount, examHolder);
                return examDataPage;
            }
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page index number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator ()
                    + "Parameter name: pageIndex, pageSize"
            );
        }
    }

    public void updateExamInCourse (
            int courseID
            , int examID
            , Examination updatedExam
    ){
        Optional<Course> nullableCourse;
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
            examExists = examRepository.existsById (examID);
            if (examExists == false){
                throw new NotFoundException ("Examination");
            }
            else {
                examExistsInTheCourse
                    = examRepository.existsByCourseAndExamID (
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
                    examRepository.save (updatedExam);
                }
            }
        }
    }

    @Transactional (readOnly = true)
    public int getTotalCountOfQuizInExam (int examID){
        Optional<Examination> nullableExam;
        Examination exam;
        List<MultipleChoiceQuestion> questionHolder;
        int totalCountOfQuiz;

        nullableExam = examRepository.findById (examID);
        if (nullableExam.isPresent () == false){
            throw new NotFoundException ("Examination");
        }
        else {
            exam = nullableExam.get ();
            questionHolder = exam.getMultipleChoiceQuestionList ();
            totalCountOfQuiz = questionHolder.size ();
            return totalCountOfQuiz;
        }
    }

    public void addQuizToExam (int questionID, int examID){
        Optional<MultipleChoiceQuestion> nullableQuestion;
        MultipleChoiceQuestion question;
        Optional<Examination> nullableExam;
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
            nullableExam = examRepository.findById (examID);
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
        Optional<Examination> nullableExam;
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
            nullableExam = examRepository.findById (examID);
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
        Optional<Course> nullableCourse;
        Course course;
        Optional<Examination> nullableExam;
        Examination exam;
        boolean examExistsInTheCourse;

        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            course = nullableCourse.get ();
            nullableExam = examRepository.findById (examID);
            if (nullableExam.isPresent () == false){
                throw new NotFoundException ("Examination");
            }
            else {
                exam = nullableExam.get ();
                examExistsInTheCourse
                    = examRepository.existsByCourseAndExamID (
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
                    examRepository.delete (exam);
                }
            }
        }
    }
    public List<ChartResponse> examScoresForChart(Integer studentId){
        List<ChartResponse> chartResponseList;
        List<StudentScore> studentScoreList;
        if (studentId == null) {
            studentScoreList = studentScoreRepository.findAll();
        } else {
            User user = userService.getById(studentId);
            studentScoreList = studentScoreRepository.findAllByUser(user);
        }

        // calculate averaging of each exam
        Map<Integer,Double> map =studentScoreList.stream()
                .collect(Collectors.groupingBy(i -> i.getExam().getExamID(),
                        Collectors.averagingDouble(i->i.getScore())));

        // convert to list chartResponse
        chartResponseList = map.entrySet()
                .stream()
                .map(m->new ChartResponse(m.getKey(), m.getValue()))
                .sorted(Comparator.comparing(i->(Integer)i.getValueX()))
                .collect(Collectors.toList());
        return chartResponseList;

    }
}
