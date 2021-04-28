/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.QuestionOption;
import com.PhanLam.backend.model.Quiz;
import com.PhanLam.backend.service.common.ExaminationSessionManage;
import java.security.Principal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class ExaminationSessionController {
    
    // Variables declaration:
    private ExaminationSessionManage examinationSessionManager;

    public ExaminationSessionController (
            ExaminationSessionManage examinationSessionManager
    ){
        this.examinationSessionManager = examinationSessionManager;
    }
    
    @PatchMapping ("/examination-sessions/{examID}:start")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void startExamSession (
            Principal principal
            , @PathVariable int examID
    ){
        examinationSessionManager.startExamSession (principal, examID);
    }
    
    @GetMapping ("/examination-sessions/current/quiz")
    @ResponseStatus (HttpStatus.OK)
    public Quiz getCurrentExamQuiz (){
        Quiz quiz;
        
        quiz = examinationSessionManager.getCurrentExamQuiz ();
        return quiz;
    }
    
    @PatchMapping ("/examination-sessions/next-question:goTo")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void goToNextQuestion (
            @RequestBody List<QuestionOption> quizAnswer
    ){
        examinationSessionManager.goToNextQuestion (quizAnswer);
    }
    
    @PatchMapping ("/examination-sessions/previous-question:goTo")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void goToPreviousQuestion (
            @RequestBody List<QuestionOption> quizAnswer
    ){
        examinationSessionManager.goToPreviousQuestion (quizAnswer);
    }
}
