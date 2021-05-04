/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service.common;

// Import package members section:
import com.PhanLam.backend.controller.exception.ForbiddenActionException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.ExaminationAttemptRepository;
import com.PhanLam.backend.dal.repository_interface.ExaminationRepository;
import com.PhanLam.backend.dal.repository_interface.QuestionOptionRepository;
import com.PhanLam.backend.dal.repository_interface.StudentScoreRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.Examination;
import com.PhanLam.backend.model.ExaminationAttempt;
import com.PhanLam.backend.model.MultipleChoiceQuestion;
import com.PhanLam.backend.model.QuestionOption;
import com.PhanLam.backend.model.Quiz;
import com.PhanLam.backend.model.StudentScore;
import com.PhanLam.backend.model.User;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.SessionScope;

/**
 *
 * @author Phan Lam
 */
@Service
@SessionScope
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class ExaminationSessionManage {
    
    // Variables declaration:
    private Optional<Examination> nullableExam;
    private ExaminationRepository examRepository;
    private Examination exam;
    private List<MultipleChoiceQuestion> questionHolder;
    private int totalNumberOfQuestion;
    private String userName;
    private Optional<User> nullableUser;
    private UserRepository userRepository;
    private User user;
    private ExaminationAttemptRepository examAttemptRepository;
    private Optional<ExaminationAttempt> nullableExamAttempt;  
    private ExaminationAttempt examAttempt;
    private int maxNumberOfAttempt;
    private int numberOfAttemptTaken;
    private int questionIndex;
    private long startExamTime;
    private List <List <QuestionOption>> examAnswer;
    private String examSessionStatus;
    private MultipleChoiceQuestion question;
    private Quiz quiz;
    private List<QuestionOption> questionOptionHolder;
    private int numberOfCorrectAnswer;
    private int i;
    private boolean quizFinalResult;
    private int k;
    private QuestionOption chosenQuestionOption;
    private int chosenQuestionOptionId;
    private Optional<QuestionOption> nullableQuestionOption;
    private QuestionOptionRepository questionOptionRepository;
    private QuestionOption questionOption;
    private boolean isCorrectAnswer;
    private int numberOfCorrectAnswerData;
    private long timeLimit;
    private long elapsedTime;
    private double roundedExamScore;
    private String resultState;
    private boolean examScoreDiscarded;
    private double examScore;
    private BigDecimal examScoreInBigDecimal;
    private StudentScore studentScore;
    private StudentScoreRepository studentScoreRepository;
    private boolean isFirstQuestion; 
    private boolean isLastQuestion;
    private int timeLimitInSeconds;

    public ExaminationSessionManage (
            ExaminationRepository examRepository
            , UserRepository userRepository
            , ExaminationAttemptRepository examAttemptRepository
            , QuestionOptionRepository questionOptionRepository
            , StudentScoreRepository studentScoreRepository
    ){
        this.examRepository = examRepository;
        this.userRepository = userRepository;
        this.examAttemptRepository = examAttemptRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.studentScoreRepository = studentScoreRepository;
        examSessionStatus = "Not Started";
    }
    
    public void startExamSession (Principal principal, int examID){
        userName = principal.getName ();
        nullableUser = userRepository.findByUserName (userName);
        user = nullableUser.get ();
        nullableExam = examRepository.findById (examID);
        if (nullableExam.isPresent () == false){
            throw new NotFoundException ("Examination");
        }
        else {
            exam = nullableExam.get ();
            nullableExamAttempt 
                = examAttemptRepository.findByUserAndExamination (
                        user
                        , exam
                );
            if (nullableExamAttempt.isPresent () == false){
                examAttempt = new ExaminationAttempt (1, user, exam);
                examAttemptRepository.save (examAttempt);
            }
            else {
                examAttempt = nullableExamAttempt.get ();
                numberOfAttemptTaken = examAttempt.getNumberOfAttemptTaken ();
                maxNumberOfAttempt = exam.getMaxNumberOfAttempt ();
                if (numberOfAttemptTaken >= maxNumberOfAttempt){
                    throw new ForbiddenActionException (
                            "You have exceeded the number of attempts."
                    );
                }
                else {
                    numberOfAttemptTaken++;
                    examAttempt.setNumberOfAttemptTaken (numberOfAttemptTaken);
                }
            }
            questionHolder = exam.getMultipleChoiceQuestionList ();
            totalNumberOfQuestion = questionHolder.size ();
            questionIndex = 0;
            startExamTime = System.nanoTime ();
            timeLimit = (exam.getDuration () * 60000000000L);
            examAnswer = new ArrayList<> ();
            numberOfCorrectAnswerData = 0;
            examScoreDiscarded = false;
            examSessionStatus = "Started";
        }
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public Quiz getCurrentExamQuiz (){
        if (examSessionStatus.equals ("Not Started")){
            throw new ForbiddenActionException (
                    "Exam session hasn't started yet, you can't get "
                    + "exam question right now."
            );
        }
        if (examSessionStatus.equals ("Finished")){
            throw new ForbiddenActionException (
                    "Exam session has already finished, you can't get "
                    + "exam question anymore."
            );
        }
        if (questionHolder.isEmpty ()){
            throw new ForbiddenActionException (
                    "You can't get exam question because this examination "
                    + "doesn't contain any exam question."
            );
        }
        else {
            question = questionHolder.get (questionIndex);
            questionOptionHolder = question.getQuestionOptionList ();
            for (QuestionOption quizQuestionOption : questionOptionHolder){
                quizQuestionOption.setIsCorrectAnswer (false);
            }
            quiz = new Quiz (question, questionOptionHolder);
            return quiz;
        } 
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public void goToNextQuestion (List<QuestionOption> quizAnswer){
        if (examSessionStatus.equals ("Not Started")){
            throw new ForbiddenActionException (
                    "Exam session hasn't started yet, you can't go to next "
                    + "exam question right now."
            );
        }
        if (examSessionStatus.equals ("Finished")){
            throw new ForbiddenActionException (
                    "Exam session has already finished, you can't go to next "
                    + "exam question anymore."
            );
        }
        if ((questionIndex + 1) > examAnswer.size ()){
            examAnswer.add (quizAnswer);
        }
        else {
            examAnswer.set (questionIndex, quizAnswer);
        }
        if ((questionIndex + 1) < totalNumberOfQuestion){
            questionIndex++;
        }
    } 
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public void goToPreviousQuestion (List<QuestionOption> quizAnswer){
        if (examSessionStatus.equals ("Not Started")){
            throw new ForbiddenActionException (
                    "Exam session hasn't started yet, you can't go to "
                    + "previous exam question right now."
            );
        }
        if (examSessionStatus.equals ("Finished")){
            throw new ForbiddenActionException (
                    "Exam session has already finished, you can't go to "
                    + "previous exam question anymore."
            );
        }
        if ((questionIndex + 1) > examAnswer.size ()){
            examAnswer.add (quizAnswer);
        }
        else {
            examAnswer.set (questionIndex, quizAnswer);
        }
        if (questionIndex > 0){
            questionIndex--;
        }
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public boolean isFirstQuestion (){
        if (examSessionStatus.equals ("Not Started")){
            throw new ForbiddenActionException (
                    "Exam session hasn't started yet, you can't check "
                    + "the status of current question right now."
            );
        }
        if (examSessionStatus.equals ("Finished")){
            throw new ForbiddenActionException (
                    "Exam session has already finished, you can't check "
                    + "the status of current question anymore."
            );
        }
        if (questionIndex == 0){
            isFirstQuestion = true;
        }
        else {
            isFirstQuestion = false;
        }
        return isFirstQuestion;
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public boolean isLastQuestion (){
        if (examSessionStatus.equals ("Not Started")){
            throw new ForbiddenActionException (
                    "Exam session hasn't started yet, you can't check "
                    + "the status of current question right now."
            );
        }
        if (examSessionStatus.equals ("Finished")){
            throw new ForbiddenActionException (
                    "Exam session has already finished, you can't check "
                    + "the status of current question anymore."
            );
        }
        if (questionIndex >= (totalNumberOfQuestion - 1)){
            isLastQuestion = true;
        }
        else {
            isLastQuestion = false;
        }
        return isLastQuestion;
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public int getTotalNumberOfQuestion (){
        return totalNumberOfQuestion;
    }
    
    @Transactional (propagation = Propagation.SUPPORTS, readOnly = true)
    public int getTimeLimitInSeconds (){
        timeLimitInSeconds = (exam.getDuration () * 60);
        return timeLimitInSeconds;
    }
    
    public void submitExam (List<QuestionOption> quizAnswer){
        if ((questionIndex + 1) > examAnswer.size ()){
            examAnswer.add (quizAnswer);
        }
        else {
            examAnswer.set (questionIndex, quizAnswer);
        }
        numberOfCorrectAnswer = 0;
        for (i = 0; i < examAnswer.size (); i++){
            quizAnswer = examAnswer.get (i);
            quizFinalResult = true;
            for (k = 0; k < quizAnswer.size (); k++){
                chosenQuestionOption = quizAnswer.get (k);
                chosenQuestionOptionId = chosenQuestionOption
                        .getOptionID ();
                nullableQuestionOption = questionOptionRepository
                        .findById (chosenQuestionOptionId);
                if (nullableQuestionOption.isPresent () == false){
                    throw new InvalidRequestArgumentException (
                            "This question option does not exist."
                    );
                }
                else {
                    questionOption = nullableQuestionOption.get ();
                    isCorrectAnswer = questionOption.getIsCorrectAnswer ();
                    quizFinalResult = (
                            quizFinalResult && isCorrectAnswer
                    );
                }
            }
            if (quizAnswer.isEmpty () == false){
                question = questionOption.getMultipleChoiceQuestion ();
                numberOfCorrectAnswerData = questionOptionRepository
                        .countByMultipleChoiceQuestionAndIsCorrectAnswer (
                                question
                                , true
                        );
            }
            else {
                quizFinalResult = false;
            }
            if (quizAnswer.size () < numberOfCorrectAnswerData){
                quizFinalResult = false;
            }
            if (quizFinalResult == true){
                numberOfCorrectAnswer++;
            }
        }
        elapsedTime = (System.nanoTime () - startExamTime);
        if ((elapsedTime - timeLimit) > 900000000000L){
            roundedExamScore = 0;
            resultState = "Failed";
            examScoreDiscarded = true;
        }
        else {
            examScore = (
                    (
                            (double) numberOfCorrectAnswer
                    ) / totalNumberOfQuestion
            );
            examScoreInBigDecimal = new BigDecimal (examScore);
            examScoreInBigDecimal = (examScoreInBigDecimal.multiply (
                    new BigDecimal (10)
            ));
            examScoreInBigDecimal = examScoreInBigDecimal.setScale (
                    2
                    , RoundingMode.HALF_UP
            );
            roundedExamScore = examScoreInBigDecimal.doubleValue ();
            if (roundedExamScore >= 5){
                resultState = "Passed";
            }
            else {
                resultState = "Failed";
            }
        }
        studentScore = new StudentScore (
                roundedExamScore
                , resultState
                , exam
                , null
                , user
        );
        studentScoreRepository.save (studentScore);
        examSessionStatus = "Finished";
        if (examScoreDiscarded == true){
            throw new ForbiddenActionException (
                    "You can't not submit, your score discarded "
                    + "because of the submit result timeout."
            );
        }
    }
    
    public StudentScore getExamScore (){
        return studentScore;
    }
}
