/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Quiz;
import com.PhanLam.backend.service.QuizService;
import java.security.Principal;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class QuizController {
    
    // Variables declaration:
    private QuizService quizService;

    public QuizController (QuizService quizService){
        this.quizService = quizService;
    }
    
    @PostMapping ("/quizzes")
    @ResponseStatus (HttpStatus.CREATED)
    public void createNewQuiz (
            @Valid @RequestBody Quiz quiz
            , Principal principal
    ){
        quizService.createQuiz (quiz, principal);
    }
    
    @GetMapping ("/quizzes:created-by-logged-in-user")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Quiz> getAllQuizCreatedByCurrentLoggedInUser (
            Principal principal
            , @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<Quiz> quizDataPage;
        
        quizDataPage = quizService.getAllQuizByCreator (
                principal
                , pageIndex
                , pageSize
        );
        return quizDataPage;
    }
    
    @PutMapping ("/quizzes/{questionID}") 
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void updateQuiz (
            @PathVariable int questionID
            , Principal principal
            , @Valid @RequestBody Quiz updatedQuiz
    ){
        quizService.updateQuiz (questionID, principal, updatedQuiz);
    }
    
    @DeleteMapping ("/quizzes/{questionID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deleteQuizByQuestionID (@PathVariable int questionID){
        quizService.deleteQuizByQuestionID (questionID);
    }
}
