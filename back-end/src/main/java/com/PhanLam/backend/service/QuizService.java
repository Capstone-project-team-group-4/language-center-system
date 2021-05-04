/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.ForbiddenActionException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.ExaminationRepository;
import com.PhanLam.backend.dal.repository_interface.MultipleChoiceQuestionRepository;
import com.PhanLam.backend.dal.repository_interface.QuestionOptionRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.MultipleChoiceQuestion;
import com.PhanLam.backend.model.QExamination;
import com.PhanLam.backend.model.QMultipleChoiceQuestion;
import com.PhanLam.backend.model.QuestionOption;
import com.PhanLam.backend.model.Quiz;
import com.PhanLam.backend.model.User;
import com.PhanLam.backend.service.common.InputValidate;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
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
public class QuizService {
    
    // Variables declaration:
    private MultipleChoiceQuestionRepository questionRepository;
    private UserRepository userRepository;
    private QuestionOptionRepository questionOptionRepository;
    private InputValidate inputValidator;
    private ExaminationRepository examinationRepository;
    private JPAQueryFactory queryFactory;

    public QuizService (
            MultipleChoiceQuestionRepository questionRepository
            , UserRepository userRepository
            , QuestionOptionRepository questionOptionRepository
            , InputValidate inputValidator
            , ExaminationRepository examinationRepository
            , EntityManager entityManager
    ){
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.inputValidator = inputValidator;
        this.examinationRepository = examinationRepository;
        queryFactory = new JPAQueryFactory (entityManager);
    }

    public void createQuiz (Quiz quiz, Principal principal){
        MultipleChoiceQuestion question;
        List<QuestionOption> questionOptionHolder;
        String userName;
        Optional<User> nullableUser;
        User user;
        Date dateCreated;
        String content;
        boolean alreadyExist;
        
        question = quiz.getMultipleChoiceQuestion ();
        content = question.getContent ();
        alreadyExist = questionRepository.existsByContent (content);
        if (alreadyExist == true){
            throw new AlreadyExistException ("Question Content");
        }
        else {
            questionOptionHolder = quiz.getQuestionOptionHolder ();
            inputValidator.validateQuestionOption (questionOptionHolder);
            userName = principal.getName ();
            nullableUser = userRepository.findByUserName (userName);
            user = nullableUser.get ();
            question.setCreator (user);
            dateCreated = new Date ();
            question.setDateCreated (dateCreated);
            question = questionRepository.save (question);
            for (QuestionOption questionOption : questionOptionHolder){
                questionOption.setMultipleChoiceQuestion (question);
                questionOptionRepository.save (questionOption);
            }
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<Quiz> getAllQuizByCreator (
            Principal principal
            , int pageIndex
            , int pageSize
    ){
        String userName;
        Optional<User> nullableUser;
        User creator;
        TypedSort<MultipleChoiceQuestion> questionSortInformation;
        Sort sortInformation;
        PageRequest pagingInformation;
        Page<MultipleChoiceQuestion> questionPage;
        List<MultipleChoiceQuestion> questionHolder;
        long totalRowCount;
        List<QuestionOption> questionOptionHolder;
        Quiz quiz; 
        List<Quiz> quizHolder;
        DataPage<Quiz> quizDataPage;
        
        if ((pageIndex >= 0) && (pageSize > 0)){
            userName = principal.getName ();
            nullableUser = userRepository.findByUserName (userName);
            creator = nullableUser.get ();
            questionSortInformation = Sort.sort (MultipleChoiceQuestion.class);
            sortInformation 
                = questionSortInformation
                    .by (MultipleChoiceQuestion::getContent).ascending ();
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            questionPage = questionRepository.findAllByCreator (
                    creator
                    , pagingInformation
            );
            totalRowCount = questionPage.getTotalElements ();
            questionHolder = questionPage.getContent ();
            quizHolder = new ArrayList<> ();
            for (MultipleChoiceQuestion question : questionHolder){
                questionOptionHolder = question.getQuestionOptionList ();
                quiz = new Quiz (question, questionOptionHolder);
                quizHolder.add (quiz);
            }
            quizDataPage = new DataPage<> (totalRowCount, quizHolder);
            return quizDataPage;
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
    public DataPage<Quiz> getAllQuizByExamID (
            int examID
            , int pageIndex
            , int pageSize
    ){
        boolean examExists;
        QMultipleChoiceQuestion question;
        QExamination exam;
        QueryResults<MultipleChoiceQuestion> questionPage;
        long totalRowCount;
        List<MultipleChoiceQuestion> questionHolder;
        List<Quiz> quizHolder;
        List<QuestionOption> questionOptionHolder;
        Quiz quiz;
        DataPage<Quiz> quizDataPage;
        
        examExists = examinationRepository.existsById (examID);
        if (examExists == false){
            throw new NotFoundException ("Exam");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                question = new QMultipleChoiceQuestion ("question");
                exam = new QExamination ("exam");
                questionPage = queryFactory
                        .selectFrom (question)
                            .leftJoin (question.examinationList, exam)
                        .where (exam.examID.eq (examID))
                        .orderBy (question.content.asc ())
                        .limit (pageSize)
                        .offset (pageSize * pageIndex)
                        .fetchResults ();
                totalRowCount = questionPage.getTotal ();
                questionHolder = questionPage.getResults ();
                quizHolder = new ArrayList<> ();
                for (MultipleChoiceQuestion questionData : questionHolder){
                    questionOptionHolder = questionData
                            .getQuestionOptionList ();
                    quiz = new Quiz (questionData, questionOptionHolder);
                    quizHolder.add (quiz);
                }
                quizDataPage = new DataPage<> (totalRowCount, quizHolder);
                return quizDataPage;
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
    public DataPage<Quiz> getAllQuizWithExamIDIsNot (
            int examID
            , int pageIndex
            , int pageSize
    ){
        boolean examExists;
        QMultipleChoiceQuestion question;
        QExamination exam;
        QueryResults<MultipleChoiceQuestion> questionPage;
        long totalRowCount;
        List<MultipleChoiceQuestion> questionHolder;
        List<Quiz> quizHolder;
        List<QuestionOption> questionOptionHolder;
        Quiz quiz;
        DataPage<Quiz> quizDataPage;
        
        examExists = examinationRepository.existsById (examID);
        if (examExists == false){
            throw new NotFoundException ("Exam");
        }
        else {
            if ((pageIndex >= 0) && (pageSize > 0)){
                question = new QMultipleChoiceQuestion ("question");
                exam = new QExamination ("exam");
                questionPage = queryFactory
                        .selectFrom (question).distinct ()
                            .leftJoin (question.examinationList, exam)
                        .where (
                                exam.examID.ne (examID)
                                .or (exam.examID.isNull ())
                        )
                        .orderBy (question.content.asc ())
                        .limit (pageSize)
                        .offset (pageSize * pageIndex)
                        .fetchResults ();
                totalRowCount = questionPage.getTotal ();
                questionHolder = questionPage.getResults ();
                quizHolder = new ArrayList<> ();
                for (MultipleChoiceQuestion questionData : questionHolder){
                    questionOptionHolder = questionData
                            .getQuestionOptionList ();
                    quiz = new Quiz (questionData, questionOptionHolder);
                    quizHolder.add (quiz);
                }
                quizDataPage = new DataPage<> (totalRowCount, quizHolder);
                return quizDataPage;
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
    
    public void updateQuiz (
            int questionID
            , Principal principal
            , Quiz updatedQuiz
    ){
        Optional<MultipleChoiceQuestion> nullableQuestion;
        MultipleChoiceQuestion question;
        String userName;
        String questionCreatorName;
        List<QuestionOption> updatedQuestionOptionHolder;
        MultipleChoiceQuestion updatedQuestion;
        Date lastModified;
        
        nullableQuestion = questionRepository.findById (questionID);
        if (nullableQuestion.isPresent () == false){
            throw new NotFoundException ("Quiz");
        }
        else {
            question = nullableQuestion.get ();
            userName = principal.getName ();
            questionCreatorName = question.getCreator ().getUserName ();
            if (!(userName.equals (questionCreatorName))){
                throw new ForbiddenActionException (
                        "You cannot edit this question because it "
                        + "does not belong to you."
                );
            }
            else {
                updatedQuestionOptionHolder 
                    = updatedQuiz.getQuestionOptionHolder ();
                inputValidator.validateQuestionOption (
                        updatedQuestionOptionHolder
                );
                updatedQuestion = updatedQuiz.getMultipleChoiceQuestion ();
                lastModified = new Date ();
                updatedQuestion.setLastModified (lastModified);
                updatedQuestion.setQuestionOptionList (
                        updatedQuestionOptionHolder
                );
                questionRepository.save (updatedQuestion);
            }
        }
    }
    
    public void deleteQuizByQuestionID (int questionID){
        Optional<MultipleChoiceQuestion> nullableQuestion;
        MultipleChoiceQuestion question;
        
        nullableQuestion = questionRepository.findById (questionID);
        if (nullableQuestion.isPresent () == false){
            throw new NotFoundException ("Quiz");
        }
        else {
            question = nullableQuestion.get ();
            questionRepository.delete (question);
        }
    }
}
